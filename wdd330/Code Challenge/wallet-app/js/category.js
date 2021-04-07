import { getJSON, postJSON, deleteJSON,putJSON } from './utilities.js';
// Model
export default class Category {
  constructor() {
    this.baseUrl =
      'https://606b52fdf8678400172e6159.mockapi.io/api/';
    this._categories = [];
  }
  async getCategories() {
    this._categories = await getJSON(
      this.baseUrl +`/category`);
    return this._categories;
  }
  async getCategoriesByType(type) {
    this._categories = await getJSON(
      this.baseUrl +`/category`);
    return this._categories.filter(e=>{if(e.type==type) return e;});
  }
  async postCategory(data){
    let category = await postJSON(
      this.baseUrl +`/category`,data);
    return category;
  }
  async deleteCategory(id){
    let category = await deleteJSON(
      this.baseUrl +`/category`,id);
    return category;
  }
  async putCategory(data){
    let category = await putJSON(
      this.baseUrl +`/category`,data);
    return category;
  }
  getCategoryById(id) {
    return this._categories.filter(item => item.id === id)[0];
  }
}