
import { executeQuery } from './db.js';
import { getTodosQuery ,getTodosByIdQuery,postTodoQuery,updateTodoQuery,deleteTodoQuery} from './queryTodo.js'

export class TodoService {

    async getTodo() {
        const queryTodo = getTodosQuery();
        const result = await executeQuery(queryTodo);
        return result;
    }

    async getTodoById(id) {
        const queryTodo = getTodosByIdQuery();
        const result =  await executeQuery(queryTodo, [id]);
        return result;
    }

    async addTodo(TodoItem) {
        console.log(TodoItem)
        const queryTodo = postTodoQuery();
        await executeQuery(queryTodo,[TodoItem]);
    }

    async updateTodo(TodoItem) {
        console.log(TodoItem.id)
        const queryTodo = updateTodoQuery();
        await executeQuery(queryTodo,[TodoItem, TodoItem.id]);
    }

    
    async deleteTodo(id) {
        console.log(id)
        const queryTodo = deleteTodoQuery();
        await executeQuery(queryTodo,[ id]);
    }
}