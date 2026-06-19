const defaultLedgerCategories = {
  spending: {
    categories: [
      "Set Category",
      "Alcohol",
      "Subscriptions",
      "Clothing",
      "Educational",
      "Luxuries",
      "Necessities",
      "Dining",
      "Transportation",
      "Gambling",
      "Extracted Value",
      "Tuition",
      "Gifts",
      "Car"
    ]
  },
  income: {
    categories: [
      "Set Category",
      "Work Income",
      "Interest",
      "CashApp",
      "Venmo",
      "Tax Return",
      "Gambling Income",
      "Zelle",
      "Other",
      "Credit Cashback",
      "Gift"
    ]
  }
};
let ledgerConfig = JSON.parse(JSON.stringify(defaultLedgerCategories));

const ledgerLists = {
  spending: document.querySelector('[data-ledger-list="spending"]'),
  income: document.querySelector('[data-ledger-list="income"]')
};
const pageViews = document.querySelectorAll("[data-page]");
const pageLinks = document.querySelectorAll("[data-page-link]");
const budgetDialog = document.querySelector("[data-budget-dialog]");
const budgetForm = document.querySelector("[data-budget-form]");
const budgetCategories = document.querySelector("[data-budget-categories]");
const budgetDialogTitle = document.querySelector("[data-budget-dialog-title]");
const saveBudgetButton = document.querySelector("[data-save-budget]");
const confirmBudgetDelete = document.querySelector("[data-confirm-budget-delete]");
const builderBuckets = document.querySelector("[data-builder-buckets]");
const builderSummary = document.querySelector("[data-builder-summary]");
const startingCashInput = document.querySelector("[data-starting-cash]");
const builderBucketDialog = document.querySelector("[data-builder-bucket-dialog]");
const builderBucketForm = document.querySelector("[data-builder-bucket-form]");
const builderBucketTitle = document.querySelector("[data-builder-bucket-title]");
const saveBuilderBucketButton = document.querySelector("[data-save-builder-bucket]");
const builderBucketMode = document.querySelector("[data-builder-bucket-mode]");
const builderBucketModePanels = document.querySelectorAll("[data-builder-bucket-mode-panel]");
const builderExportDialog = document.querySelector("[data-builder-export-dialog]");
const builderExportJson = document.querySelector("[data-builder-export-json]");
const copyBuilderExportButton = document.querySelector("[data-copy-builder-export]");
const builderBlockDialog = document.querySelector("[data-builder-block-dialog]");
const builderBlockForm = document.querySelector("[data-builder-block-form]");
const builderBlockTitle = document.querySelector("[data-builder-block-title]");
const deleteBuilderBlockButton = document.querySelector("[data-delete-builder-block]");
const categoryDialog = document.querySelector("[data-category-dialog]");
const categoryForm = document.querySelector("[data-category-form]");
const categoryDialogTitle = document.querySelector("[data-category-dialog-title]");
const categoryNameInput = document.querySelector("[data-category-name]");
const categoryStatus = document.querySelector("[data-category-status]");
const saveCategoryButton = document.querySelector("[data-save-category]");
const budgetsScroll = document.querySelector("[data-budgets-scroll]");
const plaidStatus = document.querySelector("[data-plaid-status]");
const linkBankButton = document.querySelector("[data-link-bank]");
const plaidReviewButton = document.querySelector("[data-open-plaid-review]");
const plaidSkippedButton = document.querySelector("[data-open-plaid-skipped]");
const plaidSkippedCount = document.querySelector("[data-plaid-skipped-count]");
const plaidSkippedList = document.querySelector("[data-plaid-skipped-list]");
const plaidDialog = document.querySelector("[data-plaid-dialog]");
const plaidSkippedDialog = document.querySelector("[data-plaid-skipped-dialog]");
const plaidForm = document.querySelector("[data-plaid-form]");
const plaidReviewSummary = document.querySelector("[data-plaid-review-summary]");
const plaidLedgerSelect = document.querySelector("[data-plaid-ledger]");
const plaidCategorySelect = document.querySelector("[data-plaid-category]");
const plaidDescriptionInput = document.querySelector("[data-plaid-description]");
const loanList = document.querySelector("[data-loan-list]");
const loanDialog = document.querySelector("[data-loan-dialog]");
const loanForm = document.querySelector("[data-loan-form]");
const totalDebt = document.querySelector("[data-total-debt]");
const graduationDateLabel = document.querySelector("[data-graduation-date-label]");
const workList = document.querySelector("[data-work-list]");
const workSearch = document.querySelector("[data-work-search]");
const workCountLabel = document.querySelector("[data-work-count-label]");
const financeSankeyDialog = document.querySelector("[data-finance-sankey-dialog]");
const financeSankeyChart = document.querySelector("[data-finance-sankey-chart]");
const workSankeyDialog = document.querySelector("[data-work-sankey-dialog]");
const workSankeyChart = document.querySelector("[data-work-sankey-chart]");
const openAccountingButton = document.querySelector("[data-open-accounting]");
const accountingElements = {
  equation: document.querySelector("[data-accounting-equation]"),
  date: document.querySelector("[data-accounting-date]"),
  assets: document.querySelector("[data-accounting-assets]"),
  liabilities: document.querySelector("[data-accounting-liabilities]"),
  equity: document.querySelector("[data-accounting-equity]"),
  check: document.querySelector("[data-accounting-check]"),
  lists: {
    assets: document.querySelector('[data-accounting-list="assets"]'),
    liabilities: document.querySelector('[data-accounting-list="liabilities"]'),
    equity: document.querySelector('[data-accounting-list="equity"]'),
    ratios: document.querySelector('[data-accounting-list="ratios"]'),
    incomeStatement: document.querySelector('[data-accounting-list="incomeStatement"]'),
    cashFlow: document.querySelector('[data-accounting-list="cashFlow"]'),
    adjustments: document.querySelector('[data-accounting-list="adjustments"]')
  },
  trialBalance: document.querySelector("[data-trial-balance-list]"),
  journal: document.querySelector("[data-journal-list]")
};
const summaryElements = {
  currentBudgetSpending: document.querySelector("[data-current-budget-spending]"),
  currentBudgetPeriod: document.querySelector("[data-current-budget-period]"),
  totalSpending: document.querySelector("[data-total-spending]"),
  extractedValue: document.querySelector("[data-extracted-value]"),
  totalIncome: document.querySelector("[data-total-income]"),
  gdpContribution: document.querySelector("[data-gdp-contribution]"),
  categoryBreakdown: document.querySelector("[data-category-breakdown]"),
  donutChart: document.querySelector("[data-donut-chart]")
};
const defaultWorkStatuses = ["Saved", "Applied", "Screen", "Interview", "Offer", "Rejected", "Withdrawn"];
const workSummaryElements = {
  total: document.querySelector("[data-work-total]"),
  active: document.querySelector("[data-work-active]"),
  interviews: document.querySelector("[data-work-interviews]"),
  offers: document.querySelector("[data-work-offers]"),
  responseRate: document.querySelector("[data-work-response-rate]")
};
let financeData = { spending: [], income: [], budgets: [], loans: [], graduationDate: "", workApplications: [], workStatuses: defaultWorkStatuses };
let editingBudgetId = null;
let deletingBudgetId = null;
let editingBuilderBucketId = null;
let editingBuilderBlockId = null;
let editingBuilderBlockBucketId = null;
const expandedBuilderBlocks = new Set();
let pendingPlaidTransactions = [];
let skippedPlaidTransactions = [];
let activePlaidIndex = 0;
let plaidStatusText = "";
let linkedPlaidItems = [];
let plaidConfigured = false;
let plaidSyncPromise = null;
let categoryLedger = "spending";
let workQuery = "";

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "content-type": "application/json" },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

function cell(ledger, row, field, value) {
  const element = document.createElement("div");
  element.className = `ledger-cell ${field}`;

  if (field === "category") {
    element.append(categorySelect(ledger, row));
    return element;
  }

  element.append(textInput(ledger, row, field, value || ""));
  return element;
}

function categorySelect(ledger, row) {
  const editor = document.createElement("select");
  editor.className = "ledger-select";

  for (const category of categoriesForLedger(ledger, row.category)) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    editor.append(option);
  }

  editor.value = row.category || "Set Category";
  editor.addEventListener("change", () => saveField(ledger, row.id, "category", editor.value));
  return editor;
}

function uniqueCategories(categories) {
  const seen = new Set();
  return categories.filter((category) => {
    const key = String(category || "").toLowerCase();
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function categoriesForLedger(ledger, selected = "") {
  return uniqueCategories([
    ...(ledgerConfig[ledger]?.categories || defaultLedgerCategories[ledger].categories),
    selected
  ]);
}

function budgetCategoryOptions(selected = "") {
  return uniqueCategories([
    "Set Category",
    "All Spending",
    ...categoriesForLedger("spending").filter((category) => category !== "Set Category"),
    selected
  ]);
}

function updateLedgerCategories(categories = {}) {
  ledgerConfig = {
    spending: {
      categories: uniqueCategories(categories.spending || defaultLedgerCategories.spending.categories)
    },
    income: {
      categories: uniqueCategories(categories.income || defaultLedgerCategories.income.categories)
    }
  };
}

function textInput(ledger, row, field, value) {
  const editor = document.createElement("input");
  editor.className = `ledger-input ${field}`;
  editor.type = "text";
  editor.value = value;
  editor.addEventListener("blur", () => saveField(ledger, row.id, field, field === "date" ? normalizeDateText(editor.value) : editor.value));
  editor.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      editor.blur();
    }
    if (event.key === "Escape") {
      renderCurrent();
    }
  });
  return editor;
}

function deleteButton(ledger, row) {
  const button = document.createElement("button");
  button.className = "delete-row";
  button.type = "button";
  button.textContent = "x";
  button.setAttribute("aria-label", `Delete ${ledger} row`);
  button.addEventListener("click", async () => {
    await api(`/api/${ledger}/${row.id}`, { method: "DELETE" });
    renderCurrent();
  });
  return button;
}

