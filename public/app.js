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
const plaidManagerButton = document.querySelector("[data-open-plaid-manager]");
const plaidSkippedButton = document.querySelector("[data-open-plaid-skipped]");
const plaidManagerDialog = document.querySelector("[data-plaid-manager-dialog]");
const plaidManagerStats = document.querySelector("[data-plaid-manager-stats]");
const plaidManagerOverview = document.querySelector("[data-plaid-manager-overview]");
const plaidManagerAccountStatus = document.querySelector("[data-plaid-manager-account-status]");
const plaidAccountList = document.querySelector("[data-plaid-account-list]");
const plaidConnectionList = document.querySelector("[data-plaid-connection-list]");
const refreshPlaidAccountsButton = document.querySelector("[data-refresh-plaid-accounts]");
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
const creditCardList = document.querySelector("[data-credit-card-list]");
const creditCardTotal = document.querySelector("[data-credit-card-total]");
const assetsCashTotal = document.querySelector("[data-assets-cash-total]");
const assetsCashDialog = document.querySelector("[data-assets-cash-dialog]");
const assetsCashSummary = document.querySelector("[data-assets-cash-summary]");
const assetsCashList = document.querySelector("[data-assets-cash-list]");
const assetsNetWorth = document.querySelector("[data-assets-net-worth]");
const assetsDebt = document.querySelector("[data-assets-debt]");
const assetsAverageSpending = document.querySelector("[data-assets-average-spending]");
const assetsSpendingChange = document.querySelector("[data-assets-spending-change]");
const assetsMonthlySpendingChart = document.querySelector("[data-assets-monthly-spending-chart]");
const assetsBalancesChart = document.querySelector("[data-assets-balances-chart]");
const assetsCategoryTrends = document.querySelector("[data-assets-category-trends]");
const assetsInsights = document.querySelector("[data-assets-insights]");
const assetsInvestmentTotal = document.querySelector("[data-assets-investment-total]");
const assetsInvestmentCount = document.querySelector("[data-assets-investment-count]");
const assetsInvestmentStatus = document.querySelector("[data-assets-investment-status]");
const assetsPortfolioList = document.querySelector("[data-assets-portfolio-list]");
const linkInvestmentButton = document.querySelector("[data-link-investment]");
const assetsRangeButtons = document.querySelectorAll("[data-assets-range]");
const assetsNormalizeButton = document.querySelector("[data-assets-normalize]");
const workList = document.querySelector("[data-work-list]");
const workSearch = document.querySelector("[data-work-search]");
const workCountLabel = document.querySelector("[data-work-count-label]");
const financeSankeyDialog = document.querySelector("[data-finance-sankey-dialog]");
const financeSankeyChart = document.querySelector("[data-finance-sankey-chart]");
const sankeySimulationDialog = document.querySelector("[data-sankey-simulation-dialog]");
const sankeySimulationForm = document.querySelector("[data-sankey-simulation-form]");
const sankeySimulationEnabledInput = document.querySelector("[data-sankey-simulation-enabled]");
const sankeySimulationLedger = document.querySelector("[data-sankey-simulation-ledger]");
const sankeySimulationMode = document.querySelector("[data-sankey-simulation-mode]");
const sankeySimulationCategory = document.querySelector("[data-sankey-simulation-category]");
const sankeySimulationLabel = document.querySelector("[data-sankey-simulation-label]");
const sankeySimulationExistingField = document.querySelector("[data-sankey-simulation-existing-field]");
const sankeySimulationLabelField = document.querySelector("[data-sankey-simulation-label-field]");
const sankeySimulationList = document.querySelector("[data-sankey-simulation-list]");
const sankeyTransactionsDialog = document.querySelector("[data-sankey-transactions-dialog]");
const sankeyTransactionsTitle = document.querySelector("[data-sankey-transactions-title]");
const sankeyTransactionsSummary = document.querySelector("[data-sankey-transactions-summary]");
const sankeyTransactionsList = document.querySelector("[data-sankey-transactions-list]");
const workSankeyDialog = document.querySelector("[data-work-sankey-dialog]");
const workSankeyChart = document.querySelector("[data-work-sankey-chart]");
const openAccountingButton = document.querySelector("[data-open-accounting]");
const classElements = {
  tabs: document.querySelector("[data-class-tabs]"),
  title: document.querySelector("[data-class-title]"),
  description: document.querySelector("[data-class-description]"),
  quizBody: document.querySelector("[data-class-quiz-body]"),
  quizProgress: document.querySelector("[data-class-quiz-progress]"),
  progressBar: document.querySelector("[data-class-progress-bar]"),
  sections: document.querySelector("[data-class-sections]"),
  openQuestions: document.querySelector("[data-class-open-questions]"),
  studyPlan: document.querySelector("[data-class-study-plan]"),
  codingPanel: document.querySelector("[data-class-coding-panel]"),
  codingQuestions: document.querySelector("[data-class-coding-questions]"),
  keyTerms: document.querySelector("[data-class-key-terms]"),
  practice: document.querySelector("[data-class-practice]"),
  settingsDialog: document.querySelector("[data-class-settings-dialog]"),
  addForm: document.querySelector("[data-class-add-form]"),
  managementList: document.querySelector("[data-class-management-list]"),
  importDialog: document.querySelector("[data-class-import-dialog]"),
  importForm: document.querySelector("[data-class-import-form]"),
  importJson: document.querySelector("[data-class-import-json]"),
  importStatus: document.querySelector("[data-class-import-status]"),
  sectionDialog: document.querySelector("[data-class-section-dialog]"),
  sectionForm: document.querySelector("[data-class-section-form]"),
  sectionDialogTitle: document.querySelector("[data-class-section-dialog-title]"),
  status: document.querySelector("[data-class-status]")
};
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
  tuition: document.querySelector("[data-tuition-total]"),
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
let financeData = { spending: [], income: [], budgets: [], loans: [], graduationDate: "", plaidAccounts: [], plaidAccountTransactions: [], plaidInvestments: { accounts: [], holdings: [], securities: [] }, workApplications: [], workStatuses: defaultWorkStatuses };
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
let plaidConnections = [];
let plaidConfigured = false;
let plaidSyncPromise = null;
let plaidAccountsPromise = null;
let plaidInvestmentsPromise = null;
let plaidAccountsStatus = "";
let plaidScriptPromise = null;
let categoryLedger = "spending";
let workQuery = "";
let assetsChartRange = "1y";
const assetsTuitionNormalizedKey = "lifePortal.assetsTuitionNormalized";
let assetsTuitionNormalized = localStorage.getItem(assetsTuitionNormalizedKey) === "true";
const assetsCalculationCache = new Map();
let assetsRenderedKey = "";
const sankeySimulationStorageKey = "lifePortal.financeSankeySimulations";
const sankeySimulationEnabledKey = "lifePortal.financeSankeySimulationEnabled";
const classStorageKey = "lifePortal.classes";
let sankeySimulations = loadSankeySimulations();
let sankeySimulationEnabled = localStorage.getItem(sankeySimulationEnabledKey) === "true";
let classState = loadClassState();
let classQuizIndex = 0;
let classQuizOrder = [];
let classQuizAnswered = false;
let classQuizCorrect = 0;
let editingClassSectionIndex = null;
let monacoLoadPromise = null;
const classCodeEditors = new Map();

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
  updateSankeySimulationCategories();
}

