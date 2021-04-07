export default class CategoryView {
  renderCategoryList(categoryList, listElement) {
    listElement.innerHTML = categoryList
      .map(category => {
        return `<tr>
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>${category.type}</td>
        <td>
          <a data-id=${category.id} data-action="edit" data-name=${category.name} data-type=${category.type} class="button primary edit" ">Edit</a>
          <a data-id=${category.id} data-action="delete" class="button primary delete" >Delete</a>
        </td>
      </tr>`;
      })
      .join('');
  }
}