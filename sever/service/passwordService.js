
// import { executeQuery } from './db.js';
// import { getByIdQuery} from './getAndDeleteQuerys.js'
// import { postPasswordQuery } from './queryPassword.js'
// import { getUserByName } from './userService.js'

// const tableName = "new_schema.todos";
// export class PasswordService {

//     async getPasswordByName(name, password) {
//         const userQuery = getUserByName(name);
//         const userId =  await executeQuery(userQuery, [name]).id;
//         const queryPassword = checkPasswordQuery();
//         const result =  await executeQuery(queryPassword, [userId, password]);
//         return result;
//     }

//     async addPassword(passwordItem) {
//         console.log(passwordItem)
      
//         const queryPassword = postPasswordQuery();
//         const propertyValues = Object.values(TodoItem);
//         await executeQuery(queryPassword, propertyValues);
//     }
// }