function textInput(ledger, row, field, value) {
  const editor = document.createElement("input");
  editor.className = `ledger-input ${field}`;
  editor.type = field === "date" ? "date" : "text";
  editor.value = field === "date" ? dateInputValue(value) : value;
  if (field === "date") {
    editor.setAttribute("aria-label", `${ledger === "income" ? "Income" : "Spending"} date`);
    editor.addEventListener("click", () => editor.showPicker?.());
  }
  editor.addEventListener(field === "date" ? "change" : "blur", () => saveField(
    ledger,
    row.id,
    field,
    field === "date" ? normalizeDateText(editor.value) : editor.value
  ));
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
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
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

function dateInputValue(value) {
  const date = parseAppDate(value);
  if (!date) {
    return "";
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  const result = await api(`/api/${ledger}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ [field]: value })
  });
  financeData = { ...financeData, [ledger]: result[ledger] };
  renderSummary(financeData);
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
  let loanTotal = 0;

  loanList.replaceChildren(
    ...rows.map((row) => {
      const amounts = loanAmounts(row);
      loanTotal += amounts.currentAmount;
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

  const creditAccounts = (financeData.plaidAccounts || [])
    .filter((account) => account.type === "credit")
    .sort((a, b) => Math.abs(assetAccountBalance(b)) - Math.abs(assetAccountBalance(a)));
  const cardTotal = creditAccounts.reduce((total, account) => total + Math.abs(assetAccountBalance(account)), 0);
  creditCardTotal.textContent = money(cardTotal);
  creditCardList.replaceChildren(
    ...creditAccounts.map((account) => {
      const row = document.createElement("div");
      row.className = "credit-card-row";

      const identity = document.createElement("div");
      identity.className = "credit-card-identity";
      const name = document.createElement("strong");
      name.textContent = account.name || "Credit Card";
      const meta = document.createElement("span");
      meta.textContent = [account.institutionName, account.subtype].filter(Boolean).join(" · ") || "Connected account";
      identity.append(name, meta);

      const available = document.createElement("div");
      available.className = "credit-card-balance";
      const availableLabel = document.createElement("span");
      availableLabel.textContent = "Available credit";
      const availableAmount = document.createElement("strong");
      const availableValue = plaidAccountBalance(account, "available");
      availableAmount.textContent = availableValue === null ? "—" : money(availableValue);
      available.append(availableLabel, availableAmount);

      const balance = document.createElement("div");
      balance.className = "credit-card-balance is-owed";
      const balanceLabel = document.createElement("span");
      balanceLabel.textContent = "Current balance";
      const balanceAmount = document.createElement("strong");
      balanceAmount.textContent = money(Math.abs(assetAccountBalance(account)));
      balance.append(balanceLabel, balanceAmount);

      row.append(identity, available, balance);
      return row;
    })
  );
  if (!creditAccounts.length) {
    const empty = document.createElement("div");
    empty.className = "credit-card-empty";
    empty.textContent = "No connected credit card liabilities.";
    creditCardList.append(empty);
  }

  totalDebt.textContent = formatNumber(loanTotal + cardTotal);
  graduationDateLabel.textContent = financeData.graduationDate
    ? `Graduation ${displayAppDate(financeData.graduationDate)}`
    : "No graduation date";
}

function cashBalanceForAccount(account) {
  const balance = account?.balances || {};
  return numberValue(balance.available ?? balance.current ?? account?.available ?? account?.current ?? 0);
}

function cashAccounts() {
  return (financeData.plaidAccounts || [])
    .filter((account) => !account.type || account.type === "depository");
}

function cashAccountsTotal() {
  return cashAccounts().reduce((total, account) => total + cashBalanceForAccount(account), 0);
}

function assetAccountBalance(account) {
  const balance = account?.balances || {};
  return numberValue(balance.current ?? balance.available ?? account?.current ?? account?.available ?? 0);
}

function accountIsDebt(account) {
  return account?.type === "credit" || account?.type === "loan";
}

function connectedAssetsTotal() {
  const accounts = [...(financeData.plaidAccounts || [])];
  const accountIds = new Set(accounts.map((account) => account.accountId).filter(Boolean));
  for (const account of financeData.plaidInvestments?.accounts || []) {
    if (!accountIds.has(account.accountId)) accounts.push(account);
  }
  return accounts.reduce((total, account) => (
    accountIsDebt(account) ? total : total + assetAccountBalance(account)
  ), 0);
}

function connectedDebtTotal() {
  return (financeData.plaidAccounts || []).reduce((total, account) => (
    accountIsDebt(account) ? total + Math.abs(assetAccountBalance(account)) : total
  ), 0);
}

function loanAmountAtDate(row, date) {
  const principal = numberValue(row.principal);
  const rate = numberValue(row.interestRate) / 100;
  const issuedDate = parseAppDate(row.issuedDate);
  if (!issuedDate || issuedDate > date) {
    return 0;
  }

  const graduationDate = parseAppDate(financeData.graduationDate);
  const accrualStart = row.subsidyType === "subsidized" ? graduationDate : issuedDate;
  if (!principal || !rate || !accrualStart || accrualStart > date) {
    return principal;
  }
  return principal + (principal * rate * (daysBetween(accrualStart, date) / 365));
}

function manualDebtAtDate(date) {
  return (financeData.loans || []).reduce((total, row) => total + loanAmountAtDate(row, date), 0);
}

function assetDatedRows() {
  return [
    ...(financeData.income || []).map((row) => ({ ...row, kind: "income", dateValue: parseAppDate(row.date) })),
    ...(financeData.spending || []).map((row) => ({ ...row, kind: "spending", dateValue: parseAppDate(row.date) }))
  ].filter((row) => row.dateValue);
}

function plaidAccountDatedRows() {
  const connectedAccountIds = new Set((financeData.plaidAccounts || []).map((account) => account.accountId).filter(Boolean));
  return (financeData.plaidAccountTransactions || []).map((row) => ({
    ...row,
    dateValue: parseAppDate(row.date)
  })).filter((row) => row.dateValue && !numberValue(row.pending) && connectedAccountIds.has(row.accountId));
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function assetsHashAdd(hash, value) {
  const text = String(value ?? "");
  let next = hash;
  for (let index = 0; index < text.length; index += 1) {
    next ^= text.charCodeAt(index);
    next = Math.imul(next, 16777619);
  }
  return next >>> 0;
}

function assetsDataSignature() {
  let hash = 2166136261;
  const add = (value) => { hash = assetsHashAdd(hash, value); };
  const addRows = (rows, fields) => {
    add(rows?.length || 0);
    for (const row of rows || []) {
      for (const field of fields) {
        add(row?.[field]);
      }
    }
  };

  add(d3.timeFormat("%Y-%m-%d")(new Date()));
  add(financeData.graduationDate);
  addRows(financeData.plaidAccounts, ["accountId", "type", "subtype", "name", "institutionName"]);
  for (const account of financeData.plaidAccounts || []) {
    add(account?.balances?.current);
    add(account?.balances?.available);
    add(account?.balances?.isoCurrencyCode);
  }
  addRows(financeData.plaidAccountTransactions, ["plaidTransactionId", "accountId", "amount", "date", "pending"]);
  addRows(financeData.plaidInvestments?.accounts, ["accountId", "name", "subtype"]);
  addRows(financeData.plaidInvestments?.holdings, ["accountId", "securityId", "quantity", "institutionPrice", "institutionValue", "costBasis"]);
  addRows(financeData.plaidInvestments?.securities, ["securityId", "name", "tickerSymbol", "type", "closePrice"]);
  addRows(financeData.spending, ["id", "category", "amount", "date"]);
  addRows(financeData.income, ["id", "category", "amount", "date"]);
  addRows(financeData.loans, ["id", "issuedDate", "subsidyType", "interestRate", "principal"]);
  return hash.toString(36);
}

function assetRangeStart() {
  const today = startOfDay(new Date());
  const monthOffsets = { "6m": 6, "1y": 12, "2y": 24 };
  if (monthOffsets[assetsChartRange]) {
    return d3.timeMonth.offset(d3.timeMonth.floor(today), -(monthOffsets[assetsChartRange] - 1));
  }

  const dates = [
    ...assetDatedRows().map((row) => row.dateValue),
    ...plaidAccountDatedRows().map((row) => row.dateValue),
    ...(financeData.loans || []).map((row) => parseAppDate(row.issuedDate)).filter(Boolean)
  ];
  return dates.length ? d3.min(dates) : d3.timeYear.offset(today, -1);
}

function rowsInAssetRange(rows) {
  const start = assetRangeStart();
  const today = startOfDay(new Date());
  return (rows || []).filter((row) => {
    const date = parseAppDate(row.date);
    return date && date >= start && date <= today;
  });
}

function netWorthTimeline() {
  const today = startOfDay(new Date());
  const start = assetRangeStart();
  const interval = assetsChartRange === "30d"
    ? d3.timeDay.every(2)
    : assetsChartRange === "90d"
      ? d3.timeWeek.every(1)
      : d3.timeMonth.every(1);
  const dates = interval.range(start, d3.timeDay.offset(today, 1));
  if (!dates.length || dates[0].getTime() !== start.getTime()) {
    dates.unshift(start);
  }
  if (dates.at(-1)?.getTime() !== today.getTime()) {
    dates.push(today);
  }

  const accountTransactions = plaidAccountDatedRows();
  const ledgerRows = accountTransactions.length ? [] : assetDatedRows();
  return dates.map((date) => {
    let assets = 0;
    let debt = manualDebtAtDate(date);
    for (const account of financeData.plaidAccounts || []) {
      const futureActivity = accountTransactions.reduce((total, row) => (
        row.accountId === account.accountId && row.dateValue > date && row.dateValue <= today
          ? total + numberValue(row.amount)
          : total
      ), 0);
      if (accountIsDebt(account)) {
        debt += Math.abs(assetAccountBalance(account)) - futureActivity;
      } else {
        assets += assetAccountBalance(account) + futureActivity;
      }
    }
    if (!accountTransactions.length) {
      const futureFlow = ledgerRows.reduce((total, row) => {
        if (row.dateValue <= date || row.dateValue > today) {
          return total;
        }
        const amount = numberValue(row.amount);
        return total + (row.kind === "income" ? amount : -amount);
      }, 0);
      assets -= futureFlow;
    }
    return { date, assets, debt, value: assets - debt };
  });
}

function assetChartSize(container, minimumWidth = 440, height = 250) {
  return {
    width: Math.max(container?.clientWidth || minimumWidth, minimumWidth),
    height
  };
}

function clearAssetChart(container) {
  container.replaceChildren();
}

function renderAssetChartEmpty(container, message) {
  clearAssetChart(container);
  const empty = document.createElement("div");
  empty.className = "assets-chart-empty";
  empty.textContent = message;
  container.append(empty);
}

function assetChartTooltip(container) {
  const tooltip = document.createElement("div");
  tooltip.className = "assets-chart-tooltip";
  tooltip.hidden = true;
  container.append(tooltip);
  return tooltip;
}

function positionAssetTooltip(tooltip, event, container, lines) {
  const [x, y] = d3.pointer(event, container);
  tooltip.replaceChildren(...lines.map(({ text, strong = false }) => {
    const line = document.createElement(strong ? "strong" : "span");
    line.textContent = text;
    return line;
  }));
  tooltip.style.left = `${Math.max(72, Math.min(container.clientWidth - 72, x))}px`;
  tooltip.style.top = `${Math.max(54, y)}px`;
  tooltip.hidden = false;
}

function assetMoneyTick(value) {
  const amount = Math.abs(value);
  const compact = amount >= 1_000_000
    ? `${(amount / 1_000_000).toFixed(amount >= 10_000_000 ? 0 : 1)}m`
    : amount >= 1_000
      ? `${(amount / 1_000).toFixed(amount >= 10_000 ? 0 : 1)}k`
      : Math.round(amount);
  return `${value < 0 ? "-" : ""}$${compact}`;
}

function assetDateDomain(rows, interval = d3.timeDay) {
  const extent = d3.extent(rows, (row) => row.date);
  return extent[0]?.getTime() === extent[1]?.getTime()
    ? [interval.offset(extent[0], -1), interval.offset(extent[1], 1)]
    : extent;
}

function spendingRowsInAssetRange() {
  return rowsInAssetRange(financeData.spending)
    .filter((row) => (
      row.category !== "Extracted Value"
      && (!assetsTuitionNormalized || row.category !== "Tuition")
      && numberValue(row.amount) > 0
    ));
}

function weeklySpendingBuckets() {
  const spendingRows = spendingRowsInAssetRange();
  const incomeRows = rowsInAssetRange(financeData.income).filter((row) => numberValue(row.amount) > 0);
  const datedRows = [...spendingRows, ...incomeRows]
    .map((row) => ({ ...row, parsedDate: parseAppDate(row.date) }))
    .filter((row) => row.parsedDate && !Number.isNaN(row.parsedDate.getTime()));
  if (!datedRows.length) {
    return { rows: [], completedAverage: 0 };
  }

  const currentWeek = d3.timeMonday.floor(startOfDay(new Date()));
  const firstWeek = d3.timeMonday.floor(d3.min(datedRows, (row) => row.parsedDate));
  const weekStarts = d3.timeMonday.range(firstWeek, d3.timeMonday.offset(currentWeek, 1));
  const key = d3.timeFormat("%Y-%m-%d");
  const buckets = new Map(weekStarts.map((date) => [key(date), { date, value: 0, income: 0, byCategory: new Map() }]));
  for (const row of spendingRows) {
    const bucket = buckets.get(key(d3.timeMonday.floor(parseAppDate(row.date))));
    if (!bucket) continue;
    const amount = numberValue(row.amount);
    const category = row.category || "Uncategorized";
    bucket.value += amount;
    bucket.byCategory.set(category, (bucket.byCategory.get(category) || 0) + amount);
  }
  for (const row of incomeRows) {
    const bucket = buckets.get(key(d3.timeMonday.floor(parseAppDate(row.date))));
    if (bucket) bucket.income += numberValue(row.amount);
  }
  const weeklyRows = [...buckets.values()];
  const completeRows = weeklyRows.filter((row) => row.date < currentWeek);
  const averageRows = completeRows.length ? completeRows : weeklyRows;
  return {
    rows: weeklyRows,
    completedAverage: d3.mean(averageRows, (row) => row.value) || 0
  };
}

function renderWeeklySpendingChart(weekly) {
  const { rows, completedAverage } = weekly;
  if (!rows.length) {
    renderAssetChartEmpty(assetsMonthlySpendingChart, "Add dated income or spending to build a weekly trend.");
    return;
  }
  clearAssetChart(assetsMonthlySpendingChart);
  const { width, height } = assetChartSize(assetsMonthlySpendingChart, 520, 310);
  const margin = { top: 20, right: 58, bottom: 32, left: 58 };
  const x = d3.scaleTime().domain(assetDateDomain(rows)).range([margin.left, width - margin.right]);
  const incomeMax = d3.max(rows, (row) => row.income) || 1;
  const spendingMax = d3.max([...rows.map((row) => row.value), completedAverage]) || 1;
  const yIncome = d3.scaleLinear().domain([0, incomeMax]).nice().range([height - margin.bottom, margin.top]);
  const ySpending = d3.scaleLinear().domain([0, spendingMax]).nice().range([height - margin.bottom, margin.top]);
  const svg = d3.select(assetsMonthlySpendingChart).append("svg").attr("viewBox", `0 0 ${width} ${height}`).attr("role", "img").attr("aria-label", "Weekly income on the left scale and weekly spending on the right scale");
  svg.selectAll(".assets-chart-grid-line").data(ySpending.ticks(5)).join("line").attr("class", "assets-chart-grid-line").attr("x1", margin.left).attr("x2", width - margin.right).attr("y1", ySpending).attr("y2", ySpending);
  const tickEvery = Math.max(1, Math.ceil(rows.length / 8));
  const ticks = rows.filter((_, index) => index % tickEvery === 0).map((row) => row.date);
  svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).tickValues(ticks).tickFormat(d3.timeFormat("%b %d")).tickSizeOuter(0));
  svg.append("g").attr("class", "assets-chart-axis-income").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(yIncome).ticks(5).tickFormat(assetMoneyTick).tickSize(0)).call((group) => group.select(".domain").remove());
  svg.append("g").attr("class", "assets-chart-axis-spending").attr("transform", `translate(${width - margin.right},0)`).call(d3.axisRight(ySpending).ticks(5).tickFormat(assetMoneyTick).tickSize(0)).call((group) => group.select(".domain").remove());
  const tooltip = assetChartTooltip(assetsMonthlySpendingChart);
  for (const series of [
    { key: "income", color: "#9FFCDF", scale: yIncome },
    { key: "value", color: "#ef8f8f", scale: ySpending }
  ]) {
    const seriesName = series.key === "value" ? "spending" : series.key;
    const line = d3.line().x((row) => x(row.date)).y((row) => series.scale(row[series.key])).curve(d3.curveLinear);
    svg.append("path").datum(rows).attr("class", `weekly-${seriesName}-line`).attr("d", line).attr("fill", "none").attr("stroke", series.color).attr("stroke-width", 2).attr("stroke-linecap", "butt").attr("stroke-linejoin", "miter");
  }
  if (completedAverage > 0) {
    svg.append("line").attr("x1", margin.left).attr("x2", width - margin.right).attr("y1", ySpending(completedAverage)).attr("y2", ySpending(completedAverage)).attr("stroke", "rgba(239,143,143,.6)").attr("stroke-dasharray", "5 4");
    svg.append("text").attr("x", width - margin.right - 5).attr("y", Math.max(margin.top + 10, ySpending(completedAverage) - 7)).attr("text-anchor", "end").attr("fill", "rgba(239,143,143,.78)").attr("font-size", 10).text(`Weekly avg ${assetMoneyTick(completedAverage)}`);
  }

  const focus = svg.append("g").attr("class", "assets-chart-focus").style("display", "none");
  const crosshair = focus.append("line").attr("class", "assets-chart-crosshair").attr("y1", margin.top).attr("y2", height - margin.bottom);
  const incomeMarker = focus.append("rect").attr("width", 7).attr("height", 7).attr("x", -3.5).attr("y", -3.5).attr("fill", "#9FFCDF");
  const spendingMarker = focus.append("rect").attr("width", 7).attr("height", 7).attr("x", -3.5).attr("y", -3.5).attr("fill", "#ef8f8f");
  const nearestWeek = d3.bisector((row) => row.date).center;
  svg.append("rect")
    .attr("class", "assets-chart-hit-area")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("fill", "transparent")
    .on("pointermove", (event) => {
      const pointerX = d3.pointer(event, svg.node())[0];
      const row = rows[nearestWeek(rows, x.invert(pointerX))];
      const markerX = x(row.date);
      focus.style("display", null);
      crosshair.attr("x1", markerX).attr("x2", markerX);
      incomeMarker.attr("transform", `translate(${markerX},${yIncome(row.income)})`);
      spendingMarker.attr("transform", `translate(${markerX},${ySpending(row.value)})`);
      positionAssetTooltip(tooltip, event, assetsMonthlySpendingChart, [
        { text: `Week of ${d3.timeFormat("%B %d, %Y")(row.date)}${row === rows.at(-1) ? " · current" : ""}` },
        { text: `Income ${money(row.income)}`, strong: true },
        { text: `Spending ${money(row.value)}`, strong: true },
        { text: `Average weekly spending ${money(completedAverage)}` }
      ]);
    })
    .on("pointerleave", () => {
      focus.style("display", "none");
      tooltip.hidden = true;
    });
}

function investmentPortfolioModel() {
  const investments = financeData.plaidInvestments || {};
  const securityById = new Map((investments.securities || []).map((security) => [security.securityId, security]));
  const positions = (investments.holdings || []).map((holding) => {
    const security = securityById.get(holding.securityId) || {};
    const value = numberValue(holding.institutionValue ?? (numberValue(holding.quantity) * numberValue(holding.institutionPrice)));
    return {
      name: security.name || "Security",
      ticker: security.tickerSymbol || "",
      type: security.type || "Investment",
      quantity: numberValue(holding.quantity),
      price: holding.institutionPrice === null ? null : numberValue(holding.institutionPrice),
      value
    };
  }).filter((position) => position.value || position.quantity).sort((a, b) => b.value - a.value);
  const accountTotal = (investments.accounts || []).reduce((total, account) => total + assetAccountBalance(account), 0);
  return {
    positions,
    accounts: investments.accounts || [],
    total: accountTotal || d3.sum(positions, (position) => position.value)
  };
}

function renderInvestmentPortfolio() {
  const portfolio = investmentPortfolioModel();
  const accountCount = portfolio.accounts.length || (portfolio.positions.length ? 1 : 0);
  assetsInvestmentTotal.textContent = money(portfolio.total);
  assetsInvestmentCount.textContent = portfolio.positions.length
    ? `${portfolio.positions.length} position${portfolio.positions.length === 1 ? "" : "s"} across ${accountCount} account${accountCount === 1 ? "" : "s"}`
    : "No positions";
  assetsInvestmentStatus.textContent = financeData.plaidInvestmentsRefreshedOn
    ? `Plaid holdings · updated ${financeData.plaidInvestmentsRefreshedOn}`
    : "Connect a brokerage through Plaid";
  assetsPortfolioList.replaceChildren(
    ...portfolio.positions.slice(0, 8).map((position) => {
      const row = document.createElement("div");
      row.className = "assets-portfolio-row";
      const identity = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = position.ticker || position.name;
      const detail = document.createElement("span");
      detail.textContent = position.ticker ? position.name : position.type;
      identity.append(name, detail);
      const value = document.createElement("div");
      const amount = document.createElement("strong");
      amount.textContent = money(position.value);
      const quantity = document.createElement("span");
      quantity.textContent = `${position.quantity.toLocaleString("en-US", { maximumFractionDigits: 4 })} shares${position.price === null ? "" : ` · ${money(position.price)}`}`;
      value.append(amount, quantity);
      row.append(identity, value);
      return row;
    })
  );
  if (!portfolio.positions.length) {
    const empty = document.createElement("div");
    empty.className = "assets-portfolio-empty";
    empty.textContent = portfolio.accounts.length
      ? "Plaid has not returned holdings for this investment account yet."
      : "Link Robinhood or another brokerage to show accounts, holdings, prices, and position values.";
    assetsPortfolioList.append(empty);
  }
}

function renderAccountBalancesChart() {
  const accounts = (financeData.plaidAccounts || []).map((account, index) => ({
    key: account.accountId || `${account.name || "account"}-${index}`,
    name: account.name || "Account",
    meta: [account.institutionName, account.subtype || account.type].filter(Boolean).join(" · ") || "Connected account",
    available: plaidAccountBalance(account, "available"),
    current: plaidAccountBalance(account, "current"),
    currency: account.balances?.isoCurrencyCode || "USD",
    value: accountIsDebt(account) ? -Math.abs(assetAccountBalance(account)) : assetAccountBalance(account),
    debt: accountIsDebt(account)
  })).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
  if (!accounts.length) {
    renderAssetChartEmpty(assetsBalancesChart, "Link an account in Plaid Manager to compare balances.");
    return;
  }

  clearAssetChart(assetsBalancesChart);
  const { width } = assetChartSize(assetsBalancesChart);
  const height = Math.max(250, accounts.length * 34 + 45);
  const margin = { top: 10, right: 18, bottom: 28, left: Math.min(145, width * 0.32) };
  const extent = d3.extent(accounts.flatMap((row) => [row.value, 0]));
  const x = d3.scaleLinear().domain(extent).nice().range([margin.left, width - margin.right]);
  const accountByKey = new Map(accounts.map((row) => [row.key, row]));
  const y = d3.scaleBand().domain(accounts.map((row) => row.key)).range([margin.top, height - margin.bottom]).padding(0.3);
  const svg = d3.select(assetsBalancesChart).append("svg").attr("viewBox", `0 0 ${width} ${height}`).attr("role", "img").attr("aria-label", "Current connected account balances");
  svg.append("line").attr("x1", x(0)).attr("x2", x(0)).attr("y1", margin.top).attr("y2", height - margin.bottom).attr("stroke", "rgba(255,255,255,.18)");
  svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).ticks(4).tickFormat(assetMoneyTick).tickSizeOuter(0));
  svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).tickFormat((key) => accountByKey.get(key)?.name || "Account").tickSize(0)).call((group) => group.select(".domain").remove());
  const tooltip = assetChartTooltip(assetsBalancesChart);
  svg.selectAll(".account-balance-bar").data(accounts).join("rect")
    .attr("x", (row) => Math.min(x(0), x(row.value)))
    .attr("y", (row) => y(row.key))
    .attr("width", (row) => Math.max(2, Math.abs(x(row.value) - x(0))))
    .attr("height", y.bandwidth())
    .attr("fill", (row) => row.debt ? "#e58b8b" : "#52AD9C")
    .on("pointermove", (event, row) => positionAssetTooltip(tooltip, event, assetsBalancesChart, [
      { text: row.meta },
      { text: money(row.value), strong: true },
      { text: `Current ${row.current === null ? "—" : money(row.current)} · Available ${row.available === null ? "—" : money(row.available)} · ${row.currency}` }
    ]))
    .on("pointerleave", () => { tooltip.hidden = true; });
}

function categoryTrendData(weekly) {
  const currentWeek = d3.timeMonday.floor(new Date());
  const averageRows = weekly.rows.some((row) => row.date < currentWeek)
    ? weekly.rows.filter((row) => row.date < currentWeek)
    : weekly.rows;
  const categories = new Set();
  for (const row of weekly.rows) {
    for (const category of row.byCategory.keys()) categories.add(category);
  }
  return [...categories].map((name) => {
    const points = weekly.rows.map((row) => ({ date: row.date, value: row.byCategory.get(name) || 0 }));
    return {
      name,
      points,
      total: d3.sum(points, (row) => row.value),
      average: d3.mean(averageRows, (row) => row.byCategory.get(name) || 0) || 0
    };
  }).filter((category) => category.total > 0).sort((a, b) => b.total - a.total);
}

function renderCategoryTrends(categories) {
  assetsCategoryTrends.replaceChildren();
  if (!categories.length) {
    const empty = document.createElement("div");
    empty.className = "assets-chart-empty";
    empty.textContent = "No categorized spending is recorded in this range.";
    assetsCategoryTrends.append(empty);
    return;
  }
  for (const category of categories) {
    const card = document.createElement("article");
    card.className = "category-trend-card";
    const head = document.createElement("div");
    head.className = "category-trend-head";
    const name = document.createElement("strong");
    name.textContent = category.name;
    const average = document.createElement("span");
    average.textContent = `${money(category.average)} avg / wk`;
    head.append(name, average);
    const chart = document.createElement("div");
    chart.className = "category-trend-chart";
    card.append(head, chart);
    assetsCategoryTrends.append(card);

    const width = Math.max(chart.clientWidth || 280, 240);
    const height = 105;
    const margin = { top: 8, right: 5, bottom: 20, left: 5 };
    const x = d3.scaleTime().domain(assetDateDomain(category.points)).range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().domain([0, d3.max(category.points, (row) => row.value) || 1]).nice().range([height - margin.bottom, margin.top]);
    const svg = d3.select(chart).append("svg").attr("viewBox", `0 0 ${width} ${height}`).attr("role", "img").attr("aria-label", `${category.name} weekly spending`);
    const tooltip = assetChartTooltip(chart);
    const line = d3.line().x((row) => x(row.date)).y((row) => y(row.value)).curve(d3.curveLinear);
    svg.append("path").datum(category.points).attr("class", "category-day-line").attr("d", line).attr("fill", "none").attr("stroke", "#52AD9C").attr("stroke-width", 1.5).attr("stroke-linecap", "butt").attr("stroke-linejoin", "miter");
    const focus = svg.append("g").attr("class", "assets-chart-focus").style("display", "none");
    const crosshair = focus.append("line").attr("class", "assets-chart-crosshair").attr("y1", margin.top).attr("y2", height - margin.bottom);
    const marker = focus.append("rect").attr("width", 6).attr("height", 6).attr("x", -3).attr("y", -3).attr("fill", "#52AD9C");
    const tickEvery = Math.max(1, Math.ceil(category.points.length / 4));
    const ticks = category.points.filter((_, index) => index % tickEvery === 0).map((row) => row.date);
    svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).tickValues(ticks).tickFormat(d3.timeFormat("%b %d")).tickSize(0)).call((group) => group.select(".domain").remove());
    const nearestWeek = d3.bisector((row) => row.date).center;
    svg.append("rect").attr("class", "assets-chart-hit-area").attr("x", margin.left).attr("y", margin.top).attr("width", width - margin.left - margin.right).attr("height", height - margin.top - margin.bottom).attr("fill", "transparent")
      .on("pointermove", (event) => {
        const pointerX = d3.pointer(event, svg.node())[0];
        const row = category.points[nearestWeek(category.points, x.invert(pointerX))];
        const markerX = x(row.date);
        focus.style("display", null);
        crosshair.attr("x1", markerX).attr("x2", markerX);
        marker.attr("transform", `translate(${markerX},${y(row.value)})`);
        positionAssetTooltip(tooltip, event, chart, [
          { text: `Week of ${d3.timeFormat("%B %d, %Y")(row.date)}` },
          { text: money(row.value), strong: true }
        ]);
      })
      .on("pointerleave", () => {
        focus.style("display", "none");
        tooltip.hidden = true;
      });
  }
}

function spendingInsights(weekly, categories) {
  if (!weekly.rows.length) return [];
  const today = startOfDay(new Date());
  const currentWeek = d3.timeMonday.floor(today);
  const completed = weekly.rows.filter((row) => row.date < currentWeek);
  const current = weekly.rows.find((row) => row.date.getTime() === currentWeek.getTime());
  const insights = [];
  if (current && weekly.completedAverage > 0) {
    const elapsedDays = Math.max(1, d3.timeDay.count(currentWeek, today) + 1);
    const projected = current.value / elapsedDays * 7;
    const difference = projected - weekly.completedAverage;
    insights.push({
      label: "Current pace",
      value: money(projected),
      detail: `${Math.abs(difference / weekly.completedAverage * 100).toFixed(0)}% ${difference >= 0 ? "above" : "below"} your average completed week if this pace holds.`
    });
  }
  const top = categories[0];
  const total = d3.sum(categories, (category) => category.total);
  if (top && total > 0) {
    insights.push({
      label: "Largest category",
      value: top.name,
      detail: `${money(top.total)} in range, or ${(top.total / total * 100).toFixed(0)}% of analyzed spending.`
    });
  }
  if (completed.length >= 2) {
    const latest = completed.at(-1);
    const previous = completed.at(-2);
    const difference = latest.value - previous.value;
    insights.push({
      label: "Last complete week",
      value: `${difference >= 0 ? "+" : ""}${money(difference)}`,
      detail: `Week of ${d3.timeFormat("%b %d")(latest.date)} was ${difference >= 0 ? "higher" : "lower"} than the prior week.`
    });
    const changes = categories.map((category) => ({
      name: category.name,
      difference: (latest.byCategory.get(category.name) || 0) - (previous.byCategory.get(category.name) || 0)
    })).sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference));
    const biggest = changes[0];
    if (biggest && biggest.difference) {
      insights.push({
        label: "Biggest category shift",
        value: biggest.name,
        detail: `${biggest.difference >= 0 ? "+" : ""}${money(biggest.difference)} from the week of ${d3.timeFormat("%b %d")(previous.date)} to ${d3.timeFormat("%b %d")(latest.date)}.`
      });
    }
  }
  return insights.slice(0, 4);
}

function renderSpendingInsights(insights) {
  assetsInsights.replaceChildren();
  if (!insights.length) {
    const empty = document.createElement("div");
    empty.className = "assets-insight-empty";
    empty.textContent = "Add at least two weeks of dated spending to unlock comparisons.";
    assetsInsights.append(empty);
    return;
  }
  for (const insight of insights) {
    const card = document.createElement("article");
    card.className = "assets-insight-card";
    const label = document.createElement("span");
    label.textContent = insight.label;
    const value = document.createElement("strong");
    value.textContent = insight.value;
    const detail = document.createElement("p");
    detail.textContent = insight.detail;
    card.append(label, value, detail);
    assetsInsights.append(card);
  }
}

function assetsCalculation() {
  const key = `${assetsChartRange}:${assetsTuitionNormalized}:${assetsDataSignature()}`;
  const cached = assetsCalculationCache.get(key);
  if (cached) {
    return cached;
  }

  const weekly = weeklySpendingBuckets();
  const categories = categoryTrendData(weekly);
  const calculation = {
    key,
    weekly,
    categories,
    insights: spendingInsights(weekly, categories)
  };
  assetsCalculationCache.set(key, calculation);
  while (assetsCalculationCache.size > 8) {
    assetsCalculationCache.delete(assetsCalculationCache.keys().next().value);
  }
  return calculation;
}

function assetsChartLayoutKey(calculation) {
  return [
    calculation.key,
    assetsMonthlySpendingChart?.clientWidth || 0,
    assetsBalancesChart?.clientWidth || 0,
    assetsCategoryTrends?.clientWidth || 0
  ].join(":");
}

function renderAssetsGraphs() {
  if (!assetsMonthlySpendingChart || document.querySelector('[data-page="assets"]')?.hidden) {
    return;
  }
  const calculation = assetsCalculation();
  const renderKey = assetsChartLayoutKey(calculation);
  if (renderKey === assetsRenderedKey) {
    return;
  }
  const currentWeek = d3.timeMonday.floor(startOfDay(new Date()));
  const completed = calculation.weekly.rows.filter((row) => row.date < currentWeek);
  const previous = completed.at(-2);
  const latest = completed.at(-1);
  const spendingChange = previous && latest ? latest.value - previous.value : null;
  assetsSpendingChange.textContent = previous && latest
    ? `Spending ${spendingChange >= 0 ? "+" : ""}${money(spendingChange)} vs prior week`
    : "Need 2 complete weeks";
  assetsSpendingChange.classList.toggle("is-spending-up", spendingChange > 0);
  assetsSpendingChange.classList.toggle("is-spending-down", spendingChange < 0);
  renderWeeklySpendingChart(calculation.weekly);
  renderAccountBalancesChart();
  renderCategoryTrends(calculation.categories);
  renderSpendingInsights(calculation.insights);
  assetsRenderedKey = renderKey;
}

function renderAssets() {
  const today = startOfDay(new Date());
  const cash = cashAccountsTotal();
  const debt = connectedDebtTotal() + manualDebtAtDate(today);
  const netWorth = connectedAssetsTotal() - debt;
  const averageSpending = assetsCalculation().weekly.completedAverage;
  assetsCashTotal.textContent = money(cash);
  assetsNetWorth.textContent = money(netWorth);
  assetsDebt.textContent = money(debt);
  assetsAverageSpending.textContent = money(averageSpending);
  renderInvestmentPortfolio();
  requestAnimationFrame(renderAssetsGraphs);
}

function renderAssetsCashDialog() {
  const accounts = cashAccounts();
  const total = cashAccountsTotal();
  assetsCashSummary.textContent = money(total);
  assetsCashList.replaceChildren(
    ...accounts.map((account) => {
      const row = document.createElement("div");
      row.className = "assets-cash-row";

      const body = document.createElement("div");
      body.className = "assets-cash-account";
      const name = document.createElement("strong");
      name.textContent = account.name || "Bank Account";
      const meta = document.createElement("span");
      meta.textContent = [account.subtype, account.type].filter(Boolean).join(" · ");
      body.append(name, meta);

      const amount = document.createElement("strong");
      amount.textContent = money(cashBalanceForAccount(account));

      row.append(body, amount);
      return row;
    })
  );

  if (!accounts.length) {
    const empty = document.createElement("div");
    empty.className = "assets-cash-empty";
    empty.textContent = "No bank account balances found.";
    assetsCashList.append(empty);
  }
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

function loadSankeySimulations() {
  try {
    const saved = JSON.parse(localStorage.getItem(sankeySimulationStorageKey) || "[]");
    return Array.isArray(saved)
      ? saved.filter((item) => ["income", "spending"].includes(item.ledger) && item.category && numberValue(item.amount) > 0)
      : [];
  } catch {
    return [];
  }
}

function saveSankeySimulations() {
  localStorage.setItem(sankeySimulationStorageKey, JSON.stringify(sankeySimulations));
}

function saveSankeySimulationEnabled() {
  localStorage.setItem(sankeySimulationEnabledKey, sankeySimulationEnabled ? "true" : "false");
}

function simulatedRowsForLedger(ledger) {
  if (!sankeySimulationEnabled) {
    return [];
  }
  return sankeySimulations
    .filter((item) => item.ledger === ledger)
    .map((item) => ({
      category: item.category,
      amount: item.amount,
      title: "Simulation",
      date: "",
      isSimulation: true
    }));
}

function sankeyCategoryRows(kind, category) {
  const ledger = kind === "income" ? "income" : kind === "spending" ? "spending" : "";
  if (!ledger || !category) {
    return [];
  }
  const sourceRows = ledger === "income"
    ? [...(financeData.income || []), ...simulatedRowsForLedger("income")]
    : [...(financeData.spending || []), ...simulatedRowsForLedger("spending")];
  return sourceRows
    .filter((row) => row.category === category)
    .map((row) => ({
      ...row,
      ledger
    }))
    .sort((a, b) => (
      (parseDateValue(b.date) ?? Number.NEGATIVE_INFINITY)
      - (parseDateValue(a.date) ?? Number.NEGATIVE_INFINITY)
      || numberValue(b.amount) - numberValue(a.amount)
    ));
}

function openSankeyTransactions(kind, category) {
  const rows = sankeyCategoryRows(kind, category);
  const label = kind === "income" ? "Income" : "Spending";
  const total = rows.reduce((sum, row) => sum + numberValue(row.amount), 0);
  sankeyTransactionsTitle.textContent = `${category} ${label}`;
  sankeyTransactionsSummary.textContent = `${rows.length} transaction${rows.length === 1 ? "" : "s"} · ${money(total)}`;
  sankeyTransactionsList.replaceChildren(
    ...(rows.length ? rows : []).map((row) => {
      const item = document.createElement("div");
      item.className = "sankey-transaction-row";
      item.append(document.createElement("span"));
      item.append(document.createElement("strong"));
      item.append(document.createElement("small"));
      item.children[0].textContent = row.title || (row.isSimulation ? "Simulation" : "Untitled");
      item.children[1].textContent = money(numberValue(row.amount));
      item.children[2].textContent = row.isSimulation
        ? "Simulation"
        : (row.date ? displayAppDate(row.date) : "No date");
      return item;
    })
  );
  if (!rows.length) {
    const empty = document.createElement("div");
    empty.className = "sankey-simulation-empty";
    empty.textContent = "No transactions found for this category.";
    sankeyTransactionsList.append(empty);
  }
  sankeyTransactionsDialog.showModal();
}

function sankeyClickableCategory(node) {
  return node.kind === "income" || node.kind === "spending"
    ? { kind: node.kind, category: node.name }
    : null;
}

function updateSankeySimulationCategories() {
  if (!sankeySimulationCategory || !sankeySimulationLedger) {
    return;
  }
  const ledger = sankeySimulationLedger.value === "spending" ? "spending" : "income";
  const categories = categoriesForLedger(ledger).filter((category) => category !== "Set Category");
  sankeySimulationCategory.replaceChildren(
    ...categories.map((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      return option;
    })
  );
}

function updateSankeySimulationMode() {
  const isLabelMode = sankeySimulationMode?.value === "label";
  if (sankeySimulationExistingField) {
    sankeySimulationExistingField.hidden = isLabelMode;
  }
  if (sankeySimulationLabelField) {
    sankeySimulationLabelField.hidden = !isLabelMode;
  }
  if (sankeySimulationLabel) {
    sankeySimulationLabel.required = isLabelMode;
  }
  if (sankeySimulationCategory) {
    sankeySimulationCategory.required = !isLabelMode;
  }
}

function renderSankeySimulationList() {
  if (!sankeySimulationList) {
    return;
  }
  if (sankeySimulationEnabledInput) {
    sankeySimulationEnabledInput.checked = sankeySimulationEnabled;
  }
  sankeySimulationList.replaceChildren(
    ...(sankeySimulations.length ? sankeySimulations : []).map((item) => {
      const row = document.createElement("div");
      row.className = "sankey-simulation-row";
      row.append(document.createElement("span"));
      row.append(document.createElement("strong"));
      const label = item.ledger === "income" ? "Income" : "Spending";
      row.children[0].textContent = `${label}: ${item.category}`;
      row.children[1].textContent = money(numberValue(item.amount));
      const button = document.createElement("button");
      button.className = "delete-row";
      button.type = "button";
      button.setAttribute("aria-label", `Remove ${item.category} simulation`);
      button.textContent = "x";
      button.addEventListener("click", () => {
        sankeySimulations = sankeySimulations.filter((savedItem) => savedItem.id !== item.id);
        saveSankeySimulations();
        renderSankeySimulationList();
        renderFinanceSankey();
      });
      row.append(button);
      return row;
    })
  );
  if (!sankeySimulations.length) {
    const empty = document.createElement("div");
    empty.className = "sankey-simulation-empty";
    empty.textContent = "No saved simulations.";
    sankeySimulationList.append(empty);
  }
}

function financeSankeyModel() {
  const incomeTotals = groupedLedgerTotals(
    [...(financeData.income || []), ...simulatedRowsForLedger("income")],
    "Uncategorized Income"
  );
  const spendingTotals = groupedLedgerTotals(
    [...(financeData.spending || []), ...simulatedRowsForLedger("spending")]
      .filter((row) => row.category !== "Extracted Value"),
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
  const openNodeCategory = (node) => {
    const category = sankeyClickableCategory(node);
    if (category) {
      openSankeyTransactions(category.kind, category.category);
    }
  };
  const openLinkCategory = (link) => {
    const category = sankeyClickableCategory(link.source) || sankeyClickableCategory(link.target);
    if (category) {
      openSankeyTransactions(category.kind, category.category);
    }
  };

  svg.append("g")
    .selectAll("path")
    .data(graph.links)
    .join("path")
    .attr("class", "finance-sankey-link")
    .classed("is-clickable", (link) => Boolean(sankeyClickableCategory(link.source) || sankeyClickableCategory(link.target)))
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", (link) => color(link.target.kind))
    .attr("stroke-width", (link) => Math.max(1, link.width))
    .on("click", (event, link) => {
      event.stopPropagation();
      openLinkCategory(link);
    })
    .append("title")
    .text((link) => `${link.source.name} to ${link.target.name}: ${money(link.value)}`);

  const node = svg.append("g")
    .selectAll("g")
    .data(graph.nodes)
    .join("g")
    .attr("class", "finance-sankey-node")
    .classed("is-clickable", (d) => Boolean(sankeyClickableCategory(d)))
    .attr("role", (d) => sankeyClickableCategory(d) ? "button" : null)
    .attr("tabindex", (d) => sankeyClickableCategory(d) ? "0" : null)
    .on("click", (event, d) => {
      event.stopPropagation();
      openNodeCategory(d);
    })
    .on("keydown", (event, d) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openNodeCategory(d);
      }
    });

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

function defaultClassMaterial(name = "New Class") {
  return {
    className: name,
    classDescription: "",
    isCodingClass: false,
    contentSections: [],
    multipleChoiceQuestions: [],
    openEndedQuestions: [],
    studyPlan: [],
    codingQuestions: [],
    keyTerms: [],
    summaries: [],
    practiceTasks: []
  };
}

function createClass(name = "New Class", material = null) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    material: material || defaultClassMaterial(name)
  };
}

function loadClassState() {
  try {
    const saved = JSON.parse(localStorage.getItem(classStorageKey) || "null");
    if (saved?.classes?.length) {
      return saved;
    }
  } catch (error) {
    // Fall through to a clean starter class.
  }
  const firstClass = createClass("Class");
  return { activeClassId: firstClass.id, classes: [firstClass] };
}

function saveClassState() {
  localStorage.setItem(classStorageKey, JSON.stringify(classState));
}

function activeClass() {
  return classState.classes.find((item) => item.id === classState.activeClassId) || classState.classes[0] || null;
}

function materialForClass(classItem) {
  const material = {
    ...defaultClassMaterial(classItem?.name || "Class"),
    ...(classItem?.material || {})
  };
  material.contentSections = Array.isArray(material.contentSections) ? material.contentSections : [];
  material.multipleChoiceQuestions = Array.isArray(material.multipleChoiceQuestions) ? material.multipleChoiceQuestions : [];
  material.openEndedQuestions = Array.isArray(material.openEndedQuestions) ? material.openEndedQuestions : [];
  material.studyPlan = Array.isArray(material.studyPlan) ? material.studyPlan : [];
  material.codingQuestions = Array.isArray(material.codingQuestions) ? material.codingQuestions : [];
  material.keyTerms = Array.isArray(material.keyTerms) ? material.keyTerms : [];
  material.summaries = Array.isArray(material.summaries) ? material.summaries : [];
  material.practiceTasks = Array.isArray(material.practiceTasks) ? material.practiceTasks : [];
  return material;
}

function normalizeTextArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item) => {
    if (typeof item === "string") {
      return item;
    }
    if (item && typeof item === "object") {
      return item.text || item.title || item.term || item.summary || "";
    }
    return "";
  }).filter(Boolean);
}

function normalizeContentSections(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((section, index) => ({
    id: section?.id || `section-${Date.now()}-${index}`,
    title: String(section?.title || section?.heading || `Section ${index + 1}`),
    content: String(section?.content || section?.body || section?.explanation || "")
  }));
}

function normalizeMultipleChoice(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((question, index) => {
    const choices = Array.isArray(question?.choices)
      ? question.choices
      : Array.isArray(question?.options)
        ? question.options
        : [];
    return {
      id: question?.id || `mc-${Date.now()}-${index}`,
      question: String(question?.question || question?.prompt || ""),
      choices: choices.map(String).filter(Boolean),
      answer: String(question?.answer || question?.correctAnswer || ""),
      explanation: String(question?.explanation || question?.context || "")
    };
  }).filter((question) => question.question && question.choices.length >= 2 && question.answer);
}

function normalizeOpenEnded(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((question, index) => ({
    id: question?.id || `open-${Date.now()}-${index}`,
    question: String(question?.question || question?.prompt || ""),
    modelAnswer: String(question?.modelAnswer || question?.answer || question?.explanation || ""),
    explanation: String(question?.explanation || question?.context || "")
  })).filter((question) => question.question);
}

function normalizeStudyPlan(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item, index) => ({
    id: item?.id || `plan-${Date.now()}-${index}`,
    title: String(item?.title || item?.day || item?.week || `Step ${index + 1}`),
    tasks: normalizeTextArray(item?.tasks || item?.items || (typeof item === "string" ? [item] : [])),
    focus: String(item?.focus || item?.description || "")
  }));
}

function normalizeCodingQuestions(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((question, index) => ({
    id: question?.id || `code-${Date.now()}-${index}`,
    title: String(question?.title || `Coding Question ${index + 1}`),
    prompt: String(question?.prompt || question?.question || ""),
    starterCode: String(question?.starterCode || question?.starter_code || ""),
    language: String(question?.language || "javascript"),
    expectedSolution: String(question?.expectedSolution || question?.solution || question?.explanation || ""),
    testCases: Array.isArray(question?.testCases) ? question.testCases : []
  })).filter((question) => question.prompt || question.title);
}

function validateClassMaterial(parsed) {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("JSON must be an object.");
  }
  if (!parsed.className || typeof parsed.className !== "string") {
    throw new Error("Missing string field: className.");
  }
  const material = {
    className: parsed.className,
    classDescription: String(parsed.classDescription || ""),
    isCodingClass: Boolean(parsed.isCodingClass),
    contentSections: normalizeContentSections(parsed.contentSections),
    multipleChoiceQuestions: normalizeMultipleChoice(parsed.multipleChoiceQuestions),
    openEndedQuestions: normalizeOpenEnded(parsed.openEndedQuestions),
    studyPlan: normalizeStudyPlan(parsed.studyPlan),
    codingQuestions: normalizeCodingQuestions(parsed.codingQuestions),
    keyTerms: normalizeTextArray(parsed.keyTerms),
    summaries: normalizeTextArray(parsed.summaries),
    practiceTasks: normalizeTextArray(parsed.practiceTasks)
  };
  return material;
}

function classPromptText(classItem) {
  const className = classItem?.name || "this class";
  const schema = {
    className: "string",
    classDescription: "string",
    isCodingClass: "boolean",
    contentSections: [{ title: "string", content: "string" }],
    multipleChoiceQuestions: [{ question: "string", choices: ["string"], answer: "string", explanation: "string" }],
    openEndedQuestions: [{ question: "string", modelAnswer: "string", explanation: "string" }],
    studyPlan: [{ title: "string", focus: "string", tasks: ["string"] }],
    codingQuestions: [{ title: "string", prompt: "string", starterCode: "string", language: "string", expectedSolution: "string", testCases: [{ input: "string", expectedOutput: "string" }] }],
    keyTerms: ["string"],
    summaries: ["string"],
    practiceTasks: ["string"]
  };
  return [
    `You are helping me create a learning portal for ${className}.`,
    "Using all class materials I provide, generate study content in the following JSON format.",
    "Include multiple-choice questions, open-ended questions, content sections, context/explanations, a study plan, key terms, summaries, practice tasks, and coding questions only if this is a coding/programming class.",
    "Return only valid JSON. Do not include markdown.",
    "",
    JSON.stringify(schema, null, 2)
  ].join("\n");
}

function showClassStatus(message) {
  if (!classElements.status) {
    return;
  }
  classElements.status.textContent = message;
  classElements.status.hidden = false;
  window.clearTimeout(showClassStatus.timeout);
  showClassStatus.timeout = window.setTimeout(() => {
    classElements.status.hidden = true;
  }, 2200);
}

function resetClassQuiz(material) {
  classQuizIndex = 0;
  classQuizAnswered = false;
  classQuizCorrect = 0;
  classQuizOrder = (material?.multipleChoiceQuestions || []).map((_, index) => index);
}

function shuffleClassQuiz(material) {
  resetClassQuiz(material);
  for (let index = classQuizOrder.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [classQuizOrder[index], classQuizOrder[swapIndex]] = [classQuizOrder[swapIndex], classQuizOrder[index]];
  }
}

function orderedClassQuestions(material) {
  const questions = material.multipleChoiceQuestions || [];
  if (classQuizOrder.length !== questions.length) {
    classQuizOrder = questions.map((_, index) => index);
  }
  return classQuizOrder.map((index) => questions[index]).filter(Boolean);
}

function ClassHeader(classItem, material) {
  classElements.tabs.replaceChildren(
    ...classState.classes.map((classItem) => {
      const button = document.createElement("button");
      button.className = `class-tab${classItem.id === classState.activeClassId ? " is-active" : ""}`;
      button.type = "button";
      button.textContent = classItem.name;
      button.addEventListener("click", () => {
        classState.activeClassId = classItem.id;
        resetClassQuiz(materialForClass(classItem));
        saveClassState();
        renderClassPage();
      });
      return button;
    })
  );
  classElements.title.textContent = material.className || classItem.name;
  classElements.description.textContent = material.classDescription || "No material imported yet. Copy the prompt, generate JSON with your class materials, then import it here.";
}

function classEmpty(title, text = "") {
  const empty = document.createElement("div");
  empty.className = "class-empty";
  const strong = document.createElement("strong");
  strong.textContent = title;
  const span = document.createElement("span");
  span.textContent = text;
  empty.append(strong, span);
  return empty;
}

function AnswerOption(choice, question, choices, feedback, material) {
  const button = document.createElement("button");
  button.className = "class-choice";
  button.type = "button";
  button.textContent = choice;
  button.disabled = classQuizAnswered;
  button.addEventListener("click", () => {
    classQuizAnswered = true;
    const correct = String(choice).trim().toLowerCase() === String(question.answer).trim().toLowerCase();
    if (correct) {
      classQuizCorrect += 1;
    }
    for (const item of choices.querySelectorAll(".class-choice")) {
      const isAnswer = item.textContent.trim().toLowerCase() === String(question.answer).trim().toLowerCase();
      item.disabled = true;
      item.classList.toggle("is-correct", isAnswer);
      item.classList.toggle("is-incorrect", item === button && !correct);
    }
    feedback.replaceChildren();
    feedback.hidden = false;
    const result = document.createElement("strong");
    result.textContent = correct ? "Correct" : `Answer: ${question.answer}`;
    const explanation = document.createElement("span");
    explanation.textContent = question.explanation || "No explanation included.";
    const nextButton = document.createElement("button");
    nextButton.className = "add-button save-budget";
    nextButton.type = "button";
    nextButton.textContent = classQuizIndex === orderedClassQuestions(material).length - 1 ? "Restart" : "Next";
    nextButton.addEventListener("click", () => {
      classQuizAnswered = false;
      if (classQuizIndex === orderedClassQuestions(material).length - 1) {
        resetClassQuiz(material);
      } else {
        classQuizIndex += 1;
      }
      LearnCard(material);
    });
    feedback.append(result, explanation, nextButton);
    updateLearnProgress(material);
  });
  return button;
}

function updateLearnProgress(material) {
  const questions = orderedClassQuestions(material);
  if (!questions.length) {
    classElements.quizProgress.textContent = "";
    classElements.progressBar.style.width = "0%";
    return;
  }
  classElements.quizProgress.textContent = `Question ${classQuizIndex + 1} of ${questions.length} · ${classQuizCorrect} correct`;
  classElements.progressBar.style.width = `${((classQuizIndex + (classQuizAnswered ? 1 : 0)) / questions.length) * 100}%`;
}

function LearnCard(material) {
  const questions = orderedClassQuestions(material);
  if (!questions.length) {
    updateLearnProgress(material);
    classElements.quizBody.replaceChildren(classEmpty("No multiple-choice questions yet", "Import JSON with multipleChoiceQuestions to start Learn Mode."));
    return;
  }
  classQuizIndex = Math.min(classQuizIndex, questions.length - 1);
  const question = questions[classQuizIndex];
  updateLearnProgress(material);

  const card = document.createElement("article");
  card.className = "class-question-card";
  const prompt = document.createElement("div");
  prompt.className = "class-quiz-prompt";
  prompt.textContent = question.question;
  const choices = document.createElement("div");
  choices.className = "class-choice-list";
  const feedback = document.createElement("div");
  feedback.className = "class-feedback";
  feedback.hidden = true;

  for (const choice of question.choices) {
    choices.append(AnswerOption(choice, question, choices, feedback, material));
  }
  card.append(prompt, choices, feedback);
  classElements.quizBody.replaceChildren(card);
}

function ContentSectionsCard(material) {
  const sections = material.contentSections || [];
  if (!sections.length) {
    classElements.sections.replaceChildren(classEmpty("No content sections yet", "Import JSON or add a section manually."));
    return;
  }
  classElements.sections.replaceChildren(
    ...sections.map((section, index) => {
      const card = document.createElement("article");
      card.className = "class-section-card";
      const top = document.createElement("div");
      top.className = "class-section-top";
      const title = document.createElement("strong");
      title.textContent = section.title || `Section ${index + 1}`;
      const actions = document.createElement("div");
      actions.className = "class-section-actions";
      for (const [label, handler] of [
        ["Edit", () => openClassSectionDialog(index)],
        ["Up", () => moveClassSection(index, -1)],
        ["Down", () => moveClassSection(index, 1)]
      ]) {
        const button = document.createElement("button");
        button.className = "add-button";
        button.type = "button";
        button.textContent = label;
        button.disabled = (label === "Up" && index === 0) || (label === "Down" && index === sections.length - 1);
        button.addEventListener("click", handler);
        actions.append(button);
      }
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-row";
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("aria-label", "Delete section");
      deleteButton.addEventListener("click", () => deleteClassSection(index));
      actions.append(deleteButton);
      top.append(title, actions);
      const content = document.createElement("p");
      content.textContent = section.content || "";
      card.append(top, content);
      return card;
    })
  );
}

function OpenQuestionCard(question) {
  const card = document.createElement("article");
  card.className = "class-question-card";
  const prompt = document.createElement("strong");
  prompt.textContent = question.question;
  const answer = document.createElement("textarea");
  answer.className = "ledger-input class-textarea";
  answer.placeholder = "Your answer";
  const actions = document.createElement("div");
  actions.className = "class-open-actions";
  const reveal = document.createElement("button");
  reveal.className = "add-button";
  reveal.type = "button";
  reveal.textContent = "Reveal answer";
  const model = document.createElement("div");
  model.className = "class-answer-box";
  model.hidden = true;
  const modelTitle = document.createElement("strong");
  modelTitle.textContent = "Model answer";
  const modelBody = document.createElement("span");
  modelBody.textContent = [question.modelAnswer, question.explanation].filter(Boolean).join(" ") || "No model answer included.";
  model.append(modelTitle, modelBody);
  reveal.addEventListener("click", () => {
    model.hidden = !model.hidden;
    reveal.textContent = model.hidden ? "Reveal answer" : "Hide answer";
  });
  actions.append(reveal);
  card.append(prompt, answer, actions, model);
  return card;
}

function renderOpenQuestions(material) {
  const questions = material.openEndedQuestions || [];
  if (!questions.length) {
    classElements.openQuestions.replaceChildren(classEmpty("No open questions yet", "Import JSON with openEndedQuestions to practice written responses."));
    return;
  }
  classElements.openQuestions.replaceChildren(...questions.map(OpenQuestionCard));
}

function StudyPlanCard(material) {
  const plan = material.studyPlan || [];
  if (!plan.length) {
    classElements.studyPlan.replaceChildren(classEmpty("No study plan yet", "Import JSON with a studyPlan array to organize review blocks."));
    return;
  }
  classElements.studyPlan.replaceChildren(
    ...plan.map((item) => {
      const row = document.createElement("article");
      row.className = "class-plan-item";
      const title = document.createElement("strong");
      title.textContent = item.title || "Study block";
      row.append(title);
      if (item.focus) {
        const focus = document.createElement("div");
        focus.className = "class-plan-focus";
        focus.textContent = item.focus;
        row.append(focus);
      }
      const tasks = document.createElement("div");
      tasks.className = "class-task-list";
      for (const task of item.tasks || []) {
        const chip = document.createElement("span");
        chip.className = "class-task-chip";
        chip.textContent = task;
        tasks.append(chip);
      }
      if (tasks.children.length) {
        row.append(tasks);
      }
      return row;
    })
  );
}

function renderTermsAndPractice(material) {
  const terms = material.keyTerms || [];
  classElements.keyTerms.replaceChildren(
    ...(terms.length ? terms.map((term) => {
      const chip = document.createElement("span");
      chip.className = "class-term-chip";
      chip.textContent = term;
      return chip;
    }) : [classEmpty("No key terms yet", "Key terms appear here after import.")])
  );
  const items = [...(material.summaries || []), ...(material.practiceTasks || [])];
  classElements.practice.replaceChildren(
    ...(items.length ? items.map((item) => {
      const row = document.createElement("article");
      row.className = "class-practice-item";
      const body = document.createElement("p");
      body.textContent = item;
      row.append(body);
      return row;
    }) : [])
  );
}

function loadMonaco() {
  if (window.monaco) {
    return Promise.resolve(window.monaco);
  }
  if (monacoLoadPromise) {
    return monacoLoadPromise;
  }
  monacoLoadPromise = new Promise((resolve, reject) => {
    const loader = document.createElement("script");
    loader.src = "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/loader.js";
    loader.onload = () => {
      window.require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs" } });
      window.require(["vs/editor/editor.main"], () => resolve(window.monaco));
    };
    loader.onerror = () => reject(new Error("Monaco could not be loaded."));
    document.head.append(loader);
  });
  return monacoLoadPromise;
}

function renderCodingFallback(container, question) {
  const textarea = document.createElement("textarea");
  textarea.className = "ledger-input class-code-fallback";
  textarea.value = question.starterCode || "";
  container.replaceChildren(textarea);
}

function renderClassCoding(material) {
  for (const editor of classCodeEditors.values()) {
    editor.dispose();
  }
  classCodeEditors.clear();
  const questions = material.codingQuestions || [];
  classElements.codingPanel.hidden = !material.isCodingClass;
  if (!material.isCodingClass) {
    classElements.codingQuestions.replaceChildren();
    return;
  }
  if (!questions.length) {
    classElements.codingQuestions.replaceChildren(classEmpty("No coding questions imported."));
    return;
  }
  const cards = questions.map((question) => {
    const card = document.createElement("article");
    card.className = "class-coding-card";
    const title = document.createElement("strong");
    title.textContent = question.title;
    const prompt = document.createElement("p");
    prompt.textContent = question.prompt;
    const editorHost = document.createElement("div");
    editorHost.className = "class-code-editor";
    const actions = document.createElement("div");
    actions.className = "class-coding-actions";
    const reveal = document.createElement("button");
    reveal.className = "add-button";
    reveal.type = "button";
    reveal.textContent = "Reveal";
    const solution = document.createElement("p");
    solution.className = "class-answer";
    solution.hidden = true;
    solution.textContent = question.expectedSolution || "No solution included.";
    reveal.addEventListener("click", () => {
      solution.hidden = !solution.hidden;
      reveal.textContent = solution.hidden ? "Reveal" : "Hide";
    });
    actions.append(reveal);
    card.append(title, prompt, editorHost, actions, solution);
    if (question.testCases?.length) {
      const tests = document.createElement("ul");
      tests.className = "class-tests";
      for (const test of question.testCases) {
        const item = document.createElement("li");
        item.textContent = typeof test === "string"
          ? test
          : `${test.input || "input"} -> ${test.expectedOutput || test.expected || ""}`;
        tests.append(item);
      }
      card.append(tests);
    }
    requestAnimationFrame(() => {
      loadMonaco()
        .then((monaco) => {
          const editor = monaco.editor.create(editorHost, {
            value: question.starterCode || "",
            language: question.language || "javascript",
            theme: "vs-dark",
            minimap: { enabled: false },
            automaticLayout: true,
            fontSize: 13,
            lineNumbersMinChars: 3,
            scrollBeyondLastLine: false
          });
          classCodeEditors.set(question.id, editor);
        })
        .catch(() => renderCodingFallback(editorHost, question));
    });
    return card;
  });
  classElements.codingQuestions.replaceChildren(...cards);
}

function ClassSettingsModal() {
  classElements.managementList.replaceChildren(
    ...classState.classes.map((classItem) => {
      const row = document.createElement("div");
      row.className = "class-management-row";
      const input = document.createElement("input");
      input.className = "ledger-input";
      input.value = classItem.name;
      const actions = document.createElement("div");
      actions.className = "class-management-actions";
      const saveButton = document.createElement("button");
      saveButton.className = "add-button";
      saveButton.type = "button";
      saveButton.textContent = "Save";
      saveButton.addEventListener("click", () => {
        const nextName = input.value.trim();
        if (!nextName) {
          return;
        }
        classItem.material = materialForClass(classItem);
        classItem.name = nextName;
        classItem.material.className = nextName;
        saveClassState();
        renderClassPage();
        ClassSettingsModal();
      });
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-row";
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("aria-label", "Delete class");
      deleteButton.disabled = classState.classes.length === 1;
      deleteButton.addEventListener("click", () => {
        if (classState.classes.length === 1 || !window.confirm(`Delete ${classItem.name}?`)) {
          return;
        }
        classState.classes = classState.classes.filter((item) => item.id !== classItem.id);
        if (classState.activeClassId === classItem.id) {
          classState.activeClassId = classState.classes[0]?.id;
        }
        saveClassState();
        renderClassPage();
        ClassSettingsModal();
      });
      actions.append(saveButton, deleteButton);
      row.append(input, actions);
      return row;
    })
  );
}

function renderClassPage() {
  const classItem = activeClass();
  if (!classItem) {
    classElements.quizBody.replaceChildren(classEmpty("No class selected", "Use Settings to add a class."));
    return;
  }
  const material = materialForClass(classItem);
  classItem.material = material;
  ClassHeader(classItem, material);
  LearnCard(material);
  ContentSectionsCard(material);
  renderOpenQuestions(material);
  StudyPlanCard(material);
  renderClassCoding(material);
  renderTermsAndPractice(material);
}

function openClassSectionDialog(index = null) {
  const classItem = activeClass();
  if (!classItem) {
    return;
  }
  classItem.material = materialForClass(classItem);
  const sections = classItem.material.contentSections || [];
  const section = index === null ? null : sections[index];
  editingClassSectionIndex = index;
  classElements.sectionForm.reset();
  classElements.sectionDialogTitle.textContent = section ? "Edit Section" : "New Section";
  classElements.sectionForm.elements.title.value = section?.title || "";
  classElements.sectionForm.elements.content.value = section?.content || "";
  classElements.sectionDialog.showModal();
}

function moveClassSection(index, direction) {
  const classItem = activeClass();
  if (!classItem) {
    return;
  }
  classItem.material = materialForClass(classItem);
  const sections = classItem.material.contentSections || [];
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= sections.length) {
    return;
  }
  const [section] = sections.splice(index, 1);
  sections.splice(nextIndex, 0, section);
  saveClassState();
  ContentSectionsCard(classItem.material);
}

function deleteClassSection(index) {
  const classItem = activeClass();
  if (!classItem || !window.confirm("Delete this section?")) {
    return;
  }
  classItem.material = materialForClass(classItem);
  classItem.material.contentSections.splice(index, 1);
  saveClassState();
  ContentSectionsCard(classItem.material);
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

const spendingChartColors = [
  "#9ffcdf",
  "#86ead3",
  "#6dd8c5",
  "#58c4b6",
  "#52ada8",
  "#5597a1",
  "#5c859a",
  "#68768f",
  "#776f8a",
  "#887080",
  "#967a74",
  "#8a8b70",
  "#748f7b",
  "#668786"
];

function renderCategoryBreakdown(categoryTotals) {
  const sortedCategories = ledgerConfig.spending.categories
    .filter((category) => !["Set Category", "Extracted Value", "Tuition"].includes(category))
    .sort((a, b) => (categoryTotals[b] || 0) - (categoryTotals[a] || 0));

  summaryElements.categoryBreakdown.replaceChildren(
    ...sortedCategories
      .map((category, index) => {
        const row = document.createElement("div");
        row.className = "category-total";
        row.style.setProperty("--category-color", spendingChartColors[index % spendingChartColors.length]);
        row.append(document.createElement("span"));
        row.append(document.createElement("strong"));
        row.children[0].textContent = category;
        row.children[1].textContent = money(categoryTotals[category] || 0);
        return row;
      })
  );
}

const chartNamespace = "http://www.w3.org/2000/svg";

function chartElement(tagName, attributes = {}) {
  const element = document.createElementNS(chartNamespace, tagName);
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
  return element;
}

function donutArcPath(centerX, centerY, outerRadius, innerRadius, startAngle, endAngle) {
  const point = (radius, angle) => ({
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius
  });
  const outerStart = point(outerRadius, startAngle);
  const outerEnd = point(outerRadius, endAngle);
  const innerEnd = point(innerRadius, endAngle);
  const innerStart = point(innerRadius, startAngle);
  if (endAngle - startAngle >= Math.PI * 2 - 0.000001) {
    const outerMiddle = point(outerRadius, startAngle + Math.PI);
    const innerMiddle = point(innerRadius, startAngle + Math.PI);
    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 1 1 ${outerMiddle.x} ${outerMiddle.y}`,
      `A ${outerRadius} ${outerRadius} 0 1 1 ${outerStart.x} ${outerStart.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${innerRadius} ${innerRadius} 0 1 0 ${innerMiddle.x} ${innerMiddle.y}`,
      `A ${innerRadius} ${innerRadius} 0 1 0 ${innerStart.x} ${innerStart.y}`,
      "Z"
    ].join(" ");
  }
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z"
  ].join(" ");
}

