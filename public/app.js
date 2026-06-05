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
const plaidDialog = document.querySelector("[data-plaid-dialog]");
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
const summaryElements = {
  totalSpending: document.querySelector("[data-total-spending]"),
  extractedValue: document.querySelector("[data-extracted-value]"),
  totalIncome: document.querySelector("[data-total-income]"),
  gdpContribution: document.querySelector("[data-gdp-contribution]"),
  categoryBreakdown: document.querySelector("[data-category-breakdown]"),
  donutChart: document.querySelector("[data-donut-chart]")
};
let financeData = { spending: [], income: [], budgets: [], loans: [], graduationDate: "" };
let editingBudgetId = null;
let deletingBudgetId = null;
let pendingPlaidTransactions = [];
let activePlaidIndex = 0;
let plaidStatusText = "";
let linkedPlaidItems = [];
let plaidConfigured = false;
let plaidSyncPromise = null;
let categoryLedger = "spending";

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

function normalizeDateText(value, defaultYear = "2026") {
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

  const bar = document.createElement("div");
  bar.className = "budget-stack-track";
  const categoryTotal = parts.categories.reduce((total, row) => (
    total + Math.max(row.allowed, row.spent)
  ), 0);
  const incomeTotal = parts.income ? Math.max(parts.income.required, parts.income.made) : 0;
  const total = categoryTotal + incomeTotal;

  for (const row of parts.categories) {
    bar.append(budgetSegment("spent", row.spent, total, `${row.category} spent ${formatNumber(row.spent)}`));
    bar.append(budgetSegment("spending-left", row.left, total, `${row.category} left ${formatNumber(row.left)}`));
    bar.append(budgetSegment("over-spent", row.over, total, `${row.category} over ${formatNumber(row.over)}`));
  }

  if (parts.income) {
    bar.append(budgetSegment("income-made", parts.income.made, total, `Income made ${formatNumber(parts.income.made)}`));
    bar.append(budgetSegment("income-left", parts.income.left, total, `Income needed ${formatNumber(parts.income.left)}`));
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

  wrapper.append(bar);
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
        row.children[1].textContent = formatNumber(categoryTotals[category] || 0);
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

  summaryElements.totalSpending.textContent = formatNumber(totalSpending);
  summaryElements.extractedValue.textContent = formatNumber(extractedValue);
  summaryElements.totalIncome.textContent = formatNumber(totalIncome);
  summaryElements.gdpContribution.textContent = formatNumber(gdpContribution);
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
  linkedPlaidItems = data.plaidItems || linkedPlaidItems || [];
  plaidConfigured = Boolean(data.plaidConfigured);
  renderSummary(data);
  renderLedger("spending", data.spending);
  renderLedger("income", data.income);
  renderBudgets();
  renderDebt();
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

async function syncPlaidTransactions() {
  if (plaidSyncPromise) {
    return plaidSyncPromise;
  }

  plaidStatus.textContent = "Checking Plaid...";
  plaidSyncPromise = api("/api/plaid/transactions/sync", { method: "POST" })
    .then((result) => {
      pendingPlaidTransactions = result.pending || [];
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

for (const link of pageLinks) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(link.dataset.pageLink);
    if (link.dataset.pageLink === "finance") {
      renderCurrent({ syncPlaid: true });
    }
  });
}

document.querySelector("[data-open-budget]").addEventListener("click", () => openBudgetForm());

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

plaidReviewButton.addEventListener("click", () => openPlaidReview());

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

  pendingPlaidTransactions = result.pending || [];
  render(await api("/api/finance"));
  openPlaidReview(Math.min(activePlaidIndex, pendingPlaidTransactions.length - 1));
});

const initialPage = location.hash === "#budget" ? "budget" : location.hash === "#debt" ? "debt" : "finance";
showPage(initialPage);
renderCurrent({ syncPlaid: initialPage === "finance" });
