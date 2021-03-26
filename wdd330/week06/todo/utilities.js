export default class utils {
    constructor() {

    }
    activeFilter(todos) {
        return todos.filter(todo => {
            return !todo.completed;
        });
    }
    completedFilter(todos) {
        return todos.filter(todo => {
            return todo.completed;
        });
    }
}