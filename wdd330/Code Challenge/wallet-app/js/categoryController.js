import Category from './category.js';
import CategoriesView from './categoryView.js';

// Category controller
export default class CategoryController {
  constructor(parent, single) {
    this.parent = parent;
    this.parentElement = null;
    this.single = single;
    this.singleElement = null;
    this.categories = new Category();
    this.categoriesView = new CategoriesView();
  }
  clear(){

    document.getElementById("name").value="";
  }
  async init() {
    this.parentElement = document.querySelector(this.parent + " tbody");
    this.singleElement = document.getElementById(this.single);
    this.singleElement.style.display = "none";
    this.getCategories();
    document.getElementById("new").addEventListener('click', e => {
      document.getElementById("title").innerHTML = "Add Category";
      this.clear();
      if (this.singleElement.style.display === "none") {
        this.singleElement.style.display = "block";
        document.getElementById("categories").style.display = "none";
      } else {
        this.singleElement.style.display = "none";
        document.getElementById("categories").style.display = "block";
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
      if(document.getElementById("title").innerText==="Add Category"){
        this.postCategory({
          'name': document.getElementById("name").value,
          'type': document.getElementById("type").value
        }).then(e => {
          console.log(e);
          this.parentElement.innerHTML = this.parentElement.innerHTML +
            `<tr>
          <td>${e.id}</td>
          <td>${e.name}</td>
          <td>${e.type}</td>
          <td>
          <a data-id=${e.id} data-action="edit" data-name=${e.name} data-type=${e.type} class="button primary edit" ">Edit</a>
          <a data-id=${e.id} data-action="delete" class="button primary delete" >Delete</a>
          </td>
        </tr>`;
        });
      }else{
        let index = document.getElementById("save").getAttribute("idxcat");
        let id = document.getElementById("save").getAttribute("idcat");
        console.log(id);
        this.putCategory({
          'id': id,
          'name': document.getElementById("name").value,
          'type': document.getElementById("type").value
        }).then(e => {
          console.log("param id:");
          let x = this.parentElement.rows[index].cells;
          x[1].innerHTML=e.name;
          x[2].innerHTML=e.type;
          x[3].innerHTML=`<a data-id=${e.id} data-action="edit" data-name=${e.name} data-type=${e.type} class="button primary edit" ">Edit</a>
            <a data-id=${e.id} data-action="delete" class="button primary delete" >Delete</a>`;
        });
      }
      this.show();
    });
  }
  hide(id,idx) {
    this.singleElement.style.display = "block";
    document.getElementById("save").setAttribute("idcat",id);
    document.getElementById("save").setAttribute("idxcat",idx)
    document.getElementById("categories").style.display = "none";
  }
  show() {
    this.singleElement.style.display = "none";
    document.getElementById("categories").style.display = "block";
  }
  async getCategories() {
    this.parentElement.innerHTML = '<li>Loading...</li>';

    const categoryList = await this.categories.getCategories();

    // render the list to html
    console.log(this.parentElement);
    this.categoriesView.renderCategoryList(categoryList, this.parentElement);
    // add a listener to the new list of categories to allow drill down in to the details
    this.parentElement.addEventListener('click', e => {
      console.log('event');
      if (e.target.dataset.id != undefined) {
        if (e.target.dataset.action === "edit") {
          console.log("Edit:" + e.target.dataset.id);
          this.hide(e.target.dataset.id,e.target.parentNode.parentNode.rowIndex-1);
          document.getElementById("title").innerHTML = "Edit Category";
          document.getElementById("name").value=e.target.dataset.name;
          document.getElementById("type").value=e.target.dataset.type;
        } else {
          var r = confirm("Are you sure to delete?");
          if (r == true) {
            console.log("Delete:" + e.target.dataset.id);
            this.deleteCategory(e.target.dataset.id).then(a=>{
              this.parentElement.deleteRow(e.target.parentNode.parentNode.rowIndex - 1);
            });
          }
        }
      }
      //this.getCategoryDetails(e.target.dataset.id);
    });
  }
  async postCategory(data) {
    const category = await this.categories.postCategory(
      data
    );
    return category;
  }
  async putCategory(data) {
    const category = await this.categories.putCategory(
      data
    );
    return category;
  }
  async deleteCategory(id) {
    const category = await this.categories.deleteCategory(
      id
    );
    return category;
  }
  async getCategoryDetails(categoryId) {
    const category = this.categories.getCategoryById(categoryId);
    this.categoriesView.renderCategory(category, this.parentElement);
  }
}