function numberValue(value) {
  const normalized = String(value ?? "").replace(/[$,]/g, "").trim();
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

function formatNumber(value) {
  return value.toFixed(2);
}

function money(value) {
  const amount = Number(value) || 0;
  const sign = amount < 0 ? "-" : "";
  return `${sign}$${formatNumber(Math.abs(amount))}`;
}

function normalizeDateText(value, defaultYear = "2026") {
  const text = String(value || "").trim();
  const monthNames = {
    jan: 1,
    january: 1,
    feb: 2,
    february: 2,
    mar: 3,
    march: 3,
    apr: 4,
    april: 4,
    may: 5,
    jun: 6,
    june: 6,
    jul: 7,
    july: 7,
    aug: 8,
    august: 8,
    sep: 9,
    sept: 9,
    september: 9,
    oct: 10,
    october: 10,
    nov: 11,
    november: 11,
    dec: 12,
    december: 12
  };
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

  match = text.match(/^([a-z]+)\s+0?(\d{1,2})(?:,?\s+(\d{4}))?$/i);
  if (match && monthNames[match[1].toLowerCase()]) {
    return `${monthNames[match[1].toLowerCase()]}/${Number(match[2])}/${match[3] || defaultYear}`;
  }

  return text;
}

function parseAppDate(value) {
  const normalized = normalizeDateText(value);
  const match = normalized.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) {
    return null;
  }

  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function displayAppDate(value) {
  return normalizeDateText(value);
}

function daysBetween(startDate, endDate) {
  return Math.max((endDate.getTime() - startDate.getTime()) / 86_400_000, 0);
}

function displayPlaidDate(value) {
  return displayAppDate(value);
}

function parseDateValue(value) {
  const date = parseAppDate(value);
  if (!date) {
    return null;
  }
  return date.getTime();
}

function inDateRange(rowDate, startDate, endDate) {
  const row = parseDateValue(rowDate);
  const start = parseDateValue(startDate);
  const end = parseDateValue(endDate);

  if (row === null) {
    return false;
  }
  if (start !== null && row < start) {
    return false;
  }
  if (end !== null && row > end) {
    return false;
  }
  return true;
}

async function saveField(ledger, id, field, value) {
  await api(`/api/${ledger}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ [field]: value })
  });
  renderCurrent();
}

function currentBudgetCategoryRows() {
  return [...budgetCategories.querySelectorAll(".budget-category-row")].map((row) => ({
    category: row.querySelector('[name="category"]').value,
    amount: row.querySelector('[name="amount"]').value
  }));
}

function refreshBudgetCategoryRows() {
  const rows = currentBudgetCategoryRows();
  budgetCategories.replaceChildren(
    ...(rows.length ? rows : [{ category: "Set Category", amount: "" }])
      .map((row) => createBudgetCategoryRow(row.category, row.amount))
  );
}

function openCategoryForm(ledger) {
  categoryLedger = ledger === "income" ? "income" : "spending";
  categoryForm.reset();
  categoryStatus.textContent = "";
  saveCategoryButton.disabled = false;
  categoryDialogTitle.textContent = categoryLedger === "income" ? "New Income Category" : "New Spending Category";
  categoryDialog.showModal();
  categoryNameInput.focus();
}

async function createCategory(ledger, name) {
  const label = ledger === "income" ? "income" : "spending";
  const trimmed = String(name || "").trim().replace(/\s+/g, " ");

  if (!trimmed) {
    categoryStatus.textContent = "Enter a category name.";
    return;
  }

  saveCategoryButton.disabled = true;
  categoryStatus.textContent = "Creating category...";

  try {
    const result = await api("/api/categories", {
      method: "POST",
      body: JSON.stringify({ ledger: label, name: trimmed })
    });
    updateLedgerCategories(result.categories);

    if (result.duplicate) {
      categoryStatus.textContent = "That category already exists.";
      saveCategoryButton.disabled = false;
      return;
    }

    if (budgetDialog.open && label === "spending") {
      refreshBudgetCategoryRows();
    } else {
      await renderCurrent();
    }

    categoryDialog.close();
  } catch (error) {
    categoryStatus.textContent = "Could not create category. Restart the server if this keeps happening.";
    saveCategoryButton.disabled = false;
  }
}

function renderLedger(ledger, rows) {
  ledgerLists[ledger].replaceChildren(
    ...rows.map((row) => {
      const element = document.createElement("div");
      element.className = "ledger-row";
      element.append(cell(ledger, row, "date", row.date));
      element.append(cell(ledger, row, "category", row.category));
      element.append(cell(ledger, row, "title", row.title));
      element.append(cell(ledger, row, "amount", row.amount));
      element.append(deleteButton(ledger, row));
      return element;
    })
  );
}

function loanInput(row, field, value) {
  const editor = document.createElement("input");
  editor.className = `ledger-input ${field === "principal" ? "amount" : field}`;
  editor.type = "text";
  editor.value = value || "";
  editor.addEventListener("blur", () => saveLoanField(row.id, field, field === "issuedDate" ? normalizeDateText(editor.value) : editor.value));
  editor.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      editor.blur();
    }
    if (event.key === "Escape") {
      renderCurrent();
    }
  });
  return editor;
}

function loanTypeSelect(row) {
  const editor = document.createElement("select");
  editor.className = "ledger-select";
  for (const [value, label] of [["subsidized", "Subsidized"], ["unsubsidized", "Unsub"]]) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    editor.append(option);
  }
  editor.value = row.subsidyType || "unsubsidized";
  editor.addEventListener("change", () => saveLoanField(row.id, "subsidyType", editor.value));
  return editor;
}

function loanCell(className, child) {
  const element = document.createElement("div");
  element.className = `ledger-cell ${className}`;
  if (typeof child === "string") {
    element.textContent = child;
  } else {
    element.append(child);
  }
  return element;
}

function loanDeleteButton(row) {
  const button = document.createElement("button");
  button.className = "delete-row";
  button.type = "button";
  button.textContent = "x";
  button.setAttribute("aria-label", "Delete loan row");
  button.addEventListener("click", async () => {
    await api(`/api/loans/${row.id}`, { method: "DELETE" });
    renderCurrent();
  });
  return button;
}

function loanAmounts(row) {
  const principal = numberValue(row.principal);
  const rate = numberValue(row.interestRate) / 100;
  const issuedDate = parseAppDate(row.issuedDate);
  const graduationDate = parseAppDate(financeData.graduationDate);
  const accrualStart = row.subsidyType === "subsidized" ? graduationDate : issuedDate;

  if (!principal || !rate || !accrualStart) {
    return { principal, interest: 0, currentAmount: principal };
  }

  const interest = principal * rate * (daysBetween(accrualStart, new Date()) / 365);
  return {
    principal,
    interest,
    currentAmount: principal + interest
  };
}

async function saveLoanField(id, field, value) {
  await api(`/api/loans/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ [field]: value })
  });
  renderCurrent();
}

function renderDebt() {
  const rows = financeData.loans || [];
  let total = 0;

  loanList.replaceChildren(
    ...rows.map((row) => {
      const amounts = loanAmounts(row);
      total += amounts.currentAmount;
      const element = document.createElement("div");
      element.className = "ledger-row loan-row";
      element.append(loanCell("name", loanInput(row, "name", row.name)));
      element.append(loanCell("date", loanInput(row, "issuedDate", row.issuedDate)));
      element.append(loanCell("type", loanTypeSelect(row)));
      element.append(loanCell("rate", loanInput(row, "interestRate", row.interestRate)));
      element.append(loanCell("amount", loanInput(row, "principal", row.principal)));
      element.append(loanCell("amount readonly", formatNumber(amounts.interest)));
      element.append(loanCell("amount readonly", formatNumber(amounts.currentAmount)));
      element.append(loanDeleteButton(row));
      return element;
    })
  );

  totalDebt.textContent = formatNumber(total);
  graduationDateLabel.textContent = financeData.graduationDate
    ? `Graduation ${displayAppDate(financeData.graduationDate)}`
    : "No graduation date";
}

function workStatuses() {
  return financeData.workStatuses?.length ? financeData.workStatuses : defaultWorkStatuses;
}

function workInput(row, field, value) {
  const editor = document.createElement("input");
  editor.className = `ledger-input ${field}`;
  editor.type = field === "portalUrl" ? "url" : "text";
  editor.value = value || "";
  editor.addEventListener("blur", () => saveWorkField(row.id, field, ["appliedDate", "deadlineDate"].includes(field) ? normalizeDateText(editor.value) : editor.value));
  editor.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      editor.blur();
    }
    if (event.key === "Escape") {
      renderCurrent();
    }
  });
  return editor;
}

function workStatusSelect(row) {
  const editor = document.createElement("select");
  editor.className = "ledger-select";
  for (const status of workStatuses()) {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    editor.append(option);
  }
  editor.value = workStatuses().includes(row.status) ? row.status : "Saved";
  editor.addEventListener("change", () => saveWorkField(row.id, "status", editor.value));
  return editor;
}

function workCell(className, child) {
  const element = document.createElement("div");
  element.className = `ledger-cell ${className}`;
  element.append(child);
  return element;
}

function workPortalCell(row) {
  const wrapper = document.createElement("div");
  wrapper.className = "work-portal-cell";
  wrapper.append(workInput(row, "portalUrl", row.portalUrl));
  if (row.portalUrl) {
    const link = document.createElement("a");
    link.href = row.portalUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "Open";
    wrapper.append(link);
  }
  return workCell("portal", wrapper);
}

function workDeleteButton(row) {
  const button = document.createElement("button");
  button.className = "delete-row";
  button.type = "button";
  button.textContent = "x";
  button.setAttribute("aria-label", "Delete application row");
  button.addEventListener("click", async () => {
    await api(`/api/work/applications/${row.id}`, { method: "DELETE" });
    renderCurrent();
  });
  return button;
}

