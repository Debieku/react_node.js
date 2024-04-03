import { executeQuery } from './db.js';
import { getQuery, getByQuery, deleteQuery, addQuery, updateQuery } from './query.js'


export class Service {

    async get(tableName) {
        const queryUser = getQuery(tableName);
        const result = await executeQuery(queryUser);
        return result;
    }

    async getBy(tableName, sortByObj) {
        const keys = Object.keys(sortByObj);
        const values = Object.values(sortByObj);
        const queryUser = getByQuery(tableName, keys[0]);
        const result = await executeQuery(queryUser, values);
        return result;
    }

    async add(tableName, userItem) {
        const keys = Object.keys(userItem);
        const values = Object.values(userItem);
        const queryUser = addQuery(tableName, keys);
        return await executeQuery(queryUser, values);
    }

    async update(tableName, userItem, id) {
        const keys = Object.keys(userItem);
        const values = Object.values(userItem);
        const queryUser = updateQuery(tableName, keys);
        values.push(id);
        await executeQuery(queryUser, values);
    }

    async delete(tableName, id) {
        const queryUser = deleteQuery(tableName);
        await executeQuery(queryUser, [id]);
    }

}