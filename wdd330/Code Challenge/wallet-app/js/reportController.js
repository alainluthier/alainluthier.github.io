import ReportsView from './reportView.js';
import Income from './income.js';
import Expense from './expense.js';

// Report controller
export default class ReportController {
  constructor(parent,total) {
    this.parent = parent;
    this.parentElement = null;
    this.incomes = new Income();
    this.expenses = new Expense();
    this.reportsView = new ReportsView();
    this.total=total;
    this.totalElement = null;
  }
  async init() {
    this.parentElement = document.querySelector(this.parent + " tbody");
    this.totalElement=document.getElementById(this.total);
    console.log(this.total);
    console.log(this.totalElement);
    document.getElementById("search").addEventListener('click', e => {
      let date1=document.getElementById("date1").value;
      let date2=document.getElementById("date2").value;
      let type=document.getElementById("type").value;
      this.getReports(date1,date2,type);
    });
    let today = new Date();
    document.getElementById("date1").value = today.toISOString().substr(0, 10);
    document.getElementById("date2").value = today.toISOString().substr(0, 10);
  }
  async getReports(date1,date2,type) {
    this.parentElement.innerHTML = '<li>Loading...</li>';
    let list = null;
    if (type=="Income"){
      list=this.incomes.getIncomes().then(e=>{
        let filtered = e.filter(row=>{ 
          if((new Date(row.dateIncome) >= new Date(date1)) && (new Date(row.dateIncome) <= new Date(date2))) {return row}
        });
        let total = filtered.reduce((a, b) => a + (b['amount'] || 0), 0);
        
        this.reportsView.renderReportList(filtered,total, 
          this.parentElement,
          this.totalElement);    
      });
    }else{
      list=this.expenses.getExpenses().then(e=>{
        let filtered = e.filter(row=>{ 
          if((new Date(row.dateExpense) >= new Date(date1)) && (new Date(row.dateExpense) <= new Date(date2))) {return row}
        });
        console.log(filtered);
        let total = filtered.reduce((a, b) => a + (b['amount'] || 0), 0);
        
        this.reportsView.renderReportList(filtered,total, 
          this.parentElement,
          this.totalElement);    
      });

    }
    

    //const reportList = await this.reports.getReports();
    // render the list to html
    
    // add a listener to the new list of reports to allow drill down in to the details
  }
}