function spreadChartLabels(labels, minimumY, maximumY) {
  if (!labels.length) {
    return;
  }

  const gap = Math.min(28, (maximumY - minimumY) / Math.max(1, labels.length - 1));
  labels.sort((a, b) => a.anchorY - b.anchorY);
  labels[0].labelY = Math.max(minimumY, labels[0].anchorY);

  for (let index = 1; index < labels.length; index += 1) {
    labels[index].labelY = Math.max(labels[index].anchorY, labels[index - 1].labelY + gap);
  }

  const overflow = labels.at(-1).labelY - maximumY;
  if (overflow > 0) {
    for (const label of labels) {
      label.labelY -= overflow;
    }
  }

  for (let index = labels.length - 2; index >= 0; index -= 1) {
    labels[index].labelY = Math.min(labels[index].labelY, labels[index + 1].labelY - gap);
  }
}

function renderDonut(categoryTotals, totalSpending) {
  const width = 430;
  const height = 340;
  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = 82;
  const innerRadius = 47;
  const categories = Object.entries(categoryTotals)
    .filter(([, amount]) => amount > 0)
    .sort(([, amountA], [, amountB]) => amountB - amountA);
  const svg = chartElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-labelledby": "spending-chart-title spending-chart-description"
  });
  const title = chartElement("title", { id: "spending-chart-title" });
  title.textContent = "Spending by category";
  const description = chartElement("desc", { id: "spending-chart-description" });
  description.textContent = categories.length && totalSpending > 0
    ? categories.map(([category, amount]) => `${category} ${((amount / totalSpending) * 100).toFixed(1)}%`).join(", ")
    : "No spending data";
  svg.append(title, description);

  if (totalSpending <= 0 || !categories.length) {
    svg.append(chartElement("circle", {
      cx: centerX,
      cy: centerY,
      r: outerRadius,
      fill: "rgba(255, 255, 255, 0.12)"
    }));
    svg.append(chartElement("circle", {
      cx: centerX,
      cy: centerY,
      r: innerRadius,
      fill: "var(--page)"
    }));
    summaryElements.donutChart.replaceChildren(svg);
    return;
  }

  let cursor = -Math.PI / 2;
  const labels = [];
  categories.forEach(([category, amount], index) => {
    const startAngle = cursor;
    const endAngle = cursor + (amount / totalSpending) * Math.PI * 2;
    const middleAngle = startAngle + (endAngle - startAngle) / 2;
    cursor = endAngle;

    svg.append(chartElement("path", {
      d: donutArcPath(centerX, centerY, outerRadius, innerRadius, startAngle, endAngle),
      fill: spendingChartColors[index % spendingChartColors.length],
      stroke: "var(--page)",
      "stroke-width": 1.5
    }));

    labels.push({
      category,
      percentage: (amount / totalSpending) * 100,
      side: Math.cos(middleAngle) >= 0 ? "right" : "left",
      anchorX: centerX + Math.cos(middleAngle) * (outerRadius - 2),
      anchorY: centerY + Math.sin(middleAngle) * (outerRadius - 2)
    });
  });

  spreadChartLabels(labels.filter((label) => label.side === "left"), 24, height - 24);
  spreadChartLabels(labels.filter((label) => label.side === "right"), 24, height - 24);

  for (const label of labels) {
    const isRight = label.side === "right";
    const elbowX = centerX + (isRight ? outerRadius + 16 : -outerRadius - 16);
    const lineEndX = isRight ? width - 7 : 7;
    const text = chartElement("text", {
      x: isRight ? width - 4 : 4,
      y: label.labelY - 2,
      "text-anchor": isRight ? "end" : "start",
      class: "donut-label"
    });
    const name = chartElement("tspan", { x: isRight ? width - 4 : 4 });
    name.textContent = label.category;
    const percentage = chartElement("tspan", {
      x: isRight ? width - 4 : 4,
      dy: 13,
      class: "donut-percentage"
    });
    percentage.textContent = `${label.percentage.toFixed(1)}%`;

    svg.append(chartElement("polyline", {
      points: `${label.anchorX},${label.anchorY} ${elbowX},${label.labelY} ${lineEndX},${label.labelY}`,
      class: "donut-leader-line"
    }));
    svg.append(chartElement("circle", {
      cx: label.anchorX,
      cy: label.anchorY,
      r: 2.6,
      class: "donut-leader-dot"
    }));
    text.append(name, percentage);
    svg.append(text);
  }

  summaryElements.donutChart.replaceChildren(svg);
}

