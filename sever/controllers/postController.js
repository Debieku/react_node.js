import { Service } from '../service/service.js'

const tableName = "posts";
export class postController {

    async getPost(req, res, next) {
        try {
            const service = new Service();
            let resultItems;
            if (Object.keys(req.query).length > 0) {
                const limit = req.query.limit;
                const startLimit=req.query.start;

                resultItems = await service.limit(tableName, limit, startLimit);
                console.log(`req: get ${limit} posts, res: successfull`);
            }
            else {
                resultItems = await service.get(tableName);
                console.log("req: get all posts, res: successfull");
            }
            resultItems.forEach((resultItem) => delete resultItem.isActive)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async getPostById(req, res, next) {
        try {
            const service = new Service();
            const id = req.params.id;
            const resultItem = await service.getBy(tableName, { 'id': id });
            delete resultItem[0].isActive;
            console.log("req: get post by id= " + id + ", res: successfull")
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async addPost(req, res, next) {
        try {
            const service = new Service();
            const resultItem = await service.add(tableName, req.body);
            console.log("req: add post with id= " + resultItem.insertId + ", res: successfull")
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async updatePost(req, res, next) {
        try {
            const service = new Service();
            await service.update(tableName, req.body, req.params.id);
            console.log("req: update post with id= " + req.params.id + ", res: successfull")
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deletePost(req, res, next) {
        try {
            const service = new Service();
            const resultItem = await service.delete(tableName, req.params.id);
            console.log("req: delete post with id= " + req.params.id + ", res: successfull")
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

}