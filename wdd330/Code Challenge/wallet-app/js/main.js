import CategoryController from './categoryController.js';
import buildNavigation from './routing.js';

const navElement = document.getElementById('primaryNav');
buildNavigation(navElement);

const myCategoryController = new CategoryController('#categoryList');
// myQuakesController.getQuakesByRadius();