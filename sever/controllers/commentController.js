
import { Service } from '../service/service.js'

const tableName = "comments";

export class commentController {

    async getComment(req, res, next) {
        try {
            const service = new Service();
            let resultItems;
            if (Object.keys(req.query).length > 0) {
                const postId = req.query.postId;
                resultItems = await service.getBy(tableName, { 'postId': postId });
                console.log("req: get post's id="+ postId +" comments, res: successfull")
            }
            else {
                resultItems = await service.get(tableName);
                console.log("req: get all comments, res: successfull")
            }
            resultItems.forEach((resultItem) => delete resultItem.isActive);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async getCommentById(req, res, next) {
        try {
            const service = new Service();
            const id = req.params.id;
            const resultItem = await service.getBy(tableName, { 'id': id });
            delete resultItem[0].isActive;
            console.log("req: get comment by id= " + id + ", res: successfull")
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async addComment(req, res, next) {
        try {
            const service = new Service();
            let resultItems = await service.add(tableName, req.body);
            console.log("req: add comment with id= " + resultItems.insertId + ", res: successfull")
            res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async updateComment(req, res, next) {
        try {
            console.log(req.params.id)
            const service = new Service();
            await service.update(tableName, req.body, req.params.id);
            console.log("req: update comment with id= " + req.params.id + ", res: successfull")
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async deleteComment(req, res, next) {
        try {
            const service = new Service();
            const resultItem = await service.delete(tableName, req.params.id);
            console.log("req: delete comment with id= " + req.params.id + ", res: successfull")
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

}