async function saveWorkField(id, field, value) {
  await api(`/api/work/applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ [field]: value })
  });
  renderCurrent();
}

function searchableWorkText(row) {
  return [
    row.company,
    row.role,
    row.status,
    row.appliedDate,
    row.deadlineDate,
    row.portalUrl,
    row.notes
  ].join(" ").toLowerCase();
}

function filteredWorkApplications() {
  const query = workQuery.trim().toLowerCase();
  const rows = financeData.workApplications || [];
  if (!query) {
    return rows;
  }
  return rows.filter((row) => searchableWorkText(row).includes(query));
}

function renderWorkSummary(rows) {
  const total = rows.length;
  const active = rows.filter((row) => !["Offer", "Rejected", "Withdrawn"].includes(row.status)).length;
  const interviews = rows.filter((row) => ["Interview", "Offer"].includes(row.status)).length;
  const offers = rows.filter((row) => row.status === "Offer").length;
  const responses = rows.filter((row) => ["Screen", "Interview", "Offer", "Rejected"].includes(row.status)).length;
  const applied = rows.filter((row) => row.status !== "Saved").length;

  workSummaryElements.total.textContent = String(total);
  workSummaryElements.active.textContent = String(active);
  workSummaryElements.interviews.textContent = String(interviews);
  workSummaryElements.offers.textContent = String(offers);
  workSummaryElements.responseRate.textContent = applied ? `${Math.round((responses / applied) * 100)}%` : "0%";
  workCountLabel.textContent = workQuery ? `${rows.length} matching` : `${total} tracked`;
}

function renderWork() {
  const rows = filteredWorkApplications();
  renderWorkSummary(rows);
  workList.replaceChildren(
    ...rows.map((row) => {
      const element = document.createElement("div");
      element.className = "ledger-row work-row";
      element.append(workCell("company", workInput(row, "company", row.company)));
      element.append(workCell("role", workInput(row, "role", row.role)));
      element.append(workCell("status", workStatusSelect(row)));
      element.append(workCell("date", workInput(row, "appliedDate", row.appliedDate)));
      element.append(workCell("date", workInput(row, "deadlineDate", row.deadlineDate)));
      element.append(workPortalCell(row));
      element.append(workCell("notes", workInput(row, "notes", row.notes)));
      element.append(workDeleteButton(row));
      return element;
    })
  );
}

function workFlowLinks(rows) {
  const links = new Map();
  for (const row of rows) {
    const history = [...(row.history || [])].sort((a, b) => a.id - b.id);
    const statuses = history.map((entry) => entry.status).filter(Boolean);
    if (!statuses.length && row.status) {
      statuses.push(row.status);
    }
    for (let index = 0; index < statuses.length - 1; index += 1) {
      const source = statuses[index];
      const target = statuses[index + 1];
      if (source === target) {
        continue;
      }
      const key = `${source}->${target}`;
      links.set(key, {
        source,
        target,
        count: (links.get(key)?.count || 0) + 1
      });
    }
    if (statuses.length === 1) {
      const key = `Start->${statuses[0]}`;
      links.set(key, {
        source: "Start",
        target: statuses[0],
        count: (links.get(key)?.count || 0) + 1
      });
    }
  }
  return [...links.values()];
}

function renderWorkSankey() {
  const rows = financeData.workApplications || [];
  const links = workFlowLinks(rows);
  if (!links.length) {
    workSankeyChart.replaceChildren();
    const empty = document.createElement("div");
    empty.className = "builder-empty";
    empty.textContent = "Add applications and change statuses to build a flow.";
    workSankeyChart.append(empty);
    return;
  }

  const columns = ["Start", ...workStatuses()];
  const maxCount = Math.max(...links.map((link) => link.count), 1);
  workSankeyChart.replaceChildren(
    ...columns.map((status) => {
      const incoming = links.filter((link) => link.target === status).reduce((total, link) => total + link.count, 0);
      const outgoing = links.filter((link) => link.source === status).reduce((total, link) => total + link.count, 0);
      const total = Math.max(incoming, outgoing);
      const column = document.createElement("div");
      column.className = "sankey-column";
      const node = document.createElement("div");
      node.className = "sankey-node";
      node.style.minHeight = `${34 + (total / maxCount) * 70}px`;
      node.append(document.createElement("strong"));
      node.append(document.createElement("span"));
      node.children[0].textContent = status;
      node.children[1].textContent = `${total} application${total === 1 ? "" : "s"}`;
      column.append(node);

      const outgoingLinks = links.filter((link) => link.source === status);
      for (const link of outgoingLinks) {
        const band = document.createElement("div");
        band.className = "sankey-band";
        band.style.height = `${Math.max(10, (link.count / maxCount) * 42)}px`;
        band.textContent = `${link.count} to ${link.target}`;
        column.append(band);
      }

      return column;
    })
  );
}

function groupedLedgerTotals(rows, fallbackCategory) {
  const totals = new Map();
  for (const row of rows || []) {
    const amount = Math.max(0, numberValue(row.amount));
    if (amount <= 0) {
      continue;
    }
    const category = row.category && row.category !== "Set Category" ? row.category : fallbackCategory;
    totals.set(category, (totals.get(category) || 0) + amount);
  }
  return [...totals.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount || a.category.localeCompare(b.category));
}

function financeSankeyModel() {
  const incomeTotals = groupedLedgerTotals(financeData.income, "Uncategorized Income");
  const spendingTotals = groupedLedgerTotals(
    (financeData.spending || []).filter((row) => row.category !== "Extracted Value"),
    "Uncategorized Spending"
  );
  const totalIncome = incomeTotals.reduce((total, row) => total + row.amount, 0);
  const totalSpending = spendingTotals.reduce((total, row) => total + row.amount, 0);
  const nodes = [];
  const links = [];

  for (const source of incomeTotals) {
    nodes.push({ id: `income:${source.category}`, name: source.category, value: source.amount, kind: "income" });
    links.push({ source: `income:${source.category}`, target: "income-pool", value: source.amount });
  }
  if (totalIncome > 0 || totalSpending > 0) {
    nodes.push({ id: "income-pool", name: "Income Pool", value: Math.max(totalIncome, totalSpending), kind: "pool" });
  }
  for (const target of spendingTotals) {
    nodes.push({ id: `spending:${target.category}`, name: target.category, value: target.amount, kind: "spending" });
    links.push({ source: "income-pool", target: `spending:${target.category}`, value: target.amount });
  }

  if (totalIncome > totalSpending) {
    nodes.push({ id: "savings", name: "Savings", value: totalIncome - totalSpending, kind: "savings" });
    links.push({ source: "income-pool", target: "savings", value: totalIncome - totalSpending });
  }
  if (totalSpending > totalIncome && totalSpending > 0) {
    nodes.push({ id: "unfunded", name: "Unfunded", value: totalSpending - totalIncome, kind: "unfunded" });
    links.push({ source: "unfunded", target: "income-pool", value: totalSpending - totalIncome });
  }

  return { nodes, links: links.filter((link) => link.value > 0.01), totalIncome, totalSpending };
}

function renderFinanceSankey() {
  if (!financeSankeyChart) {
    return;
  }
  financeSankeyChart.replaceChildren();

  if (!window.d3?.sankey) {
    const empty = document.createElement("div");
    empty.className = "builder-empty";
    empty.textContent = "Sankey library did not load.";
    financeSankeyChart.append(empty);
    return;
  }

  const model = financeSankeyModel();
  if (!model.nodes.length || !model.links.length) {
    const empty = document.createElement("div");
    empty.className = "builder-empty";
    empty.textContent = "Add income and spending rows to build an income flow.";
    financeSankeyChart.append(empty);
    return;
  }

  const width = Math.max(1100, financeSankeyChart.clientWidth || 1100);
  const height = Math.max(760, 170 + model.nodes.length * 44);
  const leftLabelGutter = Math.min(260, width * 0.22);
  const rightLabelGutter = Math.min(300, width * 0.24);
  const svg = d3.select(financeSankeyChart)
    .append("svg")
    .attr("class", "finance-sankey-svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Sankey chart of income categories flowing into spending categories and savings");

  const graph = d3.sankey()
    .nodeId((node) => node.id)
    .nodeWidth(18)
    .nodePadding(22)
    .extent([[leftLabelGutter, 32], [width - rightLabelGutter, height - 32]])({
      nodes: model.nodes.map((node) => ({ ...node })),
      links: model.links.map((link) => ({ ...link }))
    });
  const color = (kind) => ({
    income: "#9ffcdf",
    pool: "#ffffff",
    spending: "#e9edf2",
    savings: "#7cc7ff",
    unfunded: "#ffb86b"
  })[kind] || "#ffffff";
  const labelX = (d) => (
    d.kind === "income" || d.kind === "unfunded"
      ? d.x0 - 14
      : d.x1 + 14
  );
  const labelAnchor = (d) => (
    d.kind === "income" || d.kind === "unfunded" ? "end" : "start"
  );

  svg.append("g")
    .selectAll("path")
    .data(graph.links)
    .join("path")
    .attr("class", "finance-sankey-link")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", (link) => color(link.target.kind))
    .attr("stroke-width", (link) => Math.max(1, link.width))
    .append("title")
    .text((link) => `${link.source.name} to ${link.target.name}: ${money(link.value)}`);

  const node = svg.append("g")
    .selectAll("g")
    .data(graph.nodes)
    .join("g")
    .attr("class", "finance-sankey-node");

  node.append("rect")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("height", (d) => Math.max(1, d.y1 - d.y0))
    .attr("width", (d) => d.x1 - d.x0)
    .attr("fill", (d) => color(d.kind));

  node.append("text")
    .attr("x", labelX)
    .attr("y", (d) => (d.y0 + d.y1) / 2 - 5)
    .attr("text-anchor", labelAnchor)
    .text((d) => d.name);

  node.append("text")
    .attr("class", "finance-sankey-value")
    .attr("x", labelX)
    .attr("y", (d) => (d.y0 + d.y1) / 2 + 10)
    .attr("text-anchor", labelAnchor)
    .text((d) => money(d.value));
}

function sumRows(rows, predicate = () => true) {
  return rows.reduce((total, row) => (
    predicate(row) ? total + numberValue(row.amount) : total
  ), 0);
}

function accountingModel(data) {
  const spending = data.spending || [];
  const income = data.income || [];
  const loans = data.loans || [];
  const totalIncome = sumRows(income);
  const tuitionPaid = sumRows(spending, (row) => row.category === "Tuition");
  const carCost = sumRows(spending, (row) => row.category === "Car");
  const extractedValue = sumRows(spending, (row) => row.category === "Extracted Value");
  const operatingExpenses = sumRows(spending, (row) => (
    !["Tuition", "Car", "Extracted Value", "Set Category"].includes(row.category)
  ));
  const unclassifiedExpenses = sumRows(spending, (row) => row.category === "Set Category");
  const totalSpending = tuitionPaid + carCost + extractedValue + operatingExpenses + unclassifiedExpenses;
  const cash = totalIncome - totalSpending;
  const loanPrincipal = loans.reduce((total, row) => total + numberValue(row.principal), 0);
  const loanInterest = loans.reduce((total, row) => total + loanAmounts(row).interest, 0);
  const educationCost = tuitionPaid + loanPrincipal;
  const educationAppreciation = educationCost * 0.08;
  const carDepreciation = carCost * 0.15;
  const currentLiabilities = loanInterest + Math.min(loanPrincipal * 0.1, loanPrincipal);
  const adjustedExpenses = operatingExpenses + unclassifiedExpenses + loanInterest + carDepreciation;
  const netIncome = totalIncome + educationAppreciation - adjustedExpenses;

  const assets = [
    { label: "Cash Position", amount: cash },
    { label: "Education Asset at Cost", amount: educationCost },
    { label: "Unrealized Education Appreciation", amount: educationAppreciation },
    { label: "Vehicle at Cost", amount: carCost },
    { label: "Less: Accumulated Depreciation", amount: -carDepreciation }
  ];
  const liabilities = [
    { label: "Student Loans Payable", amount: loanPrincipal },
    { label: "Accrued Interest Payable", amount: loanInterest }
  ].filter((row) => row.amount > 0);
  const assetTotal = assets.reduce((total, row) => total + row.amount, 0);
  const liabilityTotal = liabilities.reduce((total, row) => total + row.amount, 0);
  const equityTotal = assetTotal - liabilityTotal;
  const equity = [
    { label: "Owner Capital, Closing", amount: equityTotal },
    { label: "Adjusted Net Income", amount: netIncome },
    { label: "Owner Draws", amount: -extractedValue },
    { label: "Accumulated OCI: Education", amount: educationAppreciation }
  ];

  const accounts = {
    cash: { code: "101", name: "Cash", type: "Asset", normal: "Debit" },
    education: { code: "151", name: "Education Asset", type: "Asset", normal: "Debit" },
    vehicle: { code: "161", name: "Vehicle", type: "Asset", normal: "Debit" },
    accumDep: { code: "169", name: "Accumulated Depreciation - Vehicle", type: "Contra Asset", normal: "Credit" },
    loan: { code: "201", name: "Student Loans Payable", type: "Liability", normal: "Credit" },
    interestPayable: { code: "202", name: "Accrued Interest Payable", type: "Liability", normal: "Credit" },
    revenue: { code: "401", name: "Personal Income Revenue", type: "Revenue", normal: "Credit" },
    appreciation: { code: "451", name: "Unrealized Appreciation Gain", type: "Revenue", normal: "Credit" },
    operatingExpense: { code: "501", name: "Operating Expense", type: "Expense", normal: "Debit" },
    unclassifiedExpense: { code: "509", name: "Unclassified Expense", type: "Expense", normal: "Debit" },
    interestExpense: { code: "521", name: "Interest Expense", type: "Expense", normal: "Debit" },
    depreciationExpense: { code: "531", name: "Depreciation Expense", type: "Expense", normal: "Debit" },
    draws: { code: "302", name: "Owner Draws", type: "Contra Equity", normal: "Debit" }
  };

  const journalEntries = [
    {
      title: "Recognize Income",
      lines: [
        ["Debit", "cash", totalIncome],
        ["Credit", "revenue", totalIncome]
      ]
    },
    {
      title: "Record Operating Spending",
      lines: [
        ["Debit", "operatingExpense", operatingExpenses],
        ["Credit", "cash", operatingExpenses]
      ]
    },
    {
      title: "Clear Unclassified Spending",
      lines: [
        ["Debit", "unclassifiedExpense", unclassifiedExpenses],
        ["Credit", "cash", unclassifiedExpenses]
      ]
    },
    {
      title: "Capitalize Education",
      lines: [
        ["Debit", "education", tuitionPaid],
        ["Credit", "cash", tuitionPaid]
      ]
    },
    {
      title: "Capitalize Vehicle",
      lines: [
        ["Debit", "vehicle", carCost],
        ["Credit", "cash", carCost]
      ]
    },
    {
      title: "Record Owner Draws",
      lines: [
        ["Debit", "draws", extractedValue],
        ["Credit", "cash", extractedValue]
      ]
    },
    {
      title: "Record Student Loan Principal",
      lines: [
        ["Debit", "education", loanPrincipal],
        ["Credit", "loan", loanPrincipal]
      ]
    },
    {
      title: "Accrue Loan Interest",
      lines: [
        ["Debit", "interestExpense", loanInterest],
        ["Credit", "interestPayable", loanInterest]
      ]
    },
    {
      title: "Record Appreciation",
      lines: [
        ["Debit", "education", educationAppreciation],
        ["Credit", "appreciation", educationAppreciation]
      ]
    },
    {
      title: "Record Depreciation",
      lines: [
        ["Debit", "depreciationExpense", carDepreciation],
        ["Credit", "accumDep", carDepreciation]
      ]
    }
  ].filter((entry) => entry.lines.some(([, , amount]) => amount > 0));
  const trialBalance = Object.entries(accounts).map(([key, account]) => {
    const naturalBalance = journalEntries.reduce((balance, entry) => {
      return balance + entry.lines.reduce((lineBalance, [side, lineKey, amount]) => {
        if (lineKey !== key) {
          return lineBalance;
        }
        const isNormalSide = side === account.normal;
        return lineBalance + (isNormalSide ? amount : -amount);
      }, 0);
    }, 0);
    const isDebit = account.normal === "Debit" ? naturalBalance >= 0 : naturalBalance < 0;
    return {
      ...account,
      key,
      balance: naturalBalance,
      debit: isDebit ? Math.abs(naturalBalance) : 0,
      credit: isDebit ? 0 : Math.abs(naturalBalance)
    };
  }).filter((account) => Math.abs(account.balance) > 0.005);
  const trialDebitTotal = trialBalance.reduce((total, account) => total + account.debit, 0);
  const trialCreditTotal = trialBalance.reduce((total, account) => total + account.credit, 0);
  const monthsCovered = Math.max(1, new Set([...spending, ...income].map((row) => {
    const date = parseAppDate(row.date);
    return date ? `${date.getFullYear()}-${date.getMonth()}` : "";
  }).filter(Boolean)).size);
  const monthlyBurn = adjustedExpenses / monthsCovered;

  return {
    assets,
    liabilities,
    equity,
    assetTotal,
    liabilityTotal,
    equityTotal,
    journalEntries: journalEntries.map((entry) => ({
      ...entry,
      lines: entry.lines.map(([side, accountKey, amount]) => [side, accounts[accountKey].name, amount])
    })),
    trialBalance,
    trialDebitTotal,
    trialCreditTotal,
    incomeStatement: [
      { label: "Personal Income Revenue", amount: totalIncome },
      { label: "Unrealized Appreciation Gain", amount: educationAppreciation },
      { label: "Operating Expense", amount: -operatingExpenses },
      { label: "Unclassified Expense", amount: -unclassifiedExpenses },
      { label: "Interest Expense", amount: -loanInterest },
      { label: "Depreciation Expense", amount: -carDepreciation },
      { label: "Adjusted Net Income", amount: netIncome }
    ].filter((row) => Math.abs(row.amount) > 0.005),
    cashFlow: [
      { label: "Operating Cash Flow", amount: totalIncome - operatingExpenses - unclassifiedExpenses },
      { label: "Investing Cash Flow", amount: -(tuitionPaid + carCost) },
      { label: "Financing Cash Flow", amount: loanPrincipal - extractedValue },
      { label: "Net Change in Cash", amount: cash }
    ],
    adjustments: [
      { label: "Accrual: Loan Interest", amount: loanInterest },
      { label: "Deferral: Capitalized Tuition", amount: tuitionPaid },
      { label: "Deferral: Capitalized Vehicle", amount: carCost },
      { label: "Estimate: Education Appreciation", amount: educationAppreciation },
      { label: "Estimate: Vehicle Depreciation", amount: carDepreciation },
      { label: "Closing: Revenue to Equity", amount: totalIncome + educationAppreciation },
      { label: "Closing: Expenses to Equity", amount: -adjustedExpenses },
      { label: "Closing: Draws to Equity", amount: -extractedValue }
    ].filter((row) => Math.abs(row.amount) > 0.005),
    ratios: [
      { label: "Working Capital", amount: cash - currentLiabilities },
      { label: "Current Ratio", amount: currentLiabilities > 0 ? cash / currentLiabilities : 0, display: currentLiabilities > 0 ? `${(cash / currentLiabilities).toFixed(2)}x` : "n/a" },
      { label: "Debt to Assets", amount: assetTotal > 0 ? liabilityTotal / assetTotal : 0, display: assetTotal > 0 ? `${((liabilityTotal / assetTotal) * 100).toFixed(1)}%` : "n/a" },
      { label: "Debt to Equity", amount: equityTotal ? liabilityTotal / equityTotal : 0, display: equityTotal ? `${(liabilityTotal / equityTotal).toFixed(2)}x` : "n/a" },
      { label: "Equity Ratio", amount: assetTotal > 0 ? equityTotal / assetTotal : 0, display: assetTotal > 0 ? `${((equityTotal / assetTotal) * 100).toFixed(1)}%` : "n/a" },
      { label: "Monthly Burn", amount: monthlyBurn },
      { label: "Cash Runway", amount: monthlyBurn > 0 ? cash / monthlyBurn : 0, display: monthlyBurn > 0 ? `${(cash / monthlyBurn).toFixed(1)} mo` : "n/a" },
      { label: "Trial Balance Difference", amount: trialDebitTotal - trialCreditTotal }
    ]
  };
}

function renderAccountingList(kind, rows) {
  accountingElements.lists[kind].replaceChildren(
    ...rows.map((row) => {
      const element = document.createElement("div");
      element.className = "accounting-row";
      element.append(document.createElement("span"));
      element.append(document.createElement("strong"));
      element.children[0].textContent = row.label;
      element.children[1].textContent = row.display || money(row.amount);
      return element;
    })
  );
}

function renderTrialBalance(rows, debitTotal, creditTotal) {
  accountingElements.trialBalance.replaceChildren(
    ...[
      (() => {
        const header = document.createElement("div");
        header.className = "trial-balance-row trial-balance-header";
        for (const value of ["Code", "Account", "Class", "Normal", "Debit", "Credit"]) {
          const cellElement = document.createElement("span");
          cellElement.textContent = value;
          header.append(cellElement);
        }
        return header;
      })(),
      ...rows.map((row) => {
        const element = document.createElement("div");
        element.className = "trial-balance-row";
        for (const value of [
          row.code,
          row.name,
          row.type,
          row.normal,
          row.debit ? money(row.debit) : "",
          row.credit ? money(row.credit) : ""
        ]) {
          const cellElement = document.createElement("span");
          cellElement.textContent = value;
          element.append(cellElement);
        }
        return element;
      }),
      (() => {
        const total = document.createElement("div");
        total.className = "trial-balance-row trial-balance-total";
        for (const value of ["", "Total", "", "", money(debitTotal), money(creditTotal)]) {
          const cellElement = document.createElement("span");
          cellElement.textContent = value;
          total.append(cellElement);
        }
        return total;
      })()
    ]
  );
}

function renderJournalEntries(entries) {
  accountingElements.journal.replaceChildren(
    ...entries.map((entry) => {
      const article = document.createElement("article");
      article.className = "journal-entry";
      const title = document.createElement("strong");
      title.textContent = entry.title;
      article.append(title);

      for (const [side, account, amount] of entry.lines) {
        const line = document.createElement("div");
        line.className = side === "Credit" ? "journal-line is-credit" : "journal-line";
        line.append(document.createElement("span"));
        line.append(document.createElement("span"));
        line.append(document.createElement("strong"));
        line.children[0].textContent = side;
        line.children[1].textContent = account;
        line.children[2].textContent = money(amount);
        article.append(line);
      }

      return article;
    })
  );
}

function renderAccounting(data) {
  const model = accountingModel(data);
  const checkDifference = model.assetTotal - model.liabilityTotal - model.equityTotal;

  accountingElements.assets.textContent = money(model.assetTotal);
  accountingElements.liabilities.textContent = money(model.liabilityTotal);
  accountingElements.equity.textContent = money(model.equityTotal);
  accountingElements.check.textContent = Math.abs(checkDifference) < 0.01 ? "Balanced" : money(checkDifference);
  accountingElements.equation.textContent = `${money(model.assetTotal)} = ${money(model.liabilityTotal)} + ${money(model.equityTotal)}`;
  accountingElements.date.textContent = displayAppDate(`${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`);

  renderAccountingList("assets", model.assets);
  renderAccountingList("liabilities", model.liabilities);
  renderAccountingList("equity", model.equity);
  renderAccountingList("ratios", model.ratios);
  renderAccountingList("incomeStatement", model.incomeStatement);
  renderAccountingList("cashFlow", model.cashFlow);
  renderAccountingList("adjustments", model.adjustments);
  renderTrialBalance(model.trialBalance, model.trialDebitTotal, model.trialCreditTotal);
  renderJournalEntries(model.journalEntries);
}

function createBudgetCategoryRow(category = "Set Category", amount = "") {
  const row = document.createElement("div");
  row.className = "budget-category-row";

  const select = document.createElement("select");
  select.className = "ledger-select";
  select.name = "category";
  for (const optionCategory of budgetCategoryOptions(category)) {
    const option = document.createElement("option");
    option.value = optionCategory;
    option.textContent = optionCategory;
    select.append(option);
  }
  select.value = category;

  const input = document.createElement("input");
  input.className = "ledger-input amount";
  input.name = "amount";
  input.type = "text";
  input.placeholder = "0";
  input.value = amount;

  row.append(select);
  row.append(input);
  return row;
}

function openBudgetForm(budget = null) {
  editingBudgetId = budget?.id || null;
  budgetForm.reset();
  budgetDialogTitle.textContent = budget ? "Edit Budget" : "New Budget";
  saveBudgetButton.textContent = budget ? "Save Budget" : "Create Budget";
  budgetForm.elements.startDate.value = budget?.startDate || "";
  budgetForm.elements.endDate.value = budget?.endDate || "";
  budgetForm.elements.requiredIncome.value = budget?.requiredIncome || "";
  budgetCategories.replaceChildren(
    ...(budget?.categories?.length
      ? budget.categories.map((row) => createBudgetCategoryRow(row.category, row.amount))
      : [createBudgetCategoryRow()])
  );
  budgetDialog.showModal();
}

function openDeleteBudgetConfirm(budgetId) {
  deletingBudgetId = budgetId;
  confirmBudgetDelete.showModal();
}

function budgetSegment(className, value, total, label = "") {
  const segment = document.createElement("i");
  segment.className = className;
  segment.style.width = `${total > 0 ? (Math.max(value, 0) / total) * 100 : 0}%`;
  if (label) {
    segment.title = label;
    segment.setAttribute("aria-label", label);
  }
  return segment;
}

function budgetStackedBar(parts) {
  const wrapper = document.createElement("div");
  wrapper.className = "budget-stack";

  const rows = document.createElement("div");
  rows.className = "budget-stack-rows";

  for (const row of parts.categories) {
    const item = document.createElement("div");
    item.className = "budget-stack-row";

    const label = document.createElement("span");
    label.className = "budget-stack-label";
    label.textContent = row.category;

    const bar = document.createElement("div");
    bar.className = "budget-stack-track";
    const total = Math.max(row.allowed, row.spent);
    const spentInBudget = row.over > 0 ? row.allowed : row.spent;

    bar.append(budgetSegment("spent", spentInBudget, total, `${row.category} spent ${formatNumber(row.spent)}`));
    bar.append(budgetSegment("spending-left", row.left, total, `${row.category} left ${formatNumber(row.left)}`));
    bar.append(budgetSegment("over-spent", row.over, total, `${row.category} over ${formatNumber(row.over)}`));

    item.append(label);
    item.append(bar);
    rows.append(item);
  }

  if (parts.income) {
    const item = document.createElement("div");
    item.className = "budget-stack-row";

    const label = document.createElement("span");
    label.className = "budget-stack-label";
    label.textContent = "Income";

    const bar = document.createElement("div");
    bar.className = "budget-stack-track";
    const total = Math.max(parts.income.required, parts.income.made);

    bar.append(budgetSegment("income-made", parts.income.made, total, `Income made ${formatNumber(parts.income.made)}`));
    bar.append(budgetSegment("income-left", parts.income.left, total, `Income needed ${formatNumber(parts.income.left)}`));

    item.append(label);
    item.append(bar);
    rows.append(item);
  }

  const legend = document.createElement("div");
  legend.className = "budget-stack-legend";
  const labels = [
    ["Spent", parts.categories.reduce((total, row) => total + row.spent, 0)],
    ["Left to Spend", parts.categories.reduce((total, row) => total + row.left, 0)],
    ["Over", parts.categories.reduce((total, row) => total + row.over, 0)],
    ["Income Made", parts.income?.made || 0],
    ["Income Needed", parts.income?.left || 0]
  ].filter(([, value]) => value > 0);

  for (const [label, value] of labels) {
    const item = document.createElement("span");
    item.textContent = `${label} ${formatNumber(value)}`;
    legend.append(item);
  }

  wrapper.append(rows);
  wrapper.append(legend);
  return wrapper;
}

function budgetCategorySummaries(budget, rangeSpending) {
  const explicitCategories = new Set(
    budget.categories
      .map((row) => row.category)
      .filter((category) => category !== "Set Category" && category !== "All Spending")
  );

  return budget.categories
    .filter((row) => row.category && row.category !== "Set Category")
    .map((row) => {
      const allowed = numberValue(row.amount);
      const spent = rangeSpending.reduce((total, spendingRow) => {
        if (row.category === "All Spending") {
          return explicitCategories.has(spendingRow.category) || spendingRow.category === "Tuition"
            ? total
            : total + numberValue(spendingRow.amount);
        }
        return spendingRow.category === row.category ? total + numberValue(spendingRow.amount) : total;
      }, 0);

      return {
        category: row.category,
        allowed,
        spent,
        left: Math.max(allowed - spent, 0),
        over: Math.max(spent - allowed, 0)
      };
    })
    .filter((row) => row.allowed > 0 || row.spent > 0);
}

function budgetCategoryStatusRows(summaries) {
  const list = document.createElement("div");
  list.className = "budget-category-status";

  for (const row of summaries) {
    const item = document.createElement("span");
    const balance = row.over > 0
      ? `${formatNumber(row.over)} over`
      : `${formatNumber(row.left)} left`;
    item.className = row.over > 0 ? "is-over" : "";
    item.textContent = `${row.category}: ${balance}`;
    list.append(item);
  }

  return list;
}

function combinedBudgetRows(budget) {
  const spending = financeData.spending
    .filter((row) => inDateRange(row.date, budget.startDate, budget.endDate))
    .map((row) => ({ ...row, type: "Spending" }));
  const income = financeData.income
    .filter((row) => inDateRange(row.date, budget.startDate, budget.endDate))
    .map((row) => ({ ...row, type: "Income" }));

  return [...spending, ...income].sort((a, b) => {
    const dateSort = (parseDateValue(a.date) || 0) - (parseDateValue(b.date) || 0);
    return dateSort || b.id - a.id;
  });
}

function renderBudgetTable(rows) {
  const table = document.createElement("div");
  table.className = "budget-table";
  for (const row of rows) {
    const entry = document.createElement("div");
    entry.className = "budget-table-row";
    for (const value of [row.date, row.type, row.category, row.title, row.amount]) {
      const cell = document.createElement("span");
      cell.textContent = value || "";
      entry.append(cell);
    }
    table.append(entry);
  }
  return table;
}

function budgetSortTime(budget) {
  return parseDateValue(budget.startDate) || parseDateValue(budget.endDate) || 0;
}

function budgetIsCurrent(budget, today = new Date()) {
  const start = parseDateValue(budget.startDate);
  const end = parseDateValue(budget.endDate);
  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  if (start !== null && current < start) {
    return false;
  }
  if (end !== null && current > end) {
    return false;
  }
  return start !== null || end !== null;
}

function currentBudgetForToday(budgets, today = new Date()) {
  return sortedBudgetsForDisplay(budgets).find((budget) => budgetIsCurrent(budget, today)) || null;
}

function sortedBudgetsForDisplay(budgets) {
  const today = new Date();
  return [...budgets].sort((a, b) => {
    const currentSort = Number(budgetIsCurrent(b, today)) - Number(budgetIsCurrent(a, today));
    if (currentSort) {
      return currentSort;
    }

    return budgetSortTime(b) - budgetSortTime(a) || b.id - a.id;
  });
}

function renderBudgets() {
  budgetsScroll.replaceChildren(
    ...sortedBudgetsForDisplay(financeData.budgets).map((budget) => {
      const rangeSpending = financeData.spending.filter((row) => inDateRange(row.date, budget.startDate, budget.endDate));
      const rangeIncome = financeData.income.filter((row) => inDateRange(row.date, budget.startDate, budget.endDate));
      const categorySummaries = budgetCategorySummaries(budget, rangeSpending);
      const requiredIncome = numberValue(budget.requiredIncome);
      const incomeMade = rangeIncome.reduce((total, row) => total + numberValue(row.amount), 0);
      const card = document.createElement("article");
      card.className = "budget-card";

      const title = document.createElement("div");
      title.className = "budget-card-title";
      title.append(document.createElement("strong"));
      title.append(document.createElement("span"));
      title.append(document.createElement("button"));
      title.children[0].textContent = `${budget.startDate || "Start"} - ${budget.endDate || "End"}`;
      title.children[1].textContent = `${budget.categories.length} categories`;
      title.children[2].className = "delete-row";
      title.children[2].type = "button";
      title.children[2].textContent = "x";
      title.children[2].setAttribute("aria-label", "Delete budget");
      title.children[2].addEventListener("click", () => openDeleteBudgetConfirm(budget.id));
      card.append(title);
      card.append(budgetCategoryStatusRows(categorySummaries));

      const actions = document.createElement("div");
      actions.className = "budget-actions";
      const editButton = document.createElement("button");
      editButton.className = "add-button";
      editButton.type = "button";
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => openBudgetForm(budget));
      actions.append(editButton);
      card.append(actions);

      card.append(budgetStackedBar({
        categories: categorySummaries,
        income: requiredIncome > 0 ? {
          required: requiredIncome,
          made: Math.min(incomeMade, requiredIncome),
          left: Math.max(requiredIncome - incomeMade, 0)
        } : null
      }));
      card.append(renderBudgetTable(combinedBudgetRows(budget)));
      return card;
    })
  );
}

function budgetBuilderSortTime(bucket) {
  return parseDateValue(bucket.startDate) || parseDateValue(bucket.endDate) || 0;
}

function sortedBuilderBuckets() {
  return [...(financeData.budgetBuilder?.buckets || [])].sort((a, b) => (
    budgetBuilderSortTime(a) - budgetBuilderSortTime(b) || a.id - b.id
  ));
}

function builderBlockTotals(blocks) {
  return blocks.reduce((totals, block) => {
    const amount = numberValue(block.amount);
    if (block.type === "income") {
      totals.income += amount;
    } else {
      totals.expenses += amount;
    }
    return totals;
  }, { income: 0, expenses: 0 });
}

const builderRepeatLabels = {
  once: "One-time",
  monthly: "Monthly",
  biweekly: "Every 2 weeks",
  weekly: "Weekly"
};

function builderLedgerForType(type) {
  return type === "income" ? "income" : "spending";
}

function updateBuilderCategoryOptions(type, selected = "") {
  const categorySelect = builderBlockForm.elements.category;
  const categories = categoriesForLedger(builderLedgerForType(type)).filter((category) => category !== "All Spending");
  categorySelect.replaceChildren(
    ...categories.map((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      return option;
    })
  );
  categorySelect.value = categories.includes(selected) ? selected : "Set Category";
}

const builderBlockTemplates = {
  paycheck: {
    name: "Paycheck",
    type: "income",
    category: "Work Income",
    repeatRule: "biweekly"
  },
  tuition: {
    name: "Tuition",
    type: "expense",
    category: "Tuition",
    repeatRule: "once"
  },
  "semester-spending": {
    name: "Semester Spending",
    type: "expense",
    category: "Educational",
    repeatRule: "biweekly"
  },
  "tax-refund": {
    name: "Tax Refund",
    type: "income",
    category: "Tax Return",
    repeatRule: "once"
  }
};

function applyBuilderBlockTemplate(templateId) {
  const template = builderBlockTemplates[templateId];
  if (!template) {
    return;
  }
  builderBlockForm.elements.name.value = template.name;
  builderBlockForm.elements.type.value = template.type;
  updateBuilderCategoryOptions(template.type, template.category);
  builderBlockForm.elements.repeatRule.value = template.repeatRule;
  if (template.repeatRule === "once") {
    builderBlockForm.elements.repeatEndDate.value = "";
  }
}

function appDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function compareAppDates(a, b) {
  return appDateKey(a).localeCompare(appDateKey(b));
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addMonths(date, months, preferredDay = date.getDate()) {
  const next = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(preferredDay, lastDay));
  return next;
}

function nextBuilderRepeatDate(date, repeatRule, preferredDay) {
  if (repeatRule === "weekly") {
    return addDays(date, 7);
  }
  if (repeatRule === "biweekly") {
    return addDays(date, 14);
  }
  if (repeatRule === "monthly") {
    return addMonths(date, 1, preferredDay);
  }
  return null;
}

function bucketDateRange(bucket) {
  const start = parseAppDate(bucket.startDate) || parseAppDate(bucket.endDate);
  const end = parseAppDate(bucket.endDate) || parseAppDate(bucket.startDate);
  return { start, end };
}

function bucketContainsDate(bucket, date) {
  const { start, end } = bucketDateRange(bucket);
  if (!date || !start || !end) {
    return false;
  }
  return compareAppDates(date, start) >= 0 && compareAppDates(date, end) <= 0;
}

function findBuilderBucketForDate(buckets, date) {
  return buckets.find((bucket) => bucketContainsDate(bucket, date)) || null;
}

function builderTimelineBounds(buckets) {
  const dates = buckets.flatMap((bucket) => [parseAppDate(bucket.startDate), parseAppDate(bucket.endDate)]).filter(Boolean);
  if (!dates.length) {
    return { start: null, end: null };
  }
  return {
    start: dates.reduce((earliest, date) => (compareAppDates(date, earliest) < 0 ? date : earliest), dates[0]),
    end: dates.reduce((latest, date) => (compareAppDates(date, latest) > 0 ? date : latest), dates[0])
  };
}

function emptyBuilderTotals() {
  return { income: 0, expenses: 0, events: [] };
}

function addBuilderOccurrence(bucketTotals, bucketId, occurrence) {
  if (!bucketTotals.has(bucketId)) {
    bucketTotals.set(bucketId, emptyBuilderTotals());
  }
  const totals = bucketTotals.get(bucketId);
  if (occurrence.type === "income") {
    totals.income += occurrence.amount;
  } else {
    totals.expenses += occurrence.amount;
  }
  totals.events.push(occurrence);
}

function builderOccurrenceElement(occurrence) {
  const row = document.createElement("div");
  row.className = `builder-scheduled-event is-${occurrence.type === "income" ? "income" : "expense"}`;
  row.append(document.createElement("span"));
  row.append(document.createElement("strong"));
  row.append(document.createElement("em"));
  row.children[0].textContent = occurrence.name || (occurrence.type === "income" ? "Income" : "Expense");
  row.children[1].textContent = `${occurrence.type === "income" ? "+" : "-"}${money(occurrence.amount)}`;
  row.children[2].textContent = [
    occurrence.date ? displayAppDate(`${occurrence.date.getMonth() + 1}/${occurrence.date.getDate()}/${occurrence.date.getFullYear()}`) : "",
    builderRepeatLabels[occurrence.repeatRule] || ""
  ].filter(Boolean).join(" · ");
  return row;
}

function groupBuilderOccurrences(events) {
  return events.reduce((groups, event) => {
    const key = event.sourceBlockId || `event-${groups.size}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(event);
    return groups;
  }, new Map());
}

