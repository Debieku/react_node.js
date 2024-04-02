
// import { PasswordController } from './passwordController.js';
import { UserService } from '../service/userService.js'
import { LoginController } from './loginController.js';


export class userController {

    async getUser(req, res, next) {
        try {

            const userService = new UserService();
            const resultItems = await userService.getUser()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUserById(req, res, next) {
        try {
            const userService = new UserService();
            const resultItem = await userService.getUserById(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
             next(err)
        }
    }

    async addUser(req, res ,next) {
        try {
            const password=req.body.password;
            const loginController= new LoginController();
            const userName=req.body.userName;
            loginController.addPassword({userName,password});
            const userService = new UserService();
            delete req.body.password;
            console.log(req.body)
            const resualt = await userService.addUser(req.body);
            res.status(200).json(resualt);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
           next(err)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userService = new UserService();
            const resultItem = await userService.deleteUser(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
             next(err)       
        }
    }

    async updateUser(req, res, next) {
        try {
            const userService = new UserService();
            await userService.updateUser(req.body, req.params.id);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}