function renderSummary(data) {
  const categoryTotals = {};
  let extractedValue = 0;
  let tuition = 0;
  const totalSpending = data.spending.reduce((total, row) => {
    const amount = numberValue(row.amount);
    if (row.category === "Extracted Value") {
      extractedValue += amount;
      categoryTotals[row.category] = (categoryTotals[row.category] || 0) + amount;
      return total;
    }
    if (row.category === "Tuition") {
      tuition += amount;
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
      !["Extracted Value", "Tuition"].includes(row.category)
        && inDateRange(row.date, currentBudget.startDate, currentBudget.endDate)
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
  summaryElements.tuition.textContent = money(tuition);
  summaryElements.totalIncome.textContent = money(totalIncome);
  summaryElements.gdpContribution.textContent = money(gdpContribution);
  renderCategoryBreakdown(categoryTotals);
  renderDonut(
    Object.fromEntries(Object.entries(categoryTotals).filter(([category]) => !["Extracted Value", "Tuition"].includes(category))),
    totalSpending
  );
}

function render(data) {
  financeData = { ...financeData, ...data };
  if (Array.isArray(data.plaidConnections)) {
    plaidConnections = data.plaidConnections;
  }
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
  renderAssets();
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
  const connectedCount = plaidConnections.filter((connection) => connection.status === "connected").length;
  const attentionCount = plaidConnections.filter((connection) => connection.status === "needs_attention").length;
  plaidReviewButton.hidden = count === 0;
  plaidReviewButton.textContent = count === 1 ? "Review 1 Plaid" : `Review ${count} Plaid`;
  plaidStatus.textContent = statusText || (
    count
      ? `${count} Plaid transaction${count === 1 ? "" : "s"} ready`
      : attentionCount
        ? `${connectedCount} connected · ${attentionCount} need attention`
      : linkedCount
        ? `${linkedCount} bank${linkedCount === 1 ? "" : "s"} linked`
        : plaidConfigured
          ? "No bank linked"
          : "Plaid not configured"
  );
}

function plaidAccountBalance(account, field) {
  const value = account?.balances?.[field];
  return value === null || value === undefined || value === "" ? null : numberValue(value);
}

function renderPlaidManager() {
  const accounts = financeData.plaidAccounts || [];
  const connections = plaidConnections.length ? plaidConnections : linkedPlaidItems.map((item) => ({
    ...item,
    status: "checking",
    accountCount: 0
  }));
  const connectedCount = connections.filter((connection) => connection.status === "connected").length;
  const attentionCount = connections.filter((connection) => connection.status === "needs_attention").length;
  const availableCash = accounts
    .filter((account) => account.type === "depository")
    .reduce((total, account) => total + cashBalanceForAccount(account), 0);
  const debt = accounts
    .filter((account) => account.type === "credit" || account.type === "loan")
    .reduce((total, account) => total + (plaidAccountBalance(account, "current") || 0), 0);

  plaidManagerOverview.textContent = attentionCount
    ? `${connectedCount} connected · ${attentionCount} need attention`
    : `${connectedCount} bank connection${connectedCount === 1 ? "" : "s"}`;
  plaidManagerStats.replaceChildren();
  for (const [label, value] of [
    ["Available cash", money(availableCash)],
    ["Credit & loan balance", money(debt)],
    ["Skipped", skippedPlaidTransactions.length]
  ]) {
    const stat = document.createElement("div");
    const name = document.createElement("span");
    const amount = document.createElement("strong");
    name.textContent = label;
    amount.textContent = value;
    stat.append(name, amount);
    plaidManagerStats.append(stat);
  }

  plaidManagerAccountStatus.textContent = plaidAccountsStatus || (
    accounts.length ? `${accounts.length} account${accounts.length === 1 ? "" : "s"}` : "No accounts loaded"
  );
  plaidSkippedButton.textContent = skippedPlaidTransactions.length
    ? `Skipped transactions (${skippedPlaidTransactions.length})`
    : "Skipped transactions";

  plaidAccountList.replaceChildren(
    ...accounts.map((account) => {
      const row = document.createElement("div");
      row.className = "plaid-account-row";

      const identity = document.createElement("div");
      identity.className = "plaid-account-identity";
      const name = document.createElement("strong");
      name.textContent = account.name || "Bank Account";
      const meta = document.createElement("span");
      meta.textContent = [
        account.institutionName,
        account.subtype || account.type
      ].filter(Boolean).join(" · ");
      identity.append(name, meta);

      const kind = document.createElement("span");
      kind.className = `plaid-account-kind plaid-account-kind-${account.type || "other"}`;
      kind.textContent = account.type === "credit" || account.type === "loan" ? "Owed" : "Balance";

      const balances = document.createElement("div");
      balances.className = "plaid-account-balances";
      for (const [label, value] of [
        ["Available", plaidAccountBalance(account, "available")],
        ["Current", plaidAccountBalance(account, "current")]
      ]) {
        const item = document.createElement("div");
        const caption = document.createElement("span");
        const amount = document.createElement("strong");
        caption.textContent = label;
        amount.textContent = value === null ? "—" : money(value);
        item.append(caption, amount);
        balances.append(item);
      }

      row.append(identity, kind, balances);
      return row;
    })
  );

  if (!accounts.length) {
    const empty = document.createElement("div");
    empty.className = "plaid-account-empty";
    empty.textContent = connections.length
      ? "Connected account balances are unavailable right now."
      : "Link a bank to see its accounts and balances here.";
    plaidAccountList.append(empty);
  }

  plaidConnectionList.replaceChildren(
    ...connections.map((connection) => {
      const row = document.createElement("div");
      row.className = "plaid-connection-row";

      const mark = document.createElement("span");
      mark.className = "plaid-connection-mark";
      mark.textContent = (connection.institutionName || "P").slice(0, 1).toUpperCase();

      const body = document.createElement("div");
      const name = document.createElement("strong");
      const detail = document.createElement("span");
      name.textContent = connection.institutionName || "Plaid connection";
      detail.textContent = connection.status === "connected"
        ? `${connection.accountCount} account${connection.accountCount === 1 ? "" : "s"} available`
        : connection.status === "needs_attention"
          ? "Reconnect this bank to restore access"
          : "Checking connection";
      body.append(name, detail);

      const status = document.createElement("span");
      status.className = `plaid-connection-status plaid-connection-status-${connection.status}`;
      status.textContent = connection.status === "connected"
        ? "Connected"
        : connection.status === "needs_attention"
          ? "Needs attention"
          : "Checking";

      row.append(mark, body, status);
      return row;
    })
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

async function syncPlaidTransactions(force = false) {
  if (plaidSyncPromise) {
    return plaidSyncPromise;
  }

  plaidStatus.textContent = force ? "Refreshing Plaid..." : "Checking saved Plaid data...";
  plaidSyncPromise = api(`/api/plaid/transactions/sync${force ? "?force=1" : ""}`, { method: "POST" })
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

function refreshPlaidAccounts(force = false) {
  if (plaidAccountsPromise) {
    return plaidAccountsPromise;
  }

  plaidAccountsStatus = force ? "Refreshing..." : "Loading saved balances...";
  if (plaidManagerDialog.open) {
    renderPlaidManager();
  }
  plaidAccountsPromise = api(`/api/plaid/accounts${force ? "?force=1" : ""}`)
    .then((result) => {
      financeData = { ...financeData, plaidAccounts: result.accounts || [] };
      plaidConnections = result.connections || [];
      plaidAccountsStatus = result.stale
        ? "Using last saved balances"
        : result.cached
          ? "Saved today"
          : "Updated now";
      renderDebt();
      renderAssets();
      renderPlaidButton(plaidStatusText);
      if (plaidManagerDialog.open) {
        renderPlaidManager();
      }
      if (assetsCashDialog?.open) {
        renderAssetsCashDialog();
      }
      return result;
    })
    .catch(() => {
      plaidAccountsStatus = "Refresh failed";
      if (plaidManagerDialog.open) {
        renderPlaidManager();
      }
      return null;
    })
    .finally(() => {
      plaidAccountsPromise = null;
    });

  return plaidAccountsPromise;
}

function refreshPlaidInvestments(force = false) {
  if (plaidInvestmentsPromise) return plaidInvestmentsPromise;
  assetsInvestmentStatus.textContent = force ? "Refreshing Plaid holdings..." : "Loading saved Plaid holdings...";
  plaidInvestmentsPromise = api(`/api/plaid/investments${force ? "?force=1" : ""}`)
    .then((result) => {
      financeData = {
        ...financeData,
        plaidInvestments: {
          accounts: result.accounts || [],
          holdings: result.holdings || [],
          securities: result.securities || []
        },
        plaidInvestmentsRefreshedOn: result.refreshedOn || financeData.plaidInvestmentsRefreshedOn || ""
      };
      assetsRenderedKey = "";
      renderAssets();
      if (result.stale && !(result.accounts || []).length && !(result.holdings || []).length) {
        assetsInvestmentStatus.textContent = "Plaid holdings are still preparing · refresh shortly";
      }
      return result;
    })
    .catch(() => {
      assetsInvestmentStatus.textContent = "Plaid holdings refresh failed";
      return null;
    })
    .finally(() => { plaidInvestmentsPromise = null; });
  return plaidInvestmentsPromise;
}

function loadPlaidScript() {
  if (window.Plaid) {
    return Promise.resolve(window.Plaid);
  }
  if (plaidScriptPromise) {
    return plaidScriptPromise;
  }

  plaidScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.plaid.com/link/v2/stable/link-initialize.js";
    script.onload = () => resolve(window.Plaid);
    script.onerror = () => reject(new Error("Plaid Link could not be loaded."));
    document.head.append(script);
  }).catch((error) => {
    plaidScriptPromise = null;
    throw error;
  });

  return plaidScriptPromise;
}

async function renderCurrent(options = {}) {
  const data = await api("/api/finance");
  if (!financeLedgerIsEditing()) {
    render(data);
  }

  if (options.syncPlaid) {
    syncPlaidTransactions(options.syncPlaid === "force").then(async (result) => {
      if (result) {
        const refreshedData = await api("/api/finance");
        if (!financeLedgerIsEditing()) {
          render(refreshedData);
        }
      }
    }).catch(() => {
      plaidStatusText = "Plaid check failed";
      renderPlaidButton(plaidStatusText);
    });
  }

  if (options.refreshPlaidAccounts) {
    refreshPlaidAccounts(options.refreshPlaidAccounts === "force");
  }
  if (options.refreshPlaidInvestments) {
    refreshPlaidInvestments(options.refreshPlaidInvestments === "force");
  }
}

function financeLedgerIsEditing() {
  return Boolean(document.activeElement?.closest('[data-page="finance"] [data-ledger-list]'));
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
  if (page === "class") {
    renderClassPage();
  }
  if (page === "assets") {
    requestAnimationFrame(renderAssetsGraphs);
  }
}

function pageFromHash() {
  return location.hash === "#budget"
    ? "budget"
    : location.hash === "#budget-builder"
      ? "budget-builder"
      : location.hash === "#debt"
        ? "debt"
        : location.hash === "#assets"
          ? "assets"
          : location.hash === "#work"
            ? "work"
            : location.hash === "#class"
              ? "class"
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

document.querySelector("[data-open-class-settings]").addEventListener("click", () => {
  ClassSettingsModal();
  classElements.settingsDialog.showModal();
});

document.querySelector("[data-close-class-settings]").addEventListener("click", () => {
  classElements.settingsDialog.close();
});

classElements.addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(classElements.addForm);
  const name = String(formData.get("name") || "").trim();
  if (!name) {
    return;
  }
  const classItem = createClass(name);
  classState.classes.push(classItem);
  classState.activeClassId = classItem.id;
  classElements.addForm.reset();
  saveClassState();
  renderClassPage();
  ClassSettingsModal();
  showClassStatus("Class added.");
});

document.querySelector("[data-copy-class-prompt]").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const classItem = activeClass();
  const original = button.textContent;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(classPromptText(classItem));
    } else {
      const field = document.createElement("textarea");
      field.value = classPromptText(classItem);
      document.body.append(field);
      await copyTextFromField(field);
      field.remove();
    }
    button.textContent = "Copied";
    showClassStatus("Prompt copied.");
  } catch (error) {
    button.textContent = "Copy failed";
  }
  setTimeout(() => {
    button.textContent = original;
  }, 1400);
});

