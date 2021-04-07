import { getJSON, postJSON, deleteJSON,putJSON } from './utilities.js';
// Model
export default class Expense {
  constructor() {
    this.baseUrl =
      'https://606b52fdf8678400172e6159.mockapi.io/api/';
    this._expenses = [];
  }
  async getExpenses() {
    this._expenses = await getJSON(
      this.baseUrl +`/expense`);
    return this._expenses;
  }
  async postExpense(data){
    let expense = await postJSON(
      this.baseUrl +`/expense`,data);
    return expense;
  }
  async deleteExpense(id){
    let expense = await deleteJSON(
      this.baseUrl +`/expense`,id);
    return expense;
  }
  async putExpense(data){
    let expense = await putJSON(
      this.baseUrl +`/expense`,data);
    return expense;
  }
  getExpenseById(id) {
    return this._expenses.filter(item => item.id === id)[0];
  }
}