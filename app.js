const totalFundsInput = document.querySelector("#total-funds");
const remainingFundsDisplay = document.querySelector("#remaining-funds");
const expenseNameInput = document.querySelector("#expense-name");
const expenseValueInput = document.querySelector("#expense-value");
const valueBtn = document.querySelector("#btn-value");
const expenseList = document.querySelector("#expense-list");
const clearListBtn = document.querySelector("#clear-list");
const totalAmountDisplay = document.querySelector("#total-amount");

// Array to store expense values
let expenses = [];
let totalFunds = 0;

// Update remaining funds display
function updateRemainingFunds() {
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0);
  const remainingFunds = totalFunds - totalExpenses;
  remainingFundsDisplay.textContent = `Remaining Funds: $${remainingFunds.toFixed(
    2
  )}`;
  if (remainingFunds < 0) {
    remainingFundsDisplay.style.color = "red";
  } else {
    remainingFundsDisplay.style.color = "green";
  }
}

// Handle total funds input
totalFundsInput.addEventListener("input", () => {
  totalFunds = parseFloat(totalFundsInput.value) || 0;
  updateRemainingFunds();
});

// Add expense logic
valueBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const expenseName = expenseNameInput.value.trim();
  const expenseValue = parseFloat(expenseValueInput.value.trim());

  if (expenseName && !isNaN(expenseValue) && expenseValue > 0) {
    // Create a new list item
    const listItem = document.createElement("li");
    listItem.textContent = `${expenseName}: $${expenseValue.toFixed(2)}`;

    // Add delete functionality
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = " ❌";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => {
      listItem.remove();
      expenses = expenses.filter((exp) => exp !== expenseValue);
      updateRemainingFunds();
      updateTotalExpenses();
    });

    listItem.appendChild(deleteBtn);
    expenseList.appendChild(listItem);

    // Add expense to the array
    expenses.push(expenseValue);

    // Update totals
    updateRemainingFunds();
    updateTotalExpenses();

    // Clear input fields
    expenseNameInput.value = "";
    expenseValueInput.value = "";
  } else {
    alert("Please enter a valid expense name and value.");
  }
});

// Clear list button logic
clearListBtn.addEventListener("click", function () {
  expenseList.innerHTML = "";
  expenses = [];
  updateRemainingFunds();
  updateTotalExpenses();
});

// Update total expenses
function updateTotalExpenses() {
  const total = expenses.reduce((acc, curr) => acc + curr, 0);
  totalAmountDisplay.textContent = `Total Expenses: $${total.toFixed(2)}`;
}
