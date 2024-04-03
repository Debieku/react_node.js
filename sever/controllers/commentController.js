
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
            }
            else {
                resultItems = await service.get(tableName);
            }
            resultItems.forEach((resultItem, i) => delete resultItem.isActive)
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
