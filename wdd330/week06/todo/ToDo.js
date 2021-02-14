import ls from './ls.js';
import utils from './utilities.js';
var list = new ls();
var utilities = new utils();
loadTodos(list.getAlltoDoList());
document.querySelector("#addButton").onclick=newTodo;
document.querySelector("#activeFilter").onclick=applyFilter;
document.querySelector("#allFilter").onclick=applyFilter;
document.querySelector("#completedFilter").onclick=applyFilter;
function newTodo(){
    console.log("click");
    let value = document.getElementById("todoInput").value;
    if(value!=null){
        list.addItem(value);
    loadTodos(list.getAlltoDoList());
    document.getElementById("todoInput").value=null;
    }
}
function loadTodos(listToShow){
    document.getElementById("todos").innerHTML="";
    listToShow.forEach(e => {
        let item = document.createElement("div");
        let check = document.createElement("input");
        check.type="checkbox";
        check.addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
              toggleComplete(e.id);
            } 
          })
        let label = document.createElement("label");
        label.innerHTML=e.content;
        if(e.completed==true){
            label.className="line"
            check.checked=true;
        }
        let button = document.createElement('button');
        button.type = "button"
        button.innerHTML="X"
        button.addEventListener('click', function(){
            deleteTodo(e.id);
        });
        item.appendChild(check);
        item.appendChild(label);
        item.appendChild(button);
        document.getElementById("todos").appendChild(item); 
    });
}
function deleteTodo(e){
    list.removeItem(e);
    loadTodos(list.getAlltoDoList());
}
function toggleComplete(e){
    list.toggleItem(e);
    loadTodos(list.getAlltoDoList());
}
function applyFilter(e){
    let filteredTodos = [];
    let allTodos = list.getAlltoDoList();    
    switch (e.currentTarget.id){
        case "activeFilter":
            filteredTodos = utilities.activeFilter(allTodos);
            break;
        case "allFilter":
            filteredTodos=allTodos;
            break;
        case "completedFilter":
            filteredTodos=utilities.completedFilter(allTodos);
            break;
    }
    loadTodos(filteredTodos);
}