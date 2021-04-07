export default class IncomeView {
  renderIncomeList(incomeList, listElement) {
    listElement.innerHTML = incomeList
      .map(income => {
        return `<tr>
        <td>${income.id}</td>
        <td>${income.dateIncome}</td>
        <td>${income.category.name}</td>
        <td>${income.description}</td>
        <td class="right-align">${income.amount}</td>
        <td>
          <a data-id=${income.id} data-action="edit" data-json='${JSON.stringify(income)}' class="button primary edit" ">Edit</a>
          <a data-id=${income.id} data-action="delete" class="button primary delete" >Delete</a>
        </td>
      </tr>`;
      })
      .join('');
  }
}