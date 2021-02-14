const todoList = [{
        id: 1,
        content: 'test1',
        completed: false
    },
    {
        id: 2,
        content: 'test2',
        completed: false
    },
    {
        id: 3,
        content: 'test3',
        completed: false
    },
]
export default class ls {
    constructor() {
    }
    getAlltoDoList() {
        return todoList;
    }
    addItem(item){
        let id = Date.now();
        let content = item;
        todoList.push({"id":id,"content":content, "completed":false});
    }
    removeItem(item){
        let index=todoList.findIndex(x=>x.id==item);
        console.log(index);
        todoList.splice(index,1);
    }
    toggleItem(item){
        let index=todoList.findIndex(x=>x.id==item);
        if (todoList[index].completed==true){
            todoList[index].completed=false;
        }else{
            todoList[index].completed=true;
        }
    }
}