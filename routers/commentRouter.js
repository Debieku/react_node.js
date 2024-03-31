

import express from "express";
import { commentController } from '../controllers/commentController.js'


const commentRouter=express.Router();

const commentcontroller = new commentController()

commentRouter.get("/:id", commentcontroller.getCommentById)
commentRouter.get("/", commentcontroller.getComment)
commentRouter.post("/", commentcontroller.addComment)
commentRouter.delete("/:id", commentcontroller.deleteComment)
commentRouter.put("/:id", commentcontroller.updateComment)


export{
    commentRouter
}