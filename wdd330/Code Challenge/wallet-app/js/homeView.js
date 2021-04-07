export default class HomeView {
  renderHome(data, listElement) {
    listElement.innerHTML = `<h3>Total Income:</h3>
    <span>${data.income}</span>
    <h3>Total Expense:</h3>
    <span>${data.expense}</span>
    <h3>Difference:</h3>
    <span>${data.difference}</span>`;
  }
}