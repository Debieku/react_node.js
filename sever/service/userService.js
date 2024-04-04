
import { executeQuery } from './db.js';
import { getQuery ,getByQuery, deleteQuery} from './query.js'
import { postUserQuery, updateUserQuery,getByNameQuery } from './queryUser.js'

const tableName = "new_schema.users";
export class UserService {
    
    async getUser() {
        const queryUser = getQuery(tableName);
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserById(id) {
        const queryUser = getByQuery(tableName);
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

   async getUserByName(name){
    const queryUser = getByNameQuery();
        const result =  await executeQuery(queryUser, [name]);
        return result;
   }

    async addUser(UserItem) {

        const queryUser = postUserQuery();
        const propertyValues = Object.values(UserItem);
        return await executeQuery(queryUser, propertyValues);
    }

    async updateUser(UserItem, id) {
        const queryUser = updateUserQuery();
        const propertyValues = Object.values(UserItem);
        propertyValues.push(id);
        await executeQuery(queryUser, propertyValues);
    }
    
    async deleteUser(id) {
        console.log(id)
        const queryUser = deleteQuery(tableName);
        await executeQuery(queryUser,[ id]);
    }

}