function builderScheduleSummary(events, type) {
  const total = events.reduce((sum, event) => sum + event.amount, 0);
  const dates = events.map((event) => event.date).filter(Boolean).sort(compareAppDates);
  const firstDate = dates[0];
  const lastDate = dates[dates.length - 1];
  const sign = type === "income" ? "+" : "-";
  return {
    total,
    count: events.length,
    amountText: `${sign}${money(total)}`,
    dateText: firstDate && lastDate
      ? `${displayAppDate(`${firstDate.getMonth() + 1}/${firstDate.getDate()}/${firstDate.getFullYear()}`)} - ${displayAppDate(`${lastDate.getMonth() + 1}/${lastDate.getDate()}/${lastDate.getFullYear()}`)}`
      : ""
  };
}

function buildBuilderSchedule(buckets) {
  const bucketTotals = new Map(buckets.map((bucket) => [bucket.id, emptyBuilderTotals()]));
  const { start: timelineStart, end: timelineEnd } = builderTimelineBounds(buckets);

  for (const bucket of buckets) {
    for (const block of bucket.blocks || []) {
      const type = block.type === "income" ? "income" : "expense";
      const amount = numberValue(block.amount);
      const repeatRule = ["monthly", "biweekly", "weekly"].includes(block.repeatRule) ? block.repeatRule : "once";
      const blockDate = parseAppDate(block.dueDate) || parseAppDate(bucket.endDate) || parseAppDate(bucket.startDate);
      const repeatEndDate = parseAppDate(block.repeatEndDate);
      const scheduleEnd = repeatRule === "once" || !repeatEndDate || compareAppDates(repeatEndDate, timelineEnd) > 0
        ? timelineEnd
        : repeatEndDate;

      if (!blockDate || !timelineStart || !scheduleEnd) {
        addBuilderOccurrence(bucketTotals, bucket.id, { ...block, amount, type, date: null, repeatRule, sourceBucketId: bucket.id });
        continue;
      }

      let occurrenceDate = new Date(blockDate);
      const preferredDay = occurrenceDate.getDate();
      let guard = 0;

      while (repeatRule !== "once" && compareAppDates(occurrenceDate, timelineStart) < 0 && guard < 240) {
        occurrenceDate = nextBuilderRepeatDate(occurrenceDate, repeatRule, preferredDay);
        guard += 1;
      }

      while (compareAppDates(occurrenceDate, scheduleEnd) <= 0 && guard < 240) {
        if (compareAppDates(occurrenceDate, timelineStart) >= 0) {
          const targetBucket = findBuilderBucketForDate(buckets, occurrenceDate);
          if (targetBucket) {
            addBuilderOccurrence(bucketTotals, targetBucket.id, {
              ...block,
              amount,
              type,
              date: new Date(occurrenceDate),
              repeatRule,
              sourceBlockId: block.id,
              sourceBucketId: bucket.id
            });
          }
        }
        if (repeatRule === "once") {
          break;
        }
        occurrenceDate = nextBuilderRepeatDate(occurrenceDate, repeatRule, preferredDay);
        guard += 1;
      }
    }
  }

  return bucketTotals;
}

