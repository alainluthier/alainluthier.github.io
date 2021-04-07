import CategoryController from './categoryController.js';
import ExpenseController from './expenseController.js';
import IncomeController from './incomeController.js';
import HomeController from './homeController.js';
import ReportController from './reportController.js';
const routes = [
  {
    controller: new HomeController('#result'),
    file: './views/home.html',
    label: 'Home'
  },
  {
    controller: new CategoryController('#categoryList',"#category"),
    file: './views/categoryList.html',
    label: 'Categories'
  },
  {
    controller: new IncomeController('#incomeList',"#income"),
    file: './views/incomeList.html',
    label: 'Incomes'
  },
  {
    controller: new ExpenseController('#expenseList',"#expense"),
    file: './views/expenseList.html',
    label: 'Expenses'
  }
  ,
  {
    controller: new ReportController('#report','#total'),
    file: './views/report.html',
    label: 'Reports'
  }
];
// function to create a navigation for the items found in routes.
// creates element, add a touchend event listener and appends it to parent
export function loadHome(){
  insertViewAsync(getViewAsync(routes[0].file), routes[0].controller);
}
export function buildNavigation(parent) {
  routes.forEach(route => {
    let item = document.createElement('li');
    item.innerHTML = `<a href="#${route.label}">${route.label}</a>`;
    parent.appendChild(item);
    addNavEventAsync(item, route.file, route.controller);
  });
}

// makes an AJAX request for the html file found at viewPath and returns it as text
async function getViewAsync(viewPath) {
  try {
    const response = await fetch(viewPath);
    const text = await response.text();
    return text;
  } catch (err) {
    
    console.log('Something went wrong', err);
  }
}

// adds a touchend event to element that will insert the view found at path into the content area of the index.html
function addNavEventAsync(element, path, controller) {
  // adding both a touch and mouse event.  Notice the e.preventDefault(); If the touch event fires prevent default will keep the click event from firing.
  element.addEventListener('touchend', e => {
    insertViewAsync(getViewAsync(path), controller);
    e.preventDefault();
  });
  // this event won't fire if the touch event did.
  element.addEventListener('click', e => {
    insertViewAsync(getViewAsync(path), controller);
  });
}

// inserts the view into the content area of index.html
// remember that getView returns a promise!
// runs a function from the controller to load any dynamic elements
async function insertViewAsync(viewPromise, controller) {
  const contentElement = document.getElementById('content');
  //debugger;
  contentElement.innerHTML = await viewPromise;
  controller.init();
}