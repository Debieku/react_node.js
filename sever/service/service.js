import { executeQuery } from './db.js';
import { getQuery, getByQuery, deleteQuery, addQuery, updateQuery, limit } from './query.js'


export class Service {

    async get(tableName) {
        const query = getQuery(tableName);
        return await executeQuery(query);
    }

    async getBy(tableName, sortByObj) {
        const keys = Object.keys(sortByObj);
        const values = Object.values(sortByObj);
        const query = getByQuery(tableName, keys);
        return await executeQuery(query, values);
    }

    async add(tableName, userItem) {
        const keys = Object.keys(userItem);
        const values = Object.values(userItem);
        const query = addQuery(tableName, keys);
        return await executeQuery(query, values);
    }

    async update(tableName, userItem, id) {
        const keys = Object.keys(userItem);
        const values = Object.values(userItem);
        const query = updateQuery(tableName, keys);
        values.push(id);
        await executeQuery(query, values);
    }

    async delete(tableName, id) {
        const query = deleteQuery(tableName);
        await executeQuery(query, [id]);
    }

    async limit(tableName, numOfLimit, startLimit){
        const query = limit(tableName);
        return await executeQuery(query, [numOfLimit, startLimit]);
    }

}