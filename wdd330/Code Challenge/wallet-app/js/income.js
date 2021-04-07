import { getJSON, postJSON, deleteJSON,putJSON } from './utilities.js';
// Model
export default class Income {
  constructor() {
    this.baseUrl =
      'https://606b52fdf8678400172e6159.mockapi.io/api/';
    this._incomes = [];
  }
  async getIncomes() {
    this._incomes = await getJSON(
      this.baseUrl +`/income`);
    return this._incomes;
  }
  async postIncome(data){
    let income = await postJSON(
      this.baseUrl +`/income`,data);
    return income;
  }
  async deleteIncome(id){
    let income = await deleteJSON(
      this.baseUrl +`/income`,id);
    return income;
  }
  async putIncome(data){
    let income = await putJSON(
      this.baseUrl +`/income`,data);
    return income;
  }
  getIncomeById(id) {
    return this._incomes.filter(item => item.id === id)[0];
  }
}