function selectedBuilderBucketMode() {
  return builderBucketForm.elements.bucketMode?.value || "single";
}

function setBuilderBucketMode(mode) {
  const activeMode = mode === "months" ? "months" : "single";
  for (const panel of builderBucketModePanels) {
    panel.hidden = panel.dataset.builderBucketModePanel !== activeMode;
  }
  saveBuilderBucketButton.textContent = activeMode === "months" ? "Create Month Buckets" : (editingBuilderBucketId ? "Save Bucket" : "Create Bucket");
}

function parseMonthInput(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})$/);
  if (!match) {
    return null;
  }

  return new Date(Number(match[1]), Number(match[2]) - 1, 1);
}

function monthInputValue(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
}

function monthName(date) {
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function monthDateText(date, day) {
  return `${date.getMonth() + 1}/${day}/${date.getFullYear()}`;
}

function monthRangeBuckets(startValue, endValue) {
  const start = parseMonthInput(startValue);
  const end = parseMonthInput(endValue);
  if (!start || !end) {
    throw new Error("Choose a first and last month.");
  }
  if (start > end) {
    throw new Error("First month must come before last month.");
  }

  const buckets = [];
  const current = new Date(start);
  while (current <= end) {
    const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);
    buckets.push({
      name: monthName(current),
      startDate: monthDateText(current, 1),
      endDate: monthDateText(current, monthEnd.getDate())
    });
    current.setMonth(current.getMonth() + 1);
  }
  return buckets;
}

