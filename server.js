import { execFileSync } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, isAbsolute, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const envPath = join(root, ".env");
const publicDir = join(root, "public");

function loadEnvFile() {
  if (!existsSync(envPath)) {
    return;
  }

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key && !Object.hasOwn(process.env, key)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const port = Number(process.env.PORT || 3000);
const configuredDataDir = process.env.LIFE_PORTAL_DATA_DIR || "data";
const dataDir = isAbsolute(configuredDataDir) ? configuredDataDir : resolve(root, configuredDataDir);
const dbPath = join(dataDir, "life-portal.sqlite");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

const ledgers = {
  spending: "spending",
  income: "income"
};
const plaidStartDate = "2026-06-01";
const plaidApiHosts = {
  sandbox: "https://sandbox.plaid.com",
  development: "https://development.plaid.com",
  production: "https://production.plaid.com"
};

function initDatabase() {
  mkdirSync(dataDir, { recursive: true });
  execFileSync("sqlite3", [
    dbPath,
    `PRAGMA journal_mode = WAL;
     CREATE TABLE IF NOT EXISTS portal_meta (
       key TEXT PRIMARY KEY,
       value TEXT NOT NULL
     );
     INSERT OR IGNORE INTO portal_meta (key, value)
     VALUES ('created_by', 'life-portal');
     CREATE TABLE IF NOT EXISTS spending (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       category TEXT NOT NULL,
       title TEXT NOT NULL DEFAULT '',
       amount TEXT NOT NULL DEFAULT '',
       created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
     );
     CREATE TABLE IF NOT EXISTS income (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       category TEXT NOT NULL,
       title TEXT NOT NULL DEFAULT '',
       amount TEXT NOT NULL DEFAULT '',
       date TEXT NOT NULL DEFAULT '',
       created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
     );
     CREATE TABLE IF NOT EXISTS budgets (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       start_date TEXT NOT NULL DEFAULT '',
       end_date TEXT NOT NULL DEFAULT '',
       required_income TEXT NOT NULL DEFAULT '',
       created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
     );
     CREATE TABLE IF NOT EXISTS budget_categories (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       budget_id INTEGER NOT NULL,
       category TEXT NOT NULL,
       amount TEXT NOT NULL DEFAULT '',
       FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE
     );
     CREATE TABLE IF NOT EXISTS loans (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL DEFAULT '',
       issued_date TEXT NOT NULL DEFAULT '',
       subsidy_type TEXT NOT NULL DEFAULT 'unsubsidized',
       interest_rate TEXT NOT NULL DEFAULT '',
       principal TEXT NOT NULL DEFAULT '',
       created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
     );
     CREATE TABLE IF NOT EXISTS plaid_transactions (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       plaid_transaction_id TEXT NOT NULL UNIQUE,
       account_id TEXT NOT NULL DEFAULT '',
       name TEXT NOT NULL DEFAULT '',
       merchant_name TEXT NOT NULL DEFAULT '',
       amount TEXT NOT NULL DEFAULT '',
       date TEXT NOT NULL DEFAULT '',
       iso_currency_code TEXT NOT NULL DEFAULT '',
       pending INTEGER NOT NULL DEFAULT 0,
       suggested_ledger TEXT NOT NULL DEFAULT '',
       reviewed_at TEXT NOT NULL DEFAULT '',
       ledger_type TEXT NOT NULL DEFAULT '',
       ledger_id INTEGER,
       description TEXT NOT NULL DEFAULT '',
       created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
     );
     CREATE TABLE IF NOT EXISTS plaid_items (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       item_id TEXT NOT NULL UNIQUE,
       access_token TEXT NOT NULL,
       cursor TEXT NOT NULL DEFAULT '',
       institution_id TEXT NOT NULL DEFAULT '',
       institution_name TEXT NOT NULL DEFAULT '',
       created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
     );
     UPDATE spending
     SET category = 'Alcohol'
     WHERE category = 'Alchohol';`
  ]);
  try {
    execFileSync("sqlite3", [dbPath, "ALTER TABLE spending ADD COLUMN date TEXT NOT NULL DEFAULT '';"], {
      stdio: "ignore"
    });
  } catch {
    // Column already exists.
  }
  try {
    execFileSync("sqlite3", [dbPath, "UPDATE spending SET category = 'Set Category' WHERE category = 'Alcohol' AND title = '' AND amount = 0 AND date = '';"]);
  } catch {
    // Existing user data can stay as-is if a legacy shape blocks the cleanup.
  }
  try {
    execFileSync("sqlite3", [dbPath, "ALTER TABLE plaid_items ADD COLUMN cursor TEXT NOT NULL DEFAULT '';"], {
      stdio: "ignore"
    });
  } catch {
    // Column already exists.
  }
}

function runSql(sql, options = {}) {
  return execFileSync("sqlite3", [...(options.json ? ["-json"] : []), dbPath, sql], {
    encoding: "utf8"
  });
}

function normalizeDateColumn(table, column) {
  const output = runSql(
    `SELECT id, ${column} AS value
     FROM ${table}
     WHERE ${column} != '';`,
    { json: true }
  ).trim();
  const rows = output ? JSON.parse(output) : [];

  for (const row of rows) {
    const normalized = normalizeDate(row.value);
    if (normalized !== row.value) {
      runSql(`UPDATE ${table} SET ${column} = ${sqlString(normalized)} WHERE id = ${Number(row.id)};`);
    }
  }
}

function normalizeExistingDates() {
  normalizeDateColumn("spending", "date");
  normalizeDateColumn("income", "date");
  normalizeDateColumn("budgets", "start_date");
  normalizeDateColumn("budgets", "end_date");
  normalizeDateColumn("loans", "issued_date");
  normalizeDateColumn("plaid_transactions", "date");

  const graduationDate = getPortalMeta("graduation_date");
  if (graduationDate) {
    setPortalMeta("graduation_date", normalizeDate(graduationDate));
  }
}

function sqlString(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function normalizeDate(value, defaultYear = "2026") {
  const text = String(value || "").trim();
  let match = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (match) {
    return `${Number(match[2])}/${Number(match[3])}/${match[1]}`;
  }

  match = text.match(/^(\d{4})[-/](\d{1,2})$/);
  if (match) {
    return `${Number(match[2])}/1/${match[1]}`;
  }

  match = text.match(/^0?(\d{1,2})\/0?(\d{1,2})\/(\d{4})$/);
  if (match) {
    return `${Number(match[1])}/${Number(match[2])}/${match[3]}`;
  }

  match = text.match(/^0?(\d{1,2})\/0?(\d{1,2})$/);
  if (match) {
    return `${Number(match[1])}/${Number(match[2])}/${defaultYear}`;
  }

  return text;
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "content-type": mimeTypes[".json"] });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

function listLedger(table) {
  const output = runSql(
    `SELECT id, category, title, amount, date
     FROM ${table}
     ORDER BY id DESC;`,
    { json: true }
  ).trim();

  return output ? JSON.parse(output) : [];
}

function listBudgets() {
  const budgetsOutput = runSql(
    `SELECT id, start_date AS startDate, end_date AS endDate, required_income AS requiredIncome
     FROM budgets
     ORDER BY id DESC;`,
    { json: true }
  ).trim();
  const categoriesOutput = runSql(
    `SELECT budget_id AS budgetId, category, amount
     FROM budget_categories
     ORDER BY id ASC;`,
    { json: true }
  ).trim();
  const budgets = budgetsOutput ? JSON.parse(budgetsOutput) : [];
  const categories = categoriesOutput ? JSON.parse(categoriesOutput) : [];

  return budgets.map((budget) => ({
    ...budget,
    categories: categories.filter((category) => category.budgetId === budget.id)
  }));
}

function getPortalMeta(key) {
  const output = runSql(
    `SELECT value
     FROM portal_meta
     WHERE key = ${sqlString(key)}
     LIMIT 1;`,
    { json: true }
  ).trim();

  return output ? JSON.parse(output)[0].value : "";
}

function setPortalMeta(key, value) {
  runSql(
    `INSERT INTO portal_meta (key, value)
     VALUES (${sqlString(key)}, ${sqlString(value)})
     ON CONFLICT(key) DO UPDATE SET value = excluded.value;`
  );
}

function listLoans() {
  const output = runSql(
    `SELECT id,
            name,
            issued_date AS issuedDate,
            subsidy_type AS subsidyType,
            interest_rate AS interestRate,
            principal
     FROM loans
     ORDER BY
       CASE
         WHEN issued_date LIKE '%/%/%' THEN date(
           substr(issued_date, length(issued_date) - 3, 4) || '-' ||
           printf('%02d', CAST(substr(issued_date, 1, instr(issued_date, '/') - 1) AS INTEGER)) || '-' ||
           printf(
             '%02d',
             CAST(
               substr(
                 substr(issued_date, instr(issued_date, '/') + 1),
                 1,
                 instr(substr(issued_date, instr(issued_date, '/') + 1), '/') - 1
               ) AS INTEGER
             )
           )
         )
         ELSE NULL
       END DESC,
       id DESC;`,
    { json: true }
  ).trim();

  return output ? JSON.parse(output) : [];
}

function listPlaidTransactions() {
  const output = runSql(
    `SELECT id,
            plaid_transaction_id AS plaidTransactionId,
            account_id AS accountId,
            name,
            merchant_name AS merchantName,
            amount,
            date,
            iso_currency_code AS isoCurrencyCode,
            pending,
            suggested_ledger AS suggestedLedger,
            description
     FROM plaid_transactions
     WHERE reviewed_at = ''
     ORDER BY date ASC, id ASC;`,
    { json: true }
  ).trim();

  return output ? JSON.parse(output) : [];
}

function hasDefaultRow(table) {
  const output = runSql(
    `SELECT COUNT(*) AS count
     FROM ${table}
     WHERE category = 'Set Category'
       AND title = ''
       AND amount IN ('', '0', '0.0')
       AND date = '';`,
    { json: true }
  ).trim();

  return output ? JSON.parse(output)[0].count > 0 : false;
}

function getPlaidConfig() {
  const environment = process.env.PLAID_ENV || "sandbox";
  const host = plaidApiHosts[environment] || plaidApiHosts.sandbox;
  const clientId = process.env.PLAID_CLIENT_ID || "";
  const secret = process.env.PLAID_SECRET || "";

  return {
    configured: Boolean(clientId && secret),
    environment,
    host,
    clientId,
    secret
  };
}

function listPlaidItems() {
  const output = runSql(
    `SELECT id,
            item_id AS itemId,
            institution_id AS institutionId,
            institution_name AS institutionName
     FROM plaid_items
     ORDER BY id DESC;`,
    { json: true }
  ).trim();

  return output ? JSON.parse(output) : [];
}

function listPlaidAccessTokens() {
  const output = runSql(
    `SELECT access_token AS accessToken
     FROM plaid_items
     ORDER BY id ASC;`,
    { json: true }
  ).trim();
  const storedTokens = output ? JSON.parse(output).map((row) => row.accessToken).filter(Boolean) : [];

  if (process.env.PLAID_ACCESS_TOKEN) {
    storedTokens.push(process.env.PLAID_ACCESS_TOKEN);
  }

  return [...new Set(storedTokens)];
}

function listPlaidSyncItems() {
  const output = runSql(
    `SELECT id,
            access_token AS accessToken,
            cursor
     FROM plaid_items
     ORDER BY id ASC;`,
    { json: true }
  ).trim();

  return output ? JSON.parse(output) : [];
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function toLedgerDate(value) {
  return normalizeDate(value);
}

function plaidLedgerForAmount(amount) {
  return Number(amount) < 0 ? "income" : "spending";
}

async function requestPlaidTransactions(config, accessToken, offset = 0) {
  const response = await fetch(`${config.host}/transactions/get`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: config.clientId,
      secret: config.secret,
      access_token: accessToken,
      start_date: plaidStartDate,
      end_date: todayIsoDate(),
      options: {
        count: 500,
        offset
      }
    })
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload.error_message || payload.error_code || `Plaid request failed: ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

async function requestPlaidTransactionSync(config, item, cursor = "") {
  const response = await fetch(`${config.host}/transactions/sync`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: config.clientId,
      secret: config.secret,
      access_token: item.accessToken,
      cursor: cursor || undefined,
      count: 500
    })
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload.error_message || payload.error_code || `Plaid sync failed: ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

function queuePlaidTransaction(transaction) {
  if (!transaction.transaction_id || String(transaction.date || "") <= plaidStartDate) {
    return false;
  }

  const amount = Math.abs(Number(transaction.amount || 0)).toFixed(2);
  const suggestedLedger = plaidLedgerForAmount(transaction.amount);
  runSql(
    `INSERT INTO plaid_transactions (
       plaid_transaction_id,
       account_id,
       name,
       merchant_name,
       amount,
       date,
       iso_currency_code,
       pending,
       suggested_ledger
     )
     VALUES (
       ${sqlString(transaction.transaction_id)},
       ${sqlString(transaction.account_id || "")},
       ${sqlString(transaction.name || "")},
       ${sqlString(transaction.merchant_name || "")},
       ${sqlString(amount)},
       ${sqlString(normalizeDate(transaction.date || ""))},
       ${sqlString(transaction.iso_currency_code || "")},
       ${transaction.pending ? 1 : 0},
       ${sqlString(suggestedLedger)}
     )
     ON CONFLICT(plaid_transaction_id) DO UPDATE SET
       account_id = excluded.account_id,
       name = excluded.name,
       merchant_name = excluded.merchant_name,
       amount = excluded.amount,
       date = excluded.date,
       iso_currency_code = excluded.iso_currency_code,
       pending = excluded.pending,
       suggested_ledger = excluded.suggested_ledger
     WHERE plaid_transactions.reviewed_at = '';`
  );
  return true;
}

async function syncPlaidItemTransactions(config, item) {
  let cursor = item.cursor || "";
  let imported = 0;
  let hasMore = true;

  while (hasMore) {
    const payload = await requestPlaidTransactionSync(config, item, cursor);
    const added = Array.isArray(payload.added) ? payload.added : [];
    const modified = Array.isArray(payload.modified) ? payload.modified : [];
    const removed = Array.isArray(payload.removed) ? payload.removed : [];

    for (const transaction of [...added, ...modified]) {
      if (queuePlaidTransaction(transaction)) {
        imported += 1;
      }
    }

    for (const transaction of removed) {
      if (!transaction.transaction_id) {
        continue;
      }
      runSql(
        `DELETE FROM plaid_transactions
         WHERE plaid_transaction_id = ${sqlString(transaction.transaction_id)}
           AND reviewed_at = '';`
      );
    }

    cursor = payload.next_cursor || cursor;
    hasMore = Boolean(payload.has_more);
  }

  runSql(`UPDATE plaid_items SET cursor = ${sqlString(cursor)} WHERE id = ${Number(item.id)};`);
  return imported;
}

async function syncPlaidTransactions() {
  const config = getPlaidConfig();
  const linkedItems = listPlaidSyncItems();
  const fallbackAccessTokens = process.env.PLAID_ACCESS_TOKEN ? [process.env.PLAID_ACCESS_TOKEN] : [];

  if (!config.configured || (!linkedItems.length && !fallbackAccessTokens.length)) {
    return {
      configured: config.configured,
      environment: config.environment,
      linkedItems: listPlaidItems(),
      imported: 0,
      pending: listPlaidTransactions()
    };
  }

  let imported = 0;

  for (const item of linkedItems) {
    imported += await syncPlaidItemTransactions(config, item);
  }

  for (const accessToken of fallbackAccessTokens) {
    let offset = 0;
    let total = 0;

    do {
      const payload = await requestPlaidTransactions(config, accessToken, offset);
      const transactions = Array.isArray(payload.transactions) ? payload.transactions : [];
      total = Number(payload.total_transactions || transactions.length);

      for (const transaction of transactions) {
        if (queuePlaidTransaction(transaction)) {
          imported += 1;
        }
      }

      offset += transactions.length;
    } while (offset < total);
  }

  return {
    configured: true,
    environment: config.environment,
    linkedItems: listPlaidItems(),
    imported,
    pending: listPlaidTransactions()
  };
}

async function createPlaidLinkToken() {
  const config = getPlaidConfig();

  if (!config.configured) {
    return { configured: false, environment: config.environment };
  }

  const response = await fetch(`${config.host}/link/token/create`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: config.clientId,
      secret: config.secret,
      client_name: "Life Portal",
      country_codes: ["US"],
      language: "en",
      products: ["transactions"],
      user: {
        client_user_id: process.env.PLAID_CLIENT_USER_ID || "life-portal-local-user"
      }
    })
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload.error_message || payload.error_code || `Plaid Link request failed: ${response.status}`;
    throw new Error(message);
  }

  return { configured: true, environment: config.environment, linkToken: payload.link_token };
}

