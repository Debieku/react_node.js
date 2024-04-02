

import express from "express";
import { LoginController } from '../controllers/loginController.js'


const loginRouter=express.Router();

const logincontroller = new LoginController()

// loginRouter.get("/:id", logincontroller.getLoginById)
// loginRouter.get("/", logincontroller.getLogin)
loginRouter.post("/", logincontroller.checkPassword);
// loginRouter.put("/:id", logincontroller.updateLogin)


export{
    loginRouter
}