function ImportJsonModal() {
  classElements.importJson.value = "";
  classElements.importStatus.textContent = "";
  classElements.importDialog.showModal();
  classElements.importJson.focus();
}

document.querySelector("[data-open-class-import]").addEventListener("click", () => {
  ImportJsonModal();
});

document.querySelector("[data-close-class-import]").addEventListener("click", () => {
  classElements.importDialog.close();
});

classElements.importForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const classItem = activeClass();
  if (!classItem) {
    return;
  }
  try {
    const parsed = JSON.parse(classElements.importJson.value);
    const material = validateClassMaterial(parsed);
    classItem.material = material;
    classItem.name = material.className || classItem.name;
    resetClassQuiz(material);
    saveClassState();
    classElements.importDialog.close();
    renderClassPage();
    showClassStatus("Class material imported.");
  } catch (error) {
    classElements.importStatus.textContent = error.message || "Invalid JSON.";
  }
});

document.querySelector("[data-class-restart]").addEventListener("click", () => {
  const classItem = activeClass();
  if (!classItem) {
    return;
  }
  const material = materialForClass(classItem);
  resetClassQuiz(material);
  LearnCard(material);
});

document.querySelector("[data-class-shuffle]").addEventListener("click", () => {
  const classItem = activeClass();
  if (!classItem) {
    return;
  }
  const material = materialForClass(classItem);
  shuffleClassQuiz(material);
  LearnCard(material);
});

