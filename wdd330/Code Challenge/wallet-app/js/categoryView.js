export default class CategoryView {
  renderCategoryList(categoryList, listElement) {
    listElement.innerHTML = categoryList
      .map(category => {
        return `<tr>
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>${category.type}</td>
        <td>
          <a data-id=${category.id} class="button primary edit" ">Edit</a>
          <a class="button primary delete" >Delete</a>
        </td>
      </tr>`;
      })
      .join('');
  }
  renderCategory(category, element) {
    const categoryProperties = Object.entries(category.properties);
    element.innerHTML = categoryProperties
      .map(item => {
        if (item[0] === 'time' || item[0] === 'updated') {
          return `<li>${item[0]}: ${new Date(item[1])}</li>`;
        } else return `<li>${item[0]}: ${item[1]}</li>`;
      })
      .join('');
  }
}