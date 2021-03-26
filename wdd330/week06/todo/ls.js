let todoList = [];
export default class ls {
    constructor() {
        if(JSON.parse(localStorage.getItem("todoList")) != null){
            todoList = JSON.parse(localStorage.getItem("todoList"));
        }
    }
    getAlltoDoList() {
        return todoList;
    }
    addItem(item){
        let id = Date.now();
        let content = item;
        todoList.push({"id":id,"content":content, "completed":false});
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }
    removeItem(item){
        let index=todoList.findIndex(x=>x.id==item);
        console.log(index);
        todoList.splice(index,1);
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }
    toggleItem(item){
        let index=todoList.findIndex(x=>x.id==item);
        if (todoList[index].completed==true){
            todoList[index].completed=false;
        }else{
            todoList[index].completed=true;
        }
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }
}