async function exchangePlaidPublicToken(publicToken, metadata = {}) {
  const config = getPlaidConfig();

  if (!config.configured) {
    return { configured: false, environment: config.environment };
  }
  if (!publicToken) {
    throw new Error("Missing Plaid public token.");
  }

  const response = await fetch(`${config.host}/item/public_token/exchange`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: config.clientId,
      secret: config.secret,
      public_token: publicToken
    })
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload.error_message || payload.error_code || `Plaid exchange failed: ${response.status}`;
    throw new Error(message);
  }

  const institution = metadata.institution || {};
  runSql(
    `INSERT INTO plaid_items (item_id, access_token, cursor, institution_id, institution_name)
     VALUES (
       ${sqlString(payload.item_id || "")},
       ${sqlString(payload.access_token || "")},
       '',
       ${sqlString(institution.institution_id || "")},
       ${sqlString(institution.name || "")}
     )
     ON CONFLICT(item_id) DO UPDATE SET
       access_token = excluded.access_token,
       cursor = '',
       institution_id = excluded.institution_id,
       institution_name = excluded.institution_name;`
  );

  return {
    configured: true,
    environment: config.environment,
    linkedItems: listPlaidItems()
  };
}

function reviewPlaidTransaction(id, body) {
  const ledger = body.ledger === "income" ? "income" : "spending";
  const category = String(body.category || "Set Category");
  const description = String(body.description || "").trim();
  const output = runSql(
    `SELECT id, name, merchant_name AS merchantName, amount, date
     FROM plaid_transactions
     WHERE id = ${id}
       AND reviewed_at = ''
     LIMIT 1;`,
    { json: true }
  ).trim();
  const transaction = output ? JSON.parse(output)[0] : null;

  if (!transaction) {
    return null;
  }

  const title = description || transaction.merchantName || transaction.name || "Plaid transaction";
  runSql(
    `INSERT INTO ${ledgers[ledger]} (category, title, amount, date)
     VALUES (
       ${sqlString(category)},
       ${sqlString(title)},
       ${sqlString(transaction.amount || "")},
       ${sqlString(toLedgerDate(transaction.date))}
     );`
  );
  const ledgerId = Number(runSql(`SELECT id FROM ${ledgers[ledger]} ORDER BY id DESC LIMIT 1;`).trim());
  runSql(
    `UPDATE plaid_transactions
     SET reviewed_at = CURRENT_TIMESTAMP,
         ledger_type = ${sqlString(ledger)},
         ledger_id = ${ledgerId},
         description = ${sqlString(title)}
     WHERE id = ${id};`
  );

  return { ledger, ledgerId };
}

