import Expense from './expense.js';
import ExpensesView from './expenseView.js';
import Category from './category.js'

// Expense controller
export default class ExpenseController {
  constructor(parent, single) {
    this.parent = parent;
    this.parentElement = null;
    this.single = single;
    this.singleElement = null;
    this.expenses = new Expense();
    this.categories = new Category();
    this.expensesView = new ExpensesView();
  }
  clear(){
    let today = new Date();
    document.getElementById("date").value = today.toISOString().substr(0, 10);
    document.getElementById("description").value="";
    document.getElementById("amount").value=0;
  }
  async init() {
    this.parentElement = document.querySelector(this.parent + " tbody");
    this.singleElement = document.getElementById(this.single);
    this.singleElement.style.display = "none";
    this.getExpenses();
    document.getElementById("new").addEventListener('click', e => {
      document.getElementById("title").innerHTML = "Add Expense";
      this.clear();
      if (this.singleElement.style.display === "none") {
        this.singleElement.style.display = "block";
        document.getElementById("expenses").style.display = "none";
      } else {
        this.singleElement.style.display = "none";
        document.getElementById("expenses").style.display = "block";
      }
    });
    document.getElementById("back").addEventListener('click', e => {
      if (this.singleElement.style.display === "none") {
        this.hide();
      } else {
        this.show();
      }
    });
    document.getElementById("save").addEventListener('click', e => {
      if (document.getElementById("title").innerText === "Add Expense") {
        this.postExpense({
          'dateExpense': document.getElementById("date").value,
          'category': JSON.parse(document.getElementById("category").value),
          'description': document.getElementById("description").value,
          'amount': parseFloat(document.getElementById("amount").value)
        }).then(e => {
          console.log(e);
          this.parentElement.innerHTML = this.parentElement.innerHTML +
            `<tr>
            <td>${e.id}</td>
            <td>${e.dateExpense}</td>
            <td>${e.category.name}</td>
            <td>${e.description}</td>
            <td class="right-align">${e.amount}</td>
          <td>
            <a data-id=${e.id} data-json=${JSON.stringify(e)} class="button primary edit" ">Edit</a>
            <a class="button primary delete" >Delete</a>
          </td>
        </tr>`;
        });
      } else {
        let index = document.getElementById("save").getAttribute("idxcat");
        let id = document.getElementById("save").getAttribute("idcat");
        this.putExpense({
          'id': id,
          'dateExpense': document.getElementById("date").value,
          'category': JSON.parse(document.getElementById("category").value),
          'description': document.getElementById("description").value,
          'amount': parseFloat(document.getElementById("amount").value)
        }).then(e => {
          console.log("param id:");
          let x = this.parentElement.rows[index].cells;
          x[1].innerHTML = e.dateExpense;
          x[2].innerHTML = e.category.name;
          x[3].innerHTML = e.description;
          x[4].innerHTML = e.amount;
          x[5].innerHTML = `<a data-id=${e.id} data-action="edit" data-json='${JSON.stringify(e)}' class="button primary edit" ">Edit</a>
          <a data-id=${e.id} data-action="delete" class="button primary delete" >Delete</a>`;
        });
      }
      this.show();
    });
    this.categories.getCategoriesByType("Expense").then(e => {
      console.log("Expenses type:");
      console.log(e);
      let options = '';
      e.forEach(i => {
        options = options + `<option value='${JSON.stringify(i)}'>${i.name}</option>`
      })
      document.getElementById("category").innerHTML =
        document.getElementById("category").innerHTML + options;
    });
  }
  hide(id, idx) {
    this.singleElement.style.display = "block";
    document.getElementById("save").setAttribute("idcat", id);
    document.getElementById("save").setAttribute("idxcat", idx)
    document.getElementById("expenses").style.display = "none";
  }
  show() {
    this.singleElement.style.display = "none";
    document.getElementById("expenses").style.display = "block";
  }
  async getExpenses() {
    this.parentElement.innerHTML = '<li>Loading...</li>';

    const expenseList = await this.expenses.getExpenses();

    // render the list to html
    console.log(this.parentElement);
    this.expensesView.renderExpenseList(expenseList, this.parentElement);
    // add a listener to the new list of expenses to allow drill down in to the details
    this.parentElement.addEventListener('click', e => {
      console.log('event');
      if (e.target.dataset.id != undefined) {
        if (e.target.dataset.action === "edit") {
          console.log("Edit:" + e.target.dataset.id);
          this.hide(e.target.dataset.id, e.target.parentNode.parentNode.rowIndex - 1);
          let expense = JSON.parse(e.target.dataset.json);
          console.log(expense.dateExpense);
          document.getElementById("title").innerHTML = "Edit Expense";
          document.getElementById("date").value = expense.dateExpense;
          document.getElementById("category").value = JSON.stringify(expense.category);
          document.getElementById("description").value = expense.description;
          document.getElementById("amount").value = expense.amount;
        } else {
          var r = confirm("Are you sure to delete?");
          if (r == true) {
            console.log("Delete:" + e.target.dataset.id);
            this.deleteExpense(e.target.dataset.id).then(a => {
              this.parentElement.deleteRow(e.target.parentNode.parentNode.rowIndex - 1);
            });
          }
        }
      }
      //this.getExpenseDetails(e.target.dataset.id);
    });
  }
  async postExpense(data) {
    const expense = await this.expenses.postExpense(
      data
    );
    return expense;
  }
  async putExpense(data) {
    const expense = await this.expenses.putExpense(
      data
    );
    return expense;
  }
  async deleteExpense(id) {
    const expense = await this.expenses.deleteExpense(
      id
    );
    return expense;
  }
  async getExpenseDetails(expenseId) {
    const expense = this.expenses.getExpenseById(expenseId);
    this.expensesView.renderExpense(expense, this.parentElement);
  }
}