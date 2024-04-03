import express from "express";
import { userController } from '../controllers/userController.js';

const userRouter = express.Router();
const usercontroller = new userController();

userRouter.get("/:id", usercontroller.getUserById);
userRouter.get("/", usercontroller.getUser);
userRouter.post("/", usercontroller.addUser);
userRouter.delete("/:id", usercontroller.deleteUser);
userRouter.put("/:id", usercontroller.updateUser);

export {
    userRouter
}