document.querySelector("[data-add-class-section]").addEventListener("click", () => openClassSectionDialog());

document.querySelector("[data-close-class-section]").addEventListener("click", () => {
  editingClassSectionIndex = null;
  classElements.sectionDialog.close();
});

classElements.sectionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const classItem = activeClass();
  if (!classItem) {
    return;
  }
  classItem.material = materialForClass(classItem);
  const formData = new FormData(classElements.sectionForm);
  const section = {
    id: editingClassSectionIndex === null
      ? `${Date.now()}-${Math.random().toString(16).slice(2)}`
      : classItem.material.contentSections[editingClassSectionIndex]?.id,
    title: String(formData.get("title") || "").trim(),
    content: String(formData.get("content") || "").trim()
  };
  if (!section.title) {
    return;
  }
  if (!Array.isArray(classItem.material.contentSections)) {
    classItem.material.contentSections = [];
  }
  if (editingClassSectionIndex === null) {
    classItem.material.contentSections.push(section);
  } else {
    classItem.material.contentSections[editingClassSectionIndex] = section;
  }
  editingClassSectionIndex = null;
  saveClassState();
  classElements.sectionDialog.close();
  ContentSectionsCard(classItem.material);
  showClassStatus("Section saved.");
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
  renderSankeySimulationList();
  financeSankeyDialog.showModal();
  requestAnimationFrame(() => renderFinanceSankey());
});

