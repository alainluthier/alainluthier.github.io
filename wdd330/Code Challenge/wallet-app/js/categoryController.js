import Category from './category.js';
import CategoriesView from './categoryView.js';

// Category controller
export default class CategoryController {
  constructor(parent) {
    this.parent = parent;
    this.parentElement = null;
    this.categories = new Category();
    this.categoriesView = new CategoriesView();
  }
  async init() {
    this.parentElement = document.querySelector(this.parent+ " tbody");
    this.getCategories();
  }
  async getCategories() {
    this.parentElement.innerHTML = '<li>Loading...</li>';
    
    const categoryList = await this.categories.getCategories();
    
    // render the list to html
    console.log(this.parentElement);
    this.categoriesView.renderCategoryList(categoryList, this.parentElement);
    // add a listener to the new list of categories to allow drill down in to the details
    this.parentElement.addEventListener('touchend', e => {
      console.log('event');
      if(e.target.dataset.id != undefined){
        console.log(e.target.dataset.id);
        this.postCategory();
      }
      //this.getCategoryDetails(e.target.dataset.id);
    });
  }
  async postCategory(){
    const category = await this.categories.postCategory(
      {'name':'Test 12345',
      'type':'Income'  
    }
    );
    console.log(category);
  }
  async getCategoryDetails(categoryId) {
    const category = this.categories.getCategoryById(categoryId);
    this.categoriesView.renderCategory(category, this.parentElement);
  }
}