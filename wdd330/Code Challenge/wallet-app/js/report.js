import { getJSON, postJSON, deleteJSON,putJSON } from './utilities.js';
// Model
export default class Report {
  constructor() {
    this.baseUrl =
      'https://606b52fdf8678400172e6159.mockapi.io/api/';
    this._reports = [];
  }
  async getReports() {
    this._reports = await getJSON(
      this.baseUrl +`/report`);
    return this._reports;
  }
}