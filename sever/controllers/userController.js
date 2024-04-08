
import { Service } from '../service/service.js';
import { LoginService } from '../service/loginService.js';

const tableName = "users";

export class userController {

    async getUser(req, res, next) {
        try {
            const service = new Service();
            const resultItems = await service.get(tableName);
            resultItems.forEach((resultItem, i) => delete resultItem.isActive);
            console.log("req: get all users, res: successfull")
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
            console.log("req: get user by id= " + id + ", res: successfull")
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
            const service = new Service();
            delete req.body.password;
            const resualt = await service.add(tableName, req.body);
            if (resualt == undefined)
                return res.status(401).json({ resualt: "userName duplicate" });
            const id = resualt.insertId;
            const loginService = new LoginService();
            await loginService.register([id, password]);
            console.log("req: add user with id= " + resualt.insertId + ", res: successfull")
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
            console.log("req: delete user with id= " + resultItem.insertId + ", res: successfull")
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
            console.log("req: update user with id= " + req.params.id + ", res: successfull")
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