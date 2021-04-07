import Income from './income.js';
import IncomesView from './incomeView.js';
import Category from './category.js'

// Income controller
export default class IncomeController {
  constructor(parent, single) {
    this.parent = parent;
    this.parentElement = null;
    this.single = single;
    this.singleElement = null;
    this.incomes = new Income();
    this.categories = new Category();
    this.incomesView = new IncomesView();
  }
  clear(){
    let today = new Date();
    document.getElementById("date").value = today.toISOString().substr(0, 10);
    document.getElementById("description").value="";
    document.getElementById("amount").value=0;
  }
  async init() {
    this.parentElement = document.querySelector(this.parent + " tbody");
    this.singleElement = document.getElementById(this.single);
    this.singleElement.style.display = "none";
    this.getIncomes();
    document.getElementById("new").addEventListener('click', e => {
      document.getElementById("title").innerHTML = "Add Income";
      this.clear();
      if (this.singleElement.style.display === "none") {
        this.singleElement.style.display = "block";
        document.getElementById("incomes").style.display = "none";
      } else {
        this.singleElement.style.display = "none";
        document.getElementById("incomes").style.display = "block";
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
      if (document.getElementById("title").innerText === "Add Income") {
        this.postIncome({
          'dateIncome': document.getElementById("date").value,
          'category': JSON.parse(document.getElementById("category").value),
          'description': document.getElementById("description").value,
          'amount': parseFloat(document.getElementById("amount").value)
        }).then(e => {
          console.log(e);
          this.parentElement.innerHTML = this.parentElement.innerHTML +
            `<tr>
            <td>${e.id}</td>
            <td>${e.dateIncome}</td>
            <td>${e.category.name}</td>
            <td>${e.description}</td>
            <td class="right-align">${e.amount}</td>
          <td>
            <a data-id=${e.id} data-json=${JSON.stringify(e)} class="button primary edit" ">Edit</a>
            <a class="button primary delete" >Delete</a>
          </td>
        </tr>`;
        });
      } else {
        let index = document.getElementById("save").getAttribute("idxcat");
        let id = document.getElementById("save").getAttribute("idcat");
        this.putIncome({
          'id': id,
          'dateIncome': document.getElementById("date").value,
          'category': JSON.parse(document.getElementById("category").value),
          'description': document.getElementById("description").value,
          'amount': parseFloat(document.getElementById("amount").value)
        }).then(e => {
          console.log("param id:");
          let x = this.parentElement.rows[index].cells;
          x[1].innerHTML = e.dateIncome;
          x[2].innerHTML = e.category.name;
          x[3].innerHTML = e.description;
          x[4].innerHTML = e.amount;
          x[5].innerHTML = `<a data-id=${e.id} data-action="edit" data-json='${JSON.stringify(e)}' class="button primary edit" ">Edit</a>
          <a data-id=${e.id} data-action="delete" class="button primary delete" >Delete</a>`;
        });
      }
      this.show();
    });
    this.categories.getCategoriesByType("Income").then(e => {
      console.log("Incomes type:");
      console.log(e);
      let options = '';
      e.forEach(i => {
        options = options + `<option value='${JSON.stringify(i)}'>${i.name}</option>`
      })
      document.getElementById("category").innerHTML =
        document.getElementById("category").innerHTML + options;
    });
  }
  hide(id, idx) {
    this.singleElement.style.display = "block";
    document.getElementById("save").setAttribute("idcat", id);
    document.getElementById("save").setAttribute("idxcat", idx)
    document.getElementById("incomes").style.display = "none";
  }
  show() {
    this.singleElement.style.display = "none";
    document.getElementById("incomes").style.display = "block";
  }
  async getIncomes() {
    this.parentElement.innerHTML = '<li>Loading...</li>';

    const incomeList = await this.incomes.getIncomes();

    // render the list to html
    console.log(this.parentElement);
    this.incomesView.renderIncomeList(incomeList, this.parentElement);
    // add a listener to the new list of incomes to allow drill down in to the details
    this.parentElement.addEventListener('click', e => {
      console.log('event');
      if (e.target.dataset.id != undefined) {
        if (e.target.dataset.action === "edit") {
          console.log("Edit:" + e.target.dataset.id);
          this.hide(e.target.dataset.id, e.target.parentNode.parentNode.rowIndex - 1);
          let income = JSON.parse(e.target.dataset.json);
          console.log(income.dateIncome);
          document.getElementById("title").innerHTML = "Edit Income";
          document.getElementById("date").value = income.dateIncome;
          document.getElementById("category").value = JSON.stringify(income.category);
          document.getElementById("description").value = income.description;
          document.getElementById("amount").value = income.amount;
        } else {
          var r = confirm("Are you sure to delete?");
          if (r == true) {
            console.log("Delete:" + e.target.dataset.id);
            this.deleteIncome(e.target.dataset.id).then(a => {
              this.parentElement.deleteRow(e.target.parentNode.parentNode.rowIndex - 1);
            });
          }
        }
      }
      //this.getIncomeDetails(e.target.dataset.id);
    });
  }
  async postIncome(data) {
    const income = await this.incomes.postIncome(
      data
    );
    return income;
  }
  async putIncome(data) {
    const income = await this.incomes.putIncome(
      data
    );
    return income;
  }
  async deleteIncome(id) {
    const income = await this.incomes.deleteIncome(
      id
    );
    return income;
  }
  async getIncomeDetails(incomeId) {
    const income = this.incomes.getIncomeById(incomeId);
    this.incomesView.renderIncome(income, this.parentElement);
  }
}