function builderExportText() {
  return JSON.stringify(financeData.budgetBuilder || { startingCash: "", buckets: [] }, null, 2);
}

async function copyTextFromField(field) {
  field.focus();
  field.select();
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(field.value);
    return;
  }
  document.execCommand("copy");
}

function openBuilderBucketForm(bucket = null) {
  editingBuilderBucketId = bucket?.id || null;
  builderBucketForm.reset();
  builderBucketTitle.textContent = bucket ? "Edit Bucket" : "New Bucket";
  builderBucketMode.hidden = Boolean(bucket);
  builderBucketForm.elements.bucketMode.value = "single";
  const nextMonth = new Date();
  builderBucketForm.elements.rangeStartMonth.value = monthInputValue(nextMonth);
  builderBucketForm.elements.rangeEndMonth.value = monthInputValue(nextMonth);
  setBuilderBucketMode("single");
  builderBucketForm.elements.name.value = bucket?.name || "";
  builderBucketForm.elements.startDate.value = bucket?.startDate || "";
  builderBucketForm.elements.endDate.value = bucket?.endDate || "";
  builderBucketDialog.showModal();
}

function openBuilderBlockForm(block, bucketId) {
  editingBuilderBlockId = block?.id || null;
  editingBuilderBlockBucketId = bucketId;
  const type = block?.type === "income" ? "income" : "expense";
  builderBlockForm.reset();
  builderBlockTitle.textContent = block ? "Edit Block" : (type === "income" ? "New Income" : "New Expense");
  builderBlockForm.elements.template.value = "custom";
  builderBlockForm.elements.name.value = block?.name || (type === "income" ? "Income" : "Expense");
  builderBlockForm.elements.type.value = type;
  builderBlockForm.elements.amount.value = block?.amount || "";
  updateBuilderCategoryOptions(type, block?.category || "Set Category");
  builderBlockForm.elements.dueDate.value = block?.dueDate || "";
  builderBlockForm.elements.repeatRule.value = block?.repeatRule || "once";
  builderBlockForm.elements.repeatEndDate.value = block?.repeatEndDate || "";
  builderBlockForm.elements.notes.value = block?.notes || "";
  deleteBuilderBlockButton.hidden = !block;
  builderBlockDialog.showModal();
}

async function createBuilderBlock(bucketId, type) {
  await api("/api/budget-builder/blocks", {
    method: "POST",
    body: JSON.stringify({
      bucketId,
      type,
      name: type === "income" ? "Income" : "Expense",
      amount: ""
    })
  });
  await renderCurrent();
}

function builderBucketDropZone(bucket) {
  const zone = document.createElement("div");
  zone.className = "builder-drop-zone";
  zone.addEventListener("dragover", (event) => {
    event.preventDefault();
    zone.classList.add("is-drag-over");
  });
  zone.addEventListener("dragleave", () => {
    zone.classList.remove("is-drag-over");
  });
  zone.addEventListener("drop", async (event) => {
    event.preventDefault();
    zone.classList.remove("is-drag-over");
    const templateType = event.dataTransfer.getData("application/x-budget-template");
    const blockId = event.dataTransfer.getData("application/x-budget-block");

    if (templateType) {
      await createBuilderBlock(bucket.id, templateType === "income" ? "income" : "expense");
      return;
    }
    if (blockId) {
      await api(`/api/budget-builder/blocks/${blockId}`, {
        method: "PATCH",
        body: JSON.stringify({ bucketId: bucket.id })
      });
      await renderCurrent();
    }
  });
  return zone;
}

function builderBlockElement(block, bucketId, scheduledEvents = []) {
  const repeatRule = block.repeatRule && block.repeatRule !== "once" ? block.repeatRule : "once";
  const isRepeating = repeatRule !== "once";
  const expanded = expandedBuilderBlocks.has(block.id);
  const summary = isRepeating ? builderScheduleSummary(scheduledEvents, block.type === "income" ? "income" : "expense") : null;
  const button = document.createElement("button");
  button.className = `builder-block is-${block.type === "income" ? "income" : "expense"}${isRepeating ? " is-repeating" : ""}`;
  button.type = "button";
  button.draggable = true;
  button.append(document.createElement("span"));
  button.append(document.createElement("strong"));
  button.append(document.createElement("em"));
  if (isRepeating) {
    button.append(document.createElement("small"));
  }
  button.children[0].textContent = block.name || (block.type === "income" ? "Income" : "Expense");
  button.children[1].textContent = summary?.amountText || `${block.type === "income" ? "+" : "-"}${money(numberValue(block.amount))}`;
  button.children[2].textContent = [
    block.category || "No category",
    isRepeating ? `${summary?.count || 0} payments` : (block.dueDate ? `Due ${block.dueDate}` : ""),
    isRepeating ? builderRepeatLabels[repeatRule] : "",
    isRepeating && summary?.dateText ? summary.dateText : ""
  ].filter(Boolean).join(" · ");
  if (isRepeating) {
    button.children[3].textContent = expanded ? "Schedule expanded" : "Schedule collapsed";
  }
  button.addEventListener("click", () => openBuilderBlockForm(block, bucketId));
  button.addEventListener("dragstart", (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("application/x-budget-block", String(block.id));
  });
  return button;
}

function builderScheduleToggle(block, events) {
  const expanded = expandedBuilderBlocks.has(block.id);
  const button = document.createElement("button");
  button.className = "builder-repeat-toggle";
  button.type = "button";
  button.textContent = expanded ? "Collapse schedule" : `Show ${events.length} dates`;
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    if (expanded) {
      expandedBuilderBlocks.delete(block.id);
    } else {
      expandedBuilderBlocks.add(block.id);
    }
    renderBudgetBuilder();
  });
  return button;
}

function builderMetric(label, value, className = "") {
  const item = document.createElement("div");
  item.className = `builder-metric ${className}`.trim();
  item.append(document.createElement("span"));
  item.append(document.createElement("strong"));
  item.children[0].textContent = label;
  item.children[1].textContent = money(value);
  return item;
}

function builderBucketCashProjection(openingCash, totals, bucket) {
  let cash = openingCash;
  let lowestCash = openingCash;
  let lowestDate = bucket.startDate || bucket.endDate || "";
  const datedEvents = [...totals.events].sort((a, b) => {
    if (!a.date && !b.date) {
      return 0;
    }
    if (!a.date) {
      return 1;
    }
    if (!b.date) {
      return -1;
    }
    return compareAppDates(a.date, b.date) || (a.type === "income" ? -1 : 1);
  });

  for (const event of datedEvents) {
    cash += event.type === "income" ? event.amount : -event.amount;
    if (cash < lowestCash) {
      lowestCash = cash;
      lowestDate = event.date ? displayAppDate(`${event.date.getMonth() + 1}/${event.date.getDate()}/${event.date.getFullYear()}`) : bucket.endDate || lowestDate;
    }
  }

  return {
    cashAtEnd: cash,
    lowestCash,
    lowestDate
  };
}

function builderFinalSummary(cashAtEnd, endDate, lowestCash, lowestDate) {
  const balanced = lowestCash > 0;
  const summary = document.createElement("aside");
  summary.className = `builder-final-summary ${balanced ? "is-balanced" : "is-unbalanced"}`;
  summary.append(document.createElement("span"));
  summary.append(document.createElement("strong"));
  summary.append(document.createElement("em"));
  summary.append(document.createElement("b"));
  summary.append(document.createElement("small"));
  summary.children[0].textContent = "Cash at End";
  summary.children[1].textContent = money(cashAtEnd);
  summary.children[2].textContent = endDate || "End date";
  summary.children[3].textContent = balanced ? "✓" : "×";
  summary.children[3].setAttribute("aria-label", balanced ? "Budget balanced" : "Budget not balanced");
  summary.children[4].textContent = `Lowest ${money(lowestCash)}${lowestDate ? ` on ${lowestDate}` : ""}`;
  return summary;
}

function renderBudgetBuilder() {
  const builder = financeData.budgetBuilder || { startingCash: "", buckets: [] };
  const buckets = sortedBuilderBuckets();
  const scheduledTotals = buildBuilderSchedule(buckets);
  let reserve = numberValue(builder.startingCash);
  let finalEndDate = "";
  let builderLowestCash = reserve;
  let builderLowestDate = "";

  if (startingCashInput.value !== builder.startingCash) {
    startingCashInput.value = builder.startingCash || "";
  }

  const bucketElements = buckets.map((bucket) => {
    const blocks = bucket.blocks || [];
    const totals = scheduledTotals.get(bucket.id) || emptyBuilderTotals();
    const amountToSpend = reserve;
    const projection = builderBucketCashProjection(amountToSpend, totals, bucket);
    const cashAtEnd = projection.cashAtEnd;
    const overspent = projection.lowestCash <= 0;
    reserve = cashAtEnd;
    finalEndDate = bucket.endDate || bucket.startDate || finalEndDate;
    if (projection.lowestCash < builderLowestCash) {
      builderLowestCash = projection.lowestCash;
      builderLowestDate = projection.lowestDate;
    }

    const article = document.createElement("article");
    article.className = `builder-bucket${overspent || cashAtEnd < 0 ? " is-negative" : ""}`;

    const head = document.createElement("div");
    head.className = "builder-bucket-head";
    const title = document.createElement("div");
    title.append(document.createElement("strong"));
    title.append(document.createElement("span"));
    title.children[0].textContent = bucket.name || "Pay Period";
    title.children[1].textContent = `${bucket.startDate || "Start"} - ${bucket.endDate || "End"}`;
    const actions = document.createElement("div");
    actions.className = "builder-bucket-actions";
    const editButton = document.createElement("button");
    editButton.className = "add-button";
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => openBuilderBucketForm(bucket));
    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.className = "delete-row";
    deleteButtonElement.type = "button";
    deleteButtonElement.textContent = "x";
    deleteButtonElement.setAttribute("aria-label", "Delete bucket");
    deleteButtonElement.addEventListener("click", async () => {
      if (window.confirm("Delete this bucket and its blocks?")) {
        await api(`/api/budget-builder/buckets/${bucket.id}`, { method: "DELETE" });
        await renderCurrent();
      }
    });
    actions.append(editButton);
    actions.append(deleteButtonElement);
    head.append(title);
    head.append(actions);

    const metrics = document.createElement("div");
    metrics.className = "builder-metrics";
    metrics.append(builderMetric("Amount to Spend", amountToSpend, overspent ? "is-warning" : ""));
    metrics.append(builderMetric("Cash at End", cashAtEnd, cashAtEnd < 0 ? "is-warning" : ""));
    metrics.append(builderMetric("Lowest Cash", projection.lowestCash, projection.lowestCash <= 0 ? "is-warning" : ""));
    metrics.append(builderMetric("Income", totals.income, "is-income"));
    metrics.append(builderMetric("Spending", totals.expenses, overspent ? "is-expense is-warning" : "is-expense"));

    const zone = builderBucketDropZone(bucket);
    const eventsByBlock = groupBuilderOccurrences(totals.events.filter((event) => event.sourceBlockId));
    if (blocks.length) {
      for (const block of blocks) {
        const blockEvents = eventsByBlock.get(block.id) || [];
        zone.append(builderBlockElement(block, bucket.id, blockEvents));
        if (block.repeatRule && block.repeatRule !== "once" && blockEvents.length) {
          zone.append(builderScheduleToggle(block, blockEvents));
          if (expandedBuilderBlocks.has(block.id)) {
            zone.append(...blockEvents.map((event) => builderOccurrenceElement(event)));
          }
        }
      }
    }
    const scheduledEvents = totals.events.filter((event) => event.sourceBucketId !== bucket.id);
    if (scheduledEvents.length) {
      zone.append(...scheduledEvents.map((event) => builderOccurrenceElement(event)));
    }
    if (!blocks.length && !scheduledEvents.length) {
      const empty = document.createElement("div");
      empty.className = "builder-empty";
      empty.textContent = "Drag income or expenses here";
      zone.append(empty);
    }

    article.append(head);
    article.append(metrics);
    article.append(zone);
    return article;
  });

  builderBuckets.replaceChildren(...bucketElements);
  builderSummary.replaceChildren(...(buckets.length ? [builderFinalSummary(reserve, finalEndDate, builderLowestCash, builderLowestDate)] : []));

  if (!buckets.length) {
    const empty = document.createElement("div");
    empty.className = "builder-empty-board";
    empty.textContent = "Add a bucket, then drag income or expenses into it.";
    builderBuckets.append(empty);
  }
}