document.querySelector("[data-close-finance-sankey]").addEventListener("click", () => {
  financeSankeyDialog.close();
});

document.querySelector("[data-open-assets-cash]").addEventListener("click", () => {
  renderAssetsCashDialog();
  assetsCashDialog.showModal();
});

document.querySelector("[data-close-assets-cash]").addEventListener("click", () => {
  assetsCashDialog.close();
});

function syncAssetsNormalizeButton() {
  assetsNormalizeButton.classList.toggle("is-active", assetsTuitionNormalized);
  assetsNormalizeButton.setAttribute("aria-pressed", String(assetsTuitionNormalized));
  assetsNormalizeButton.title = assetsTuitionNormalized
    ? "Restore tuition to spending analytics"
    : "Exclude tuition from spending analytics";
}

syncAssetsNormalizeButton();
assetsNormalizeButton.addEventListener("click", () => {
  assetsTuitionNormalized = !assetsTuitionNormalized;
  localStorage.setItem(assetsTuitionNormalizedKey, String(assetsTuitionNormalized));
  syncAssetsNormalizeButton();
  renderAssets();
});

for (const button of assetsRangeButtons) {
  button.addEventListener("click", () => {
    assetsChartRange = button.dataset.assetsRange;
    for (const rangeButton of assetsRangeButtons) {
      const isActive = rangeButton === button;
      rangeButton.classList.toggle("is-active", isActive);
      rangeButton.setAttribute("aria-pressed", String(isActive));
    }
    renderAssets();
  });
}

