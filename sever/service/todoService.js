
import { executeQuery } from './db.js';
import { getQuery ,getByIdQuery, deleteQuery} from './getAndDeleteQuerys.js'
import { postTodoQuery, updateTodoQuery, getTodoByUserIdQuery } from './queryTodo.js'

const tableName = "new_schema.todos";
export class TodoService {

    async getTodo() {
        const queryTodo = getQuery(tableName);
        const result = await executeQuery(queryTodo);
        return result;
    }

    async getTodoByUserId(userId){
         const queryTodo = getTodoByUserIdQuery();
         const result = await executeQuery(queryTodo, [userId]);
         return result;
    }

    async getTodoById(id) {
        const queryTodo = getByIdQuery(tableName);
        const result =  await executeQuery(queryTodo, [id]);
        return result;
    }

    async addTodo(TodoItem) {
        const queryTodo = postTodoQuery();
        const propertyValues = Object.values(TodoItem);
        const result = await executeQuery(queryTodo, propertyValues);
        return result;
    }

    async updateTodo(TodoItem, id) {
        const queryTodo = updateTodoQuery();
        const propertyValues = Object.values(TodoItem);
        propertyValues.push(id);
        await executeQuery(queryTodo, propertyValues);
    }

    async deleteTodo(id) {
        const queryTodo = deleteQuery(tableName);
        await executeQuery(queryTodo,[ id]);
    }
}