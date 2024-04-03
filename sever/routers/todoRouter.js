import express from "express";
import { todoController } from '../controllers/todoController.js';

const todoRouter = express.Router();
const todocontroller = new todoController();

todoRouter.get("/:id", todocontroller.getTodoById);
todoRouter.get("/", todocontroller.getTodo);
todoRouter.post("/", todocontroller.addTodo);
todoRouter.delete("/:id", todocontroller.deleteTodo);
todoRouter.put("/:id", todocontroller.updateTodo);

export {
    todoRouter
}