document.querySelector("[data-open-sankey-simulation]").addEventListener("click", () => {
  sankeySimulationForm.reset();
  sankeySimulationLedger.value = "income";
  sankeySimulationMode.value = "existing";
  updateSankeySimulationCategories();
  updateSankeySimulationMode();
  renderSankeySimulationList();
  sankeySimulationDialog.showModal();
});

document.querySelector("[data-close-sankey-simulation]").addEventListener("click", () => {
  sankeySimulationDialog.close();
});

document.querySelector("[data-close-sankey-transactions]").addEventListener("click", () => {
  sankeyTransactionsDialog.close();
});

sankeySimulationEnabledInput.addEventListener("change", () => {
  sankeySimulationEnabled = sankeySimulationEnabledInput.checked;
  saveSankeySimulationEnabled();
  renderSankeySimulationList();
  renderFinanceSankey();
});

sankeySimulationLedger.addEventListener("change", () => {
  updateSankeySimulationCategories();
});

sankeySimulationMode.addEventListener("change", () => {
  updateSankeySimulationMode();
});

sankeySimulationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(sankeySimulationForm);
  const ledger = formData.get("ledger") === "spending" ? "spending" : "income";
  const mode = formData.get("mode") === "label" ? "label" : "existing";
  const category = mode === "label"
    ? String(formData.get("label") || "").trim()
    : String(formData.get("category") || "").trim();
  const amount = numberValue(formData.get("amount"));
  if (!category || amount <= 0) {
    return;
  }
  sankeySimulations = [
    ...sankeySimulations,
    {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      ledger,
      category,
      amount: formatNumber(amount)
    }
  ];
  sankeySimulationEnabled = true;
  saveSankeySimulations();
  saveSankeySimulationEnabled();
  sankeySimulationForm.reset();
  sankeySimulationLedger.value = ledger;
  sankeySimulationMode.value = mode;
  updateSankeySimulationCategories();
  updateSankeySimulationMode();
  renderSankeySimulationList();
  renderFinanceSankey();
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
  plaidManagerDialog.close();
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
plaidManagerButton.addEventListener("click", () => {
  renderPlaidManager();
  plaidManagerDialog.showModal();
  refreshPlaidAccounts();
});
refreshPlaidAccountsButton.addEventListener("click", () => refreshPlaidAccounts(true));

async function openPlaidLink(purpose, button) {
  const isInvestment = purpose === "investments";
  button.disabled = true;
  plaidManagerDialog.close();
  plaidStatus.textContent = isInvestment ? "Starting investment link..." : "Starting Plaid...";
  if (isInvestment) assetsInvestmentStatus.textContent = "Starting Plaid investment link...";

  try {
    const tokenResult = await api("/api/plaid/link-token", {
      method: "POST",
      body: JSON.stringify({ purpose })
    });
    if (!tokenResult.configured) {
      plaidStatusText = "Plaid not configured";
      renderPlaidButton(plaidStatusText);
      return;
    }

    await loadPlaidScript();
    if (!window.Plaid) {
      throw new Error("Plaid Link unavailable");
    }

    const handler = window.Plaid.create({
      token: tokenResult.linkToken,
      onSuccess: async (publicToken, metadata) => {
        try {
          plaidStatus.textContent = isInvestment ? "Linking investment account..." : "Linking bank...";
          const exchangeResult = await api("/api/plaid/exchange-token", {
            method: "POST",
            body: JSON.stringify({ publicToken, metadata })
          });
          linkedPlaidItems = exchangeResult.linkedItems || [];
          plaidStatusText = "";
          await renderCurrent({
            syncPlaid: isInvestment ? false : "force",
            refreshPlaidAccounts: "force",
            refreshPlaidInvestments: "force"
          });
        } catch (error) {
          plaidStatusText = "Plaid Link failed";
          renderPlaidButton(plaidStatusText);
        } finally {
          button.disabled = false;
        }
      },
      onExit: () => {
        button.disabled = false;
        if (isInvestment) renderInvestmentPortfolio();
        renderPlaidButton(plaidStatusText);
      }
    });

    handler.open();
    plaidStatus.textContent = "Plaid Link open";
  } catch (error) {
    plaidStatusText = "Plaid Link failed";
    renderPlaidButton(plaidStatusText);
  } finally {
    button.disabled = false;
  }
}

linkBankButton.addEventListener("click", () => openPlaidLink("banking", linkBankButton));
linkInvestmentButton.addEventListener("click", () => openPlaidLink("investments", linkInvestmentButton));

document.querySelector("[data-close-plaid]").addEventListener("click", () => {
  plaidDialog.close();
});

document.querySelector("[data-close-plaid-manager]").addEventListener("click", () => {
  plaidManagerDialog.close();
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

let assetsResizeFrame = null;
window.addEventListener("resize", () => {
  if (document.querySelector('[data-page="assets"]')?.hidden || assetsResizeFrame) {
    return;
  }
  assetsResizeFrame = requestAnimationFrame(() => {
    assetsResizeFrame = null;
    renderAssetsGraphs();
  });
});

const initialPage = pageFromHash();
showPage(initialPage);
renderCurrent({
  syncPlaid: initialPage === "finance",
  refreshPlaidAccounts: true,
  refreshPlaidInvestments: true
});
