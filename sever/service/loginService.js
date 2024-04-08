
import { executeQuery } from './db.js';
import { loginQuery, registerQuery } from './queryLogin.js'
import { UserService } from '../service/userService.js';

const tableName = "new_schema.userpassword";
export class LoginService {

    async checkPassword(loginObj) {
        const userService = new UserService();
        const userByName = await userService.getUserByName(loginObj.userName);
        if (userByName.length == 0) {
            return { "result": 0 };
        }
        const loginDetails = { "userId": userByName[0].id, "password": loginObj.password };
        const queryLogin = loginQuery();
        const propertyValues = Object.values(loginDetails);
        const result = await executeQuery(queryLogin, propertyValues);
        if (result[0]["COUNT(*)"] == 0)
            return { "result": 0 };
        return { "result": 1, "user": userByName };
    }

    async register(loginObj){
        const queryRegister = registerQuery();
        return await executeQuery(queryRegister, loginObj);
    }



    async updatePassword(id, oldPassword, newPassword){
        let queryPassword = loginQuery();
        const result = await executeQuery(queryPassword, [oldPassword, id]);
        if (result[0]["COUNT(*)"] == 0)
        return { "result": 0 };
        else{
            queryPassword = updatePassword();
            const res = await executeQuery(queryPassword, [newPassword, id]);
        }
        
    }
 
}