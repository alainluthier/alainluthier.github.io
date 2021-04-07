export default class ExpenseView {
  renderExpenseList(expenseList, listElement) {
    listElement.innerHTML = expenseList
      .map(expense => {
        return `<tr>
        <td>${expense.id}</td>
        <td>${expense.dateExpense}</td>
        <td>${expense.category.name}</td>
        <td>${expense.description}</td>
        <td class="right-align">${expense.amount}</td>
        <td>
          <a data-id=${expense.id} data-action="edit" data-json='${JSON.stringify(expense)}' class="button primary edit" ">Edit</a>
          <a data-id=${expense.id} data-action="delete" class="button primary delete" >Delete</a>
        </td>
      </tr>`;
      })
      .join('');
  }
}