function renderCategoryBreakdown(categoryTotals) {
  const sortedCategories = ledgerConfig.spending.categories
    .filter((category) => category !== "Set Category")
    .sort((a, b) => (categoryTotals[b] || 0) - (categoryTotals[a] || 0));

  summaryElements.categoryBreakdown.replaceChildren(
    ...sortedCategories
      .map((category) => {
        const row = document.createElement("div");
        row.className = "category-total";
        row.append(document.createElement("span"));
        row.append(document.createElement("strong"));
        row.children[0].textContent = category;
        row.children[1].textContent = money(categoryTotals[category] || 0);
        return row;
      })
  );
}

function renderDonut(categoryTotals, totalSpending) {
  if (totalSpending <= 0) {
    summaryElements.donutChart.style.background = "rgba(255, 255, 255, 0.12)";
    return;
  }

  let cursor = 0;
  const shades = ["#ffffff", "#e9edf2", "#d3d9e0", "#bac3cc", "#a4adb7", "#8d98a3"];
  const segments = Object.entries(categoryTotals)
    .filter(([, amount]) => amount > 0)
    .map(([category, amount], index) => {
      const start = cursor;
      const end = cursor + (amount / totalSpending) * 100;
      cursor = end;
      return `${shades[index % shades.length]} ${start}% ${end}%`;
    });

  summaryElements.donutChart.style.background = `conic-gradient(${segments.join(", ")})`;
}

function renderSummary(data) {
  const categoryTotals = {};
  let extractedValue = 0;
  const totalSpending = data.spending.reduce((total, row) => {
    const amount = numberValue(row.amount);
    if (row.category === "Extracted Value") {
      extractedValue += amount;
      categoryTotals[row.category] = (categoryTotals[row.category] || 0) + amount;
      return total;
    }
    if (row.category !== "Set Category") {
      categoryTotals[row.category] = (categoryTotals[row.category] || 0) + amount;
    }
    return total + amount;
  }, 0);
  const totalIncome = data.income.reduce((total, row) => total + numberValue(row.amount), 0);
  const gdpContribution = totalSpending + extractedValue;
  const currentBudget = currentBudgetForToday(data.budgets || []);
  const currentBudgetSpending = currentBudget
    ? data.spending.reduce((total, row) => (
      inDateRange(row.date, currentBudget.startDate, currentBudget.endDate)
        ? total + numberValue(row.amount)
        : total
    ), 0)
    : 0;

  summaryElements.currentBudgetPeriod.textContent = currentBudget
    ? `${currentBudget.startDate || "Start"} - ${currentBudget.endDate || "End"}`
    : "No current budget";
  summaryElements.currentBudgetSpending.textContent = money(currentBudgetSpending);
  summaryElements.totalSpending.textContent = money(totalSpending);
  summaryElements.extractedValue.textContent = money(extractedValue);
  summaryElements.totalIncome.textContent = money(totalIncome);
  summaryElements.gdpContribution.textContent = money(gdpContribution);
  renderCategoryBreakdown(categoryTotals);
  renderDonut(
    Object.fromEntries(Object.entries(categoryTotals).filter(([category]) => category !== "Extracted Value")),
    totalSpending
  );
}

function render(data) {
  financeData = { ...financeData, ...data };
  updateLedgerCategories(data.categories);
  pendingPlaidTransactions = data.plaidTransactions || pendingPlaidTransactions || [];
  skippedPlaidTransactions = data.plaidSkippedTransactions || skippedPlaidTransactions || [];
  linkedPlaidItems = data.plaidItems || linkedPlaidItems || [];
  plaidConfigured = Boolean(data.plaidConfigured);
  renderSummary(data);
  renderLedger("spending", data.spending);
  renderLedger("income", data.income);
  renderBudgets();
  renderBudgetBuilder();
  renderDebt();
  renderWork();
  renderAccounting(data);
  if (financeSankeyDialog?.open) {
    renderFinanceSankey();
  }
  renderPlaidSkippedTransactions();
  renderPlaidButton(plaidStatusText);
}

function renderPlaidButton(statusText = "") {
  const count = pendingPlaidTransactions.length;
  const linkedCount = linkedPlaidItems.length;
  plaidReviewButton.hidden = count === 0;
  plaidReviewButton.textContent = count === 1 ? "Review 1 Plaid" : `Review ${count} Plaid`;
  plaidStatus.textContent = statusText || (
    count
      ? `${count} Plaid transaction${count === 1 ? "" : "s"} ready`
      : linkedCount
        ? `${linkedCount} bank account${linkedCount === 1 ? "" : "s"} linked`
        : plaidConfigured
          ? "No bank linked"
          : "Plaid not configured"
  );
}

function renderPlaidSkippedTransactions() {
  const count = skippedPlaidTransactions.length;
  plaidSkippedButton.textContent = count
    ? `Skipped Plaid (${count})`
    : "Skipped Plaid";
  plaidSkippedCount.textContent = count
    ? `${count} skipped transaction${count === 1 ? "" : "s"}`
    : "No skipped transactions";

  plaidSkippedList.replaceChildren(
    ...(count ? skippedPlaidTransactions : []).map((transaction) => {
      const row = document.createElement("div");
      row.className = "plaid-skip-row";

      const body = document.createElement("div");
      body.className = "plaid-skip-body";

      const title = document.createElement("strong");
      title.textContent = transaction.merchantName || transaction.name || "Plaid transaction";

      const meta = document.createElement("span");
      meta.textContent = [
        displayPlaidDate(transaction.date),
        `$${transaction.amount}`,
        transaction.suggestedLedger ? transaction.suggestedLedger : ""
      ].filter(Boolean).join(" · ");

      body.append(title, meta);

      const button = document.createElement("button");
      button.className = "add-button plaid-restore-button";
      button.type = "button";
      button.textContent = "Add back";
      button.addEventListener("click", async () => {
        const result = await api(`/api/plaid/transactions/${transaction.id}/unskip`, { method: "POST" });
        pendingPlaidTransactions = result.pending || [];
        skippedPlaidTransactions = result.skipped || [];
        render(await api("/api/finance"));
      });

      row.append(body, button);
      return row;
    })
  );

  if (!count) {
    const empty = document.createElement("div");
    empty.className = "plaid-skip-empty";
    empty.textContent = "Skipped Plaid transactions will appear here.";
    plaidSkippedList.append(empty);
  }
}

async function syncPlaidTransactions() {
  if (plaidSyncPromise) {
    return plaidSyncPromise;
  }

  plaidStatus.textContent = "Checking Plaid...";
  plaidSyncPromise = api("/api/plaid/transactions/sync", { method: "POST" })
    .then((result) => {
      pendingPlaidTransactions = result.pending || [];
      skippedPlaidTransactions = result.skipped || skippedPlaidTransactions;
      linkedPlaidItems = result.linkedItems || linkedPlaidItems;
      if (!result.configured) {
        plaidStatusText = "Plaid not configured";
        renderPlaidButton(plaidStatusText);
        return result;
      }
      plaidConfigured = true;
      plaidStatusText = "";
      renderPlaidButton(plaidStatusText);
      return result;
    })
    .catch((error) => {
      plaidStatusText = "Plaid check failed";
      renderPlaidButton(plaidStatusText);
      return null;
    })
    .finally(() => {
      plaidSyncPromise = null;
    });

  return plaidSyncPromise;
}

async function renderCurrent(options = {}) {
  render(await api("/api/finance"));

  if (options.syncPlaid) {
    syncPlaidTransactions().then(async (result) => {
      if (result) {
        render(await api("/api/finance"));
      }
    }).catch(() => {
      plaidStatusText = "Plaid check failed";
      renderPlaidButton(plaidStatusText);
    });
  }
}

for (const button of document.querySelectorAll("[data-add-ledger]")) {
  button.addEventListener("click", async () => {
    const ledger = button.dataset.addLedger;
    await api(`/api/${ledger}`, { method: "POST" });
    renderCurrent();
  });
}

document.querySelector("[data-open-loan]").addEventListener("click", () => {
  loanForm.reset();
  loanDialog.showModal();
});

document.querySelector("[data-close-loan]").addEventListener("click", () => {
  loanDialog.close();
});

document.querySelector("[data-set-graduation-date]").addEventListener("click", async () => {
  const graduationDate = window.prompt("Graduation date", financeData.graduationDate || "");
  if (graduationDate === null) {
    return;
  }
  await api("/api/debt/graduation-date", {
    method: "PATCH",
    body: JSON.stringify({ graduationDate: normalizeDateText(graduationDate) })
  });
  renderCurrent();
});

loanForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loanForm);
  await api("/api/loans", {
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      issuedDate: normalizeDateText(formData.get("issuedDate")),
      subsidyType: formData.get("subsidyType"),
      interestRate: formData.get("interestRate"),
      principal: formData.get("principal")
    })
  });
  loanDialog.close();
  renderCurrent();
});

function showPage(page) {
  for (const view of pageViews) {
    view.hidden = view.dataset.page !== page;
  }
  for (const link of pageLinks) {
    link.classList.toggle("is-active", link.dataset.pageLink === page);
  }
}

function pageFromHash() {
  return location.hash === "#budget"
    ? "budget"
    : location.hash === "#budget-builder"
      ? "budget-builder"
      : location.hash === "#debt"
        ? "debt"
        : location.hash === "#work"
          ? "work"
          : location.hash === "#accounting"
            ? "accounting"
            : "finance";
}

for (const link of pageLinks) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(link.dataset.pageLink);
    location.hash = link.dataset.pageLink === "finance" ? "" : `#${link.dataset.pageLink}`;
    if (link.dataset.pageLink === "finance") {
      renderCurrent({ syncPlaid: true });
    }
  });
}

openAccountingButton.addEventListener("click", () => {
  showPage("accounting");
  location.hash = "#accounting";
});

document.querySelector("[data-open-budget-builder]").addEventListener("click", () => {
  showPage("budget-builder");
  location.hash = "#budget-builder";
});

