
import { CommentService } from '../service/commentService.js'


export class commentController {

    async getComment(req, res, next) {
        try {

            const commentService = new CommentService();
            const resultItems = await commentService.getComment()
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
            await commentService.addComment(req.body);
            res.status(200).json({ status: 200 });
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
            const commentService = new CommentService();
            await commentService.updateComment(req.body, req.params.id);
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