async function handleApi(request, response) {
  const { pathname } = new URL(request.url, `http://${request.headers.host}`);

  if (pathname === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      database: dbPath
    });
    return true;
  }

  if (pathname === "/api/finance" && request.method === "GET") {
    sendJson(response, 200, {
      spending: listLedger("spending"),
      income: listLedger("income"),
      budgets: listBudgets(),
      loans: listLoans(),
      graduationDate: getPortalMeta("graduation_date"),
      plaidTransactions: listPlaidTransactions(),
      plaidItems: listPlaidItems(),
      plaidConfigured: getPlaidConfig().configured
    });
    return true;
  }

  if (pathname === "/api/plaid/link-token" && request.method === "POST") {
    sendJson(response, 200, await createPlaidLinkToken());
    return true;
  }

  if (pathname === "/api/plaid/exchange-token" && request.method === "POST") {
    const body = await readBody(request);
    sendJson(response, 200, await exchangePlaidPublicToken(body.publicToken, body.metadata || {}));
    return true;
  }

  if (pathname === "/api/plaid/transactions/sync" && request.method === "POST") {
    sendJson(response, 200, await syncPlaidTransactions());
    return true;
  }

  if (pathname === "/api/plaid/transactions" && request.method === "GET") {
    sendJson(response, 200, { pending: listPlaidTransactions() });
    return true;
  }

  const plaidReviewMatch = pathname.match(/^\/api\/plaid\/transactions\/(\d+)\/review$/);
  if (plaidReviewMatch && request.method === "POST") {
    const result = reviewPlaidTransaction(Number(plaidReviewMatch[1]), await readBody(request));
    if (!result) {
      sendJson(response, 404, { error: "Plaid transaction not found." });
      return true;
    }
    sendJson(response, 200, {
      ...result,
      spending: listLedger("spending"),
      income: listLedger("income"),
      pending: listPlaidTransactions()
    });
    return true;
  }

  if (pathname === "/api/budgets" && request.method === "GET") {
    sendJson(response, 200, { budgets: listBudgets() });
    return true;
  }

  if (pathname === "/api/debt/graduation-date" && request.method === "PATCH") {
    const body = await readBody(request);
    setPortalMeta("graduation_date", normalizeDate(body.graduationDate || ""));
    sendJson(response, 200, {
      graduationDate: getPortalMeta("graduation_date"),
      loans: listLoans()
    });
    return true;
  }

  if (pathname === "/api/loans" && request.method === "GET") {
    sendJson(response, 200, {
      loans: listLoans(),
      graduationDate: getPortalMeta("graduation_date")
    });
    return true;
  }

  if (pathname === "/api/loans" && request.method === "POST") {
    const body = await readBody(request);
    const subsidyType = body.subsidyType === "subsidized" ? "subsidized" : "unsubsidized";

    runSql(
      `INSERT INTO loans (name, issued_date, subsidy_type, interest_rate, principal)
       VALUES (
         ${sqlString(body.name || "")},
         ${sqlString(normalizeDate(body.issuedDate || ""))},
         ${sqlString(subsidyType)},
         ${sqlString(body.interestRate || "")},
         ${sqlString(body.principal || "")}
       );`
    );

    sendJson(response, 201, { loans: listLoans() });
    return true;
  }

  const loanItemMatch = pathname.match(/^\/api\/loans\/(\d+)$/);
  if (loanItemMatch && request.method === "PATCH") {
    const id = Number(loanItemMatch[1]);
    const body = await readBody(request);
    const updates = [];

    if (Object.hasOwn(body, "name")) {
      updates.push(`name = ${sqlString(body.name)}`);
    }
    if (Object.hasOwn(body, "issuedDate")) {
      updates.push(`issued_date = ${sqlString(normalizeDate(body.issuedDate))}`);
    }
    if (Object.hasOwn(body, "subsidyType")) {
      updates.push(`subsidy_type = ${sqlString(body.subsidyType === "subsidized" ? "subsidized" : "unsubsidized")}`);
    }
    if (Object.hasOwn(body, "interestRate")) {
      updates.push(`interest_rate = ${sqlString(body.interestRate)}`);
    }
    if (Object.hasOwn(body, "principal")) {
      updates.push(`principal = ${sqlString(body.principal)}`);
    }

    if (!updates.length) {
      sendJson(response, 400, { error: "No editable field provided." });
      return true;
    }

    runSql(`UPDATE loans SET ${updates.join(", ")} WHERE id = ${id};`);
    sendJson(response, 200, { loans: listLoans() });
    return true;
  }

  if (loanItemMatch && request.method === "DELETE") {
    const id = Number(loanItemMatch[1]);
    runSql(`DELETE FROM loans WHERE id = ${id};`);
    sendJson(response, 200, { loans: listLoans() });
    return true;
  }

  if (pathname === "/api/budgets" && request.method === "POST") {
    const body = await readBody(request);
    const categories = Array.isArray(body.categories) ? body.categories : [];

    runSql(
      `INSERT INTO budgets (start_date, end_date, required_income)
       VALUES (${sqlString(normalizeDate(body.startDate || ""))}, ${sqlString(normalizeDate(body.endDate || ""))}, ${sqlString(body.requiredIncome || "")});`
    );
    const budgetId = Number(runSql("SELECT id FROM budgets ORDER BY id DESC LIMIT 1;").trim());

    for (const category of categories) {
      if (!category.category && !category.amount) {
        continue;
      }
      runSql(
        `INSERT INTO budget_categories (budget_id, category, amount)
         VALUES (${budgetId}, ${sqlString(category.category || "Set Category")}, ${sqlString(category.amount || "")});`
      );
    }

    sendJson(response, 201, { budgets: listBudgets() });
    return true;
  }

  const budgetItemMatch = pathname.match(/^\/api\/budgets\/(\d+)$/);
  if (budgetItemMatch && request.method === "PATCH") {
    const id = Number(budgetItemMatch[1]);
    const body = await readBody(request);
    const categories = Array.isArray(body.categories) ? body.categories : [];

    runSql(
      `UPDATE budgets
       SET start_date = ${sqlString(normalizeDate(body.startDate || ""))},
           end_date = ${sqlString(normalizeDate(body.endDate || ""))},
           required_income = ${sqlString(body.requiredIncome || "")}
       WHERE id = ${id};`
    );
    runSql(`DELETE FROM budget_categories WHERE budget_id = ${id};`);

    for (const category of categories) {
      if (!category.category && !category.amount) {
        continue;
      }
      runSql(
        `INSERT INTO budget_categories (budget_id, category, amount)
         VALUES (${id}, ${sqlString(category.category || "Set Category")}, ${sqlString(category.amount || "")});`
      );
    }

    sendJson(response, 200, { budgets: listBudgets() });
    return true;
  }

  if (budgetItemMatch && request.method === "DELETE") {
    const id = Number(budgetItemMatch[1]);
    runSql(`DELETE FROM budget_categories WHERE budget_id = ${id};`);
    runSql(`DELETE FROM budgets WHERE id = ${id};`);
    sendJson(response, 200, { budgets: listBudgets() });
    return true;
  }

  const ledgerCollectionMatch = pathname.match(/^\/api\/(spending|income)$/);
  if (ledgerCollectionMatch && request.method === "GET") {
    const ledger = ledgerCollectionMatch[1];
    sendJson(response, 200, { [ledger]: listLedger(ledgers[ledger]) });
    return true;
  }

  if (ledgerCollectionMatch && request.method === "POST") {
    const ledger = ledgerCollectionMatch[1];
    const table = ledgers[ledger];

    if (!hasDefaultRow(table)) {
      runSql(
        `INSERT INTO ${table} (category, title, amount, date)
         VALUES ('Set Category', '', '', '');`
      );
    }

    sendJson(response, 201, { [ledger]: listLedger(table) });
    return true;
  }

  const ledgerItemMatch = pathname.match(/^\/api\/(spending|income)\/(\d+)$/);
  if (ledgerItemMatch && request.method === "PATCH") {
    const ledger = ledgerItemMatch[1];
    const table = ledgers[ledger];
    const id = Number(ledgerItemMatch[2]);
    const body = await readBody(request);
    const updates = [];

    if (Object.hasOwn(body, "category")) {
      updates.push(`category = ${sqlString(body.category)}`);
    }
    if (Object.hasOwn(body, "title")) {
      updates.push(`title = ${sqlString(body.title)}`);
    }
    if (Object.hasOwn(body, "amount")) {
      updates.push(`amount = ${sqlString(body.amount)}`);
    }
    if (Object.hasOwn(body, "date")) {
      updates.push(`date = ${sqlString(normalizeDate(body.date))}`);
    }

    if (!updates.length) {
      sendJson(response, 400, { error: "No editable field provided." });
      return true;
    }

    runSql(`UPDATE ${table} SET ${updates.join(", ")} WHERE id = ${id};`);
    sendJson(response, 200, { [ledger]: listLedger(table) });
    return true;
  }

  if (ledgerItemMatch && request.method === "DELETE") {
    const ledger = ledgerItemMatch[1];
    const table = ledgers[ledger];
    const id = Number(ledgerItemMatch[2]);
    runSql(`DELETE FROM ${table} WHERE id = ${id};`);
    sendJson(response, 200, { [ledger]: listLedger(table) });
    return true;
  }

  return false;
}

function sendStatic(request, response) {
  const requestPath = new URL(request.url, `http://${request.headers.host}`).pathname;
  const safePath = normalize(requestPath === "/" ? "/index.html" : requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(publicDir, safePath);

  if (!filePath.startsWith(publicDir) || !existsSync(filePath)) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, { "content-type": mimeTypes[extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath).pipe(response);
}

initDatabase();
normalizeExistingDates();

createServer(async (request, response) => {
  try {
    if (await handleApi(request, response)) {
      return;
    }

    sendStatic(request, response);
  } catch (error) {
    sendJson(response, 500, { error: error.message });
    return;
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Life Portal running at http://127.0.0.1:${port}`);
  console.log(`SQLite database: ${dbPath}`);
});
