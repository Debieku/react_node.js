
import { executeQuery } from './db.js';
import { getQuery ,getByIdQuery, deleteQuery} from './getAndDeleteQuerys.js'
import { postTodoQuery, updateTodoQuery } from './queryTodo.js'

const tableName = "new_schema.todos";
export class TodoService {

    async getTodo() {
        const queryTodo = getQuery(tableName);
        const result = await executeQuery(queryTodo);
        return result;
    }

    async getTodoById(id) {
        const queryTodo = getByIdQuery(tableName);
        const result =  await executeQuery(queryTodo, [id]);
        return result;
    }

    async addTodo(TodoItem) {
        console.log(TodoItem)
        const queryTodo = postTodoQuery();
        const propertyValues = Object.values(TodoItem);
        await executeQuery(queryTodo, propertyValues);
    }

    async updateTodo(TodoItem, id) {
        console.log(TodoItem)
        const queryTodo = updateTodoQuery();
        const propertyValues = Object.values(TodoItem);
        propertyValues.push(id);
        console.log(propertyValues)
        await executeQuery(queryTodo, propertyValues);
    }

    async deleteTodo(id) {
        console.log(id)
        const queryTodo = deleteQuery(tableName);
        await executeQuery(queryTodo,[ id]);
    }
}