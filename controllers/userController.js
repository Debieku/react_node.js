

import { UserService } from '../service/userService.js'
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

    async getUserById(req, res) {
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
            const userService = new UserService();
             await userService.addUser(req.body);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
           next(err)
           
        }
    }


    async deleteUser(req, res) {
        try {
            const userService = new UserService();
            const resultItem = await userService.deleteUser(req.params.id);
            // console.log("user");
            // console.log(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
             next(err)        }
    }

    async updateUser(req, res) {
        try {
            const userService = new UserService();
            await userService.updateUser(req.body);
         
            // console.log(req.params.id);
            // console.log(req.body);
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