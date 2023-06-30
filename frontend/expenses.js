async function postExpenses(e) {
  e.preventDefault();
  const description = e.target.description.value;
  const category = e.target.category.value;
  const amount = e.target.amount.value;

  const obj = {
    description,
    category,
    amount,
  };
  try {
  const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/add/expenses",
        obj,
        { headers: { "Authorization": token } }
      );
    showListOnScreen(response.data.expenses);

    for (var i = 0; i < response.data.length; i++) {
      showListOnScreen(response.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
}
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/get/expenses",{headers:{"Authorization":token}});

    for (var i = 0; i < response.data.expenses.length; i++) {
      showListOnScreen(response.data.expenses[i]);
    }
  } catch (err) {
    console.log(err);
  }
});
function showListOnScreen(expenses) {
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  const parentNode = document.getElementById("listOfExpenses");
  const childHTML = `<li id=${expenses.id}> ${expenses.description} - ${expenses.category} -${expenses.amount}
                    <button onclick=deleteExpenses('${expenses.id}')> Delete Expense </button>
                    </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
async function deleteExpenses(id) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/delete/expenses/${id}`
    );
    removeExpensesFromScreen(id);
  } catch (err) {
    console.log(err);
  }
}
function removeExpensesFromScreen(id) {
  const parentNode = document.getElementById("listOfExpenses");
  const childToBeDelete = document.getElementById(id);

  parentNode.removeChild(childToBeDelete);
}
