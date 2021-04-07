export default class ReportView {
  renderReportList(reportList, total, listElement,totalElement) {
    if(report.dateIncome!=undefined){
      listElement.innerHTML = reportList
      .map(report => {
        return `<tr>
        <td>${report.id}</td>
        <td>${report.dateIncome}</td>
        <td>${report.category.name}</td>
        <td>${report.description}</td>
        <td class="right-align">${report.amount}</td>
      </tr>`;
      })
      .join('');
      totalElement.innerHTML=total;
    }else{
      listElement.innerHTML = reportList
      .map(report => {
        return `<tr>
        <td>${report.id}</td>
        <td>${report.dateExpense}</td>
        <td>${report.category.name}</td>
        <td>${report.description}</td>
        <td class="right-align">${report.amount}</td>
      </tr>`;
      })
      .join('');
      totalElement.innerHTML=total;
    }
    
  }
}