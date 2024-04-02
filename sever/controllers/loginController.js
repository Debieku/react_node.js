
import { LoginService } from '../service/loginService.js'
import { UserService } from '../service/userService.js';

export class LoginController {

    async checkPassword(req, res, next) {
        try {
            const loginService = new LoginService();
            const resultItems = await loginService.checkPassword(req.body);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addPassword(req, res ,next) {
        try {
            const loginService = new LoginService();
           const resualt= await loginService.register(req.body);
            res.status(200).json(resualt);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
           next(err)
        }
    }
}