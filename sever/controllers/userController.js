
// import { PasswordController } from './passwordController.js';
import { Service } from '../service/service.js';
import { LoginController } from './loginController.js';
import { UserService } from '../service/userService.js';

const tableName = "users";

export class userController {

    async getUser(req, res, next) {
        try {
            const service = new Service();
            const resultItems = await service.get(tableName);
            resultItems.forEach((resultItem, i) => delete resultItem.isActive)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async getUserById(req, res, next) {
        try {
            const service = new Service();
            const id = req.params.id;
            const resultItem = await service.getBy(tableName, { "id": id });
            delete resultItem[0].isActive;
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async addUser(req, res, next) {
        try {
            const password = req.body.password;
            const loginController = new LoginController();
            const userName = req.body.userName;
            loginController.addPassword({ userName, password });
            const userService = new UserService();
            delete req.body.password;
            console.log(req.body)
            const resualt = await userService.addUser(req.body);
            res.status(200).json(resualt);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userService = new UserService();
            const resultItem = await userService.deleteUser(tableName, req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            const service = new Service();
            await service.update(tableName, req.body, req.params.id);
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