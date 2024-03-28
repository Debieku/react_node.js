
import { executeQuery } from './db.js';
import { getUsersQuery ,getUsersByIdQuery,postQuery,updateQuery,deleteQuery} from './queryUser.js'

export class UserService {

    async getUser() {
        const queryUser = getUsersQuery();
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserById(id) {
        const queryUser = getUsersByIdQuery();
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    async addUser(UserItem) {
        console.log(UserItem)
        const queryUser = postQuery();
        await executeQuery(queryUser,[UserItem]);
    }

    async updateUser(UserItem) {
        console.log(UserItem.id)
        const queryUser = updateQuery();
        await executeQuery(queryUser,[UserItem, UserItem.id]);
    }

    
    async deleteUser(id) {
        console.log(id)
        const queryUser = deleteQuery();
        await executeQuery(queryUser,[ id]);
    }
}