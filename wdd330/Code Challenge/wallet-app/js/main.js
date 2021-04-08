import { buildNavigation , loadHome} from './routing.js';
const navElement = document.getElementById('primaryNav');
buildNavigation(navElement);
loadHome();
//const myHomeController = new HomeController('#categoryList');
// myQuakesController.getQuakesByRadius();