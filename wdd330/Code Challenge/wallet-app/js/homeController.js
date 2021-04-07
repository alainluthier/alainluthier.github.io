import Expense from "./expense.js";
import HomeView from "./homeView.js";
import Income from "./income.js";
// Category controller
export default class HomeController {
  constructor(parent) {
    this.parent = parent;
    this.parentElement = null;
    this.incomes = new Income();
    this.expenses = new Expense();
    this.homeview = new HomeView();
  }
  async init() {
    this.parentElement = document.querySelector(this.parent);
    this.getTotal();
   
  }
  async getTotal() {
    this.parentElement.innerHTML = '<li>Loading...</li>';

    const incomeList = await this.incomes.getIncomes();
    const expenseList = await this.expenses.getExpenses();

    let totalIncome = incomeList.reduce((a, b) => a + (b['amount'] || 0), 0);
    let totalExpense = expenseList.reduce((a, b) => a + (b['amount'] || 0), 0);
    // render the list to html
    console.log(this.parentElement);
    this.homeview.renderHome({
      "income":totalIncome,
      "expense":totalExpense,
      "difference":totalIncome-totalExpense
    }, this.parentElement);
  }
}