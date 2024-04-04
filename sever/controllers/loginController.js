
import { LoginService } from '../service/loginService.js'
import { UserService } from '../service/userService.js';

const loginTry = [];

export class LoginController {

    async checkPassword(req, res, next) {
        try {
            const loginService = new LoginService();
            let addUserName = true;
            let numOfTries = 1;
            loginTry.forEach((log) => { if (log.userName == req.body.userName) log.num++; addUserName = false; numOfTries = log.num; })
            if (addUserName) loginTry.push({ "userName": req.body.userName, "num": 1 })
            if (numOfTries > 4) {
                return res.status(200).json({ result: "blocked" });
            }
            const resultItems = await loginService.checkPassword(req.body);
            console.log(`req: login username= ${req.body.userName} ${numOfTries} times of tring, res:${resultItems.result == 1 ? "success" : "failed"}`)
            setTimeout(() => loginTry.forEach((log) => { log.num = 0; }), 500000)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async addPassword(req, res, next) {
        try {
            console.log("body ",req.body)
            const loginService = new LoginService();
            const resualt = await loginService.register(req.body);
            console.log(`req: add new user-register with id=${req.body.id}, res: successfull`);
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