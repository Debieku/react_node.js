import express from "express";
import { postController } from '../controllers/postController.js';

const postRouter = express.Router();
const postcontroller = new postController();

postRouter.get("/:id", postcontroller.getPostById);
postRouter.get("/", postcontroller.getPost);
postRouter.post("/", postcontroller.addPost);
postRouter.delete("/:id", postcontroller.deletePost);
postRouter.put("/:id", postcontroller.updatePost);


export {
    postRouter
}