
import { CommentService } from '../service/commentService.js'


export class commentController {

    async getComment(req, res, next) {
        try {
            const commentService = new CommentService();
            let resultItems;
            if(Object.keys(req.query).length>0)
            {
                 resultItems = await commentService.getCommentByPostId(req.query.postId)
            }
            else{
                 resultItems = await commentService.getComment()
            }
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getCommentById(req, res, next) {
        try {
            const commentService = new CommentService();
            const resultItem = await commentService.getCommentById(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
             next(err)
        }
    }

    async addComment(req, res ,next) {
        try {
            const commentService = new CommentService();
            let resultItems=await commentService.addComment(req.body);
            res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
           next(err)
        }
    }

    async deleteComment(req, res, next) {
        try {
            const commentService = new CommentService();
            const resultItem = await commentService.deleteComment(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
             next(err)        
        }
    }

    async updateComment(req, res, next) {
        try {
            console.log(req.params.id)
            const commentService = new CommentService();
            await commentService.updateComment(req.body,req.params.id);
            res.status(200).json({status:200});
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