document.querySelector("[data-add-work-application]").addEventListener("click", async () => {
  await api("/api/work/applications", { method: "POST" });
  renderCurrent();
});

workSearch.addEventListener("input", () => {
  workQuery = workSearch.value;
  renderWork();
});

document.querySelector("[data-open-work-sankey]").addEventListener("click", () => {
  renderWorkSankey();
  workSankeyDialog.showModal();
});

document.querySelector("[data-close-work-sankey]").addEventListener("click", () => {
  workSankeyDialog.close();
});

document.querySelector("[data-open-finance-sankey]").addEventListener("click", () => {
  financeSankeyDialog.showModal();
  requestAnimationFrame(() => renderFinanceSankey());
});

document.querySelector("[data-close-finance-sankey]").addEventListener("click", () => {
  financeSankeyDialog.close();
});

window.addEventListener("resize", () => {
  if (financeSankeyDialog?.open) {
    renderFinanceSankey();
  }
});

document.querySelector("[data-back-to-budget]").addEventListener("click", () => {
  showPage("budget");
  location.hash = "#budget";
});

document.querySelector("[data-open-budget]").addEventListener("click", () => openBudgetForm());

document.querySelector("[data-export-builder]").addEventListener("click", () => {
  builderExportJson.value = builderExportText();
  copyBuilderExportButton.textContent = "Copy";
  builderExportDialog.showModal();
  builderExportJson.focus();
  builderExportJson.select();
});

document.querySelector("[data-close-builder-export]").addEventListener("click", () => {
  builderExportDialog.close();
});

copyBuilderExportButton.addEventListener("click", async () => {
  try {
    await copyTextFromField(builderExportJson);
    copyBuilderExportButton.textContent = "Copied";
  } catch (error) {
    copyBuilderExportButton.textContent = "Copy failed";
  }
});

document.querySelector("[data-add-builder-bucket]").addEventListener("click", () => openBuilderBucketForm());

document.querySelector("[data-close-builder-bucket]").addEventListener("click", () => {
  builderBucketDialog.close();
  editingBuilderBucketId = null;
});

builderBucketMode.addEventListener("change", () => {
  setBuilderBucketMode(selectedBuilderBucketMode());
});

builderBucketForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(builderBucketForm);
  try {
    if (!editingBuilderBucketId && selectedBuilderBucketMode() === "months") {
      const buckets = monthRangeBuckets(formData.get("rangeStartMonth"), formData.get("rangeEndMonth"));
      for (const bucket of buckets) {
        await api("/api/budget-builder/buckets", {
          method: "POST",
          body: JSON.stringify(bucket)
        });
      }
    } else {
      await api(editingBuilderBucketId ? `/api/budget-builder/buckets/${editingBuilderBucketId}` : "/api/budget-builder/buckets", {
        method: editingBuilderBucketId ? "PATCH" : "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          startDate: normalizeDateText(formData.get("startDate")),
          endDate: normalizeDateText(formData.get("endDate"))
        })
      });
    }
    builderBucketDialog.close();
    editingBuilderBucketId = null;
    renderCurrent();
  } catch (error) {
    window.alert(error.message || "Could not save bucket.");
  }
});

document.querySelector("[data-close-builder-block]").addEventListener("click", () => {
  builderBlockDialog.close();
  editingBuilderBlockId = null;
  editingBuilderBlockBucketId = null;
});

builderBlockForm.elements.type.addEventListener("change", () => {
  updateBuilderCategoryOptions(builderBlockForm.elements.type.value, builderBlockForm.elements.category.value);
});

builderBlockForm.elements.template.addEventListener("change", () => {
  applyBuilderBlockTemplate(builderBlockForm.elements.template.value);
});

builderBlockForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(builderBlockForm);
  const payload = {
    bucketId: editingBuilderBlockBucketId,
    name: formData.get("name"),
    type: formData.get("type"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    dueDate: normalizeDateText(formData.get("dueDate")),
    repeatRule: formData.get("repeatRule"),
    repeatEndDate: normalizeDateText(formData.get("repeatEndDate")),
    notes: formData.get("notes")
  };
  await api(editingBuilderBlockId ? `/api/budget-builder/blocks/${editingBuilderBlockId}` : "/api/budget-builder/blocks", {
    method: editingBuilderBlockId ? "PATCH" : "POST",
    body: JSON.stringify(payload)
  });
  builderBlockDialog.close();
  editingBuilderBlockId = null;
  editingBuilderBlockBucketId = null;
  renderCurrent();
});

deleteBuilderBlockButton.addEventListener("click", async () => {
  if (!editingBuilderBlockId) {
    return;
  }
  await api(`/api/budget-builder/blocks/${editingBuilderBlockId}`, { method: "DELETE" });
  builderBlockDialog.close();
  editingBuilderBlockId = null;
  editingBuilderBlockBucketId = null;
  renderCurrent();
});

startingCashInput.addEventListener("blur", async () => {
  await api("/api/budget-builder/starting-cash", {
    method: "PATCH",
    body: JSON.stringify({ startingCash: startingCashInput.value })
  });
  renderCurrent();
});

startingCashInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    startingCashInput.blur();
  }
  if (event.key === "Escape") {
    renderCurrent();
  }
});

for (const template of document.querySelectorAll("[data-template-type]")) {
  template.addEventListener("dragstart", (event) => {
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("application/x-budget-template", template.dataset.templateType);
  });
}

document.querySelector("[data-close-budget]").addEventListener("click", () => {
  budgetDialog.close();
  editingBudgetId = null;
});

document.querySelector("[data-add-budget-category]").addEventListener("click", () => {
  budgetCategories.append(createBudgetCategoryRow());
});

for (const button of document.querySelectorAll("[data-add-category]")) {
  button.addEventListener("click", () => openCategoryForm(button.dataset.addCategory));
}

document.querySelector("[data-close-category]").addEventListener("click", () => {
  categoryDialog.close();
});

categoryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await createCategory(categoryLedger, categoryNameInput.value);
});

budgetForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(budgetForm);
  const categories = [...budgetCategories.querySelectorAll(".budget-category-row")].map((row) => ({
    category: row.querySelector('[name="category"]').value,
    amount: row.querySelector('[name="amount"]').value
  }));
  await api(editingBudgetId ? `/api/budgets/${editingBudgetId}` : "/api/budgets", {
    method: editingBudgetId ? "PATCH" : "POST",
    body: JSON.stringify({
      startDate: normalizeDateText(formData.get("startDate")),
      endDate: normalizeDateText(formData.get("endDate")),
      requiredIncome: formData.get("requiredIncome"),
      categories
    })
  });
  budgetDialog.close();
  editingBudgetId = null;
  renderCurrent();
});

document.querySelector("[data-cancel-budget-delete]").addEventListener("click", () => {
  deletingBudgetId = null;
  confirmBudgetDelete.close();
});

document.querySelector("[data-confirm-budget-delete-button]").addEventListener("click", async () => {
  if (deletingBudgetId) {
    await api(`/api/budgets/${deletingBudgetId}`, { method: "DELETE" });
  }
  deletingBudgetId = null;
  confirmBudgetDelete.close();
  renderCurrent();
});

function populatePlaidCategories(ledger, selected = "Set Category") {
  const categories = categoriesForLedger(ledger, selected);
  plaidCategorySelect.replaceChildren(
    ...categories.map((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      return option;
    })
  );
  plaidCategorySelect.value = categories.includes(selected) ? selected : "Set Category";
}

function activePlaidTransaction() {
  return pendingPlaidTransactions[activePlaidIndex] || null;
}

function openPlaidReview(index = 0) {
  activePlaidIndex = index;
  const transaction = activePlaidTransaction();

  if (!transaction) {
    plaidDialog.close();
    renderPlaidButton();
    return;
  }

  const ledger = transaction.suggestedLedger || "spending";
  plaidLedgerSelect.value = ledger;
  populatePlaidCategories(ledger);
  plaidDescriptionInput.value = transaction.description || transaction.merchantName || transaction.name || "";
  plaidReviewSummary.replaceChildren();

  for (const [label, value] of [
    ["Amount", `$${transaction.amount}`],
    ["Date", displayPlaidDate(transaction.date)],
    ["Name", transaction.merchantName || transaction.name || ""],
    ["Status", transaction.pending ? "Pending" : "Posted"],
    ["Queue", `${activePlaidIndex + 1} of ${pendingPlaidTransactions.length}`]
  ]) {
    const item = document.createElement("div");
    item.append(document.createElement("span"));
    item.append(document.createElement("strong"));
    item.children[0].textContent = label;
    item.children[1].textContent = value;
    plaidReviewSummary.append(item);
  }

  plaidDialog.showModal();
}

function openPlaidSkipped() {
  renderPlaidSkippedTransactions();
  plaidSkippedDialog.showModal();
}

async function refreshPlaidState(result, reopen = true) {
  pendingPlaidTransactions = result.pending || [];
  skippedPlaidTransactions = result.skipped || skippedPlaidTransactions;
  render(await api("/api/finance"));

  if (!reopen) {
    return;
  }

  const nextIndex = Math.min(activePlaidIndex, pendingPlaidTransactions.length - 1);
  if (nextIndex >= 0 && pendingPlaidTransactions.length) {
    openPlaidReview(nextIndex);
  } else {
    plaidDialog.close();
    renderPlaidButton();
  }
}

plaidReviewButton.addEventListener("click", () => openPlaidReview());
plaidSkippedButton.addEventListener("click", () => openPlaidSkipped());

linkBankButton.addEventListener("click", async () => {
  linkBankButton.disabled = true;
  plaidStatus.textContent = "Starting Plaid...";

  try {
    if (!window.Plaid) {
      plaidStatusText = "Plaid Link unavailable";
      renderPlaidButton(plaidStatusText);
      return;
    }

    const tokenResult = await api("/api/plaid/link-token", { method: "POST" });
    if (!tokenResult.configured) {
      plaidStatusText = "Plaid not configured";
      renderPlaidButton(plaidStatusText);
      return;
    }

    const handler = window.Plaid.create({
      token: tokenResult.linkToken,
      onSuccess: async (publicToken, metadata) => {
        try {
          plaidStatus.textContent = "Linking bank...";
          const exchangeResult = await api("/api/plaid/exchange-token", {
            method: "POST",
            body: JSON.stringify({ publicToken, metadata })
          });
          linkedPlaidItems = exchangeResult.linkedItems || [];
          plaidStatusText = "";
          await renderCurrent({ syncPlaid: true });
        } catch (error) {
          plaidStatusText = "Plaid Link failed";
          renderPlaidButton(plaidStatusText);
        } finally {
          linkBankButton.disabled = false;
        }
      },
      onExit: () => {
        linkBankButton.disabled = false;
        renderPlaidButton(plaidStatusText);
      }
    });

    handler.open();
    plaidStatus.textContent = "Plaid Link open";
  } catch (error) {
    plaidStatusText = "Plaid Link failed";
    renderPlaidButton(plaidStatusText);
  } finally {
    linkBankButton.disabled = false;
  }
});

document.querySelector("[data-close-plaid]").addEventListener("click", () => {
  plaidDialog.close();
});

document.querySelector("[data-close-plaid-skipped]").addEventListener("click", () => {
  plaidSkippedDialog.close();
});

plaidLedgerSelect.addEventListener("change", () => {
  populatePlaidCategories(plaidLedgerSelect.value, plaidCategorySelect.value);
});

plaidForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const transaction = activePlaidTransaction();

  if (!transaction) {
    plaidDialog.close();
    return;
  }

  const result = await api(`/api/plaid/transactions/${transaction.id}/review`, {
    method: "POST",
    body: JSON.stringify({
      ledger: plaidLedgerSelect.value,
      category: plaidCategorySelect.value,
      description: plaidDescriptionInput.value
    })
  });

  await refreshPlaidState(result);
});

document.querySelector("[data-skip-plaid]").addEventListener("click", async () => {
  const transaction = activePlaidTransaction();

  if (!transaction) {
    plaidDialog.close();
    return;
  }

  const result = await api(`/api/plaid/transactions/${transaction.id}/skip`, {
    method: "POST"
  });

  await refreshPlaidState(result);
});

window.addEventListener("hashchange", () => {
  showPage(pageFromHash());
});

const initialPage = pageFromHash();
showPage(initialPage);
renderCurrent({ syncPlaid: initialPage === "finance" });
