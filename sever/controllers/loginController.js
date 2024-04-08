
import { LoginService } from '../service/loginService.js'

const loginTry = [];

export class LoginController {

    async checkPassword(req, res, next) {
        try {
            const loginService = new LoginService();
            let addUserName = true;
            let numOfTries = 1;
            loginTry.forEach((log) => { if (log.userName == req.body.userName) { log.num++; addUserName = false; numOfTries = log.num; } })
            if (addUserName) {
                loginTry.push({ "userName": req.body.userName, "num": 1 });
                setTimeout(() => loginTry.forEach((log) => { if (log.userName == req.body.userName) log.num = 0; }), 500000)
            }
            if (numOfTries > 4) {
                return res.status(401).json({ result: "blocked" });
            }
            const resultItems = await loginService.checkPassword(req.body);
            console.log(`req: login username= ${req.body.userName} ${numOfTries} times of tring, res:${resultItems.result == 1 ? "success" : "failed"}`)
            if(resultItems.result==0)return res.status(401).json("wrong details");
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }


    async updatePassword(req, res, next) {
        try {
            const loginService = new LoginService();
            const checkPassword = await loginService.updatePassword(req.params.id, req.body.oldPassword, req.body.newPassword);
            return res.status(200).json(checkPassword);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}