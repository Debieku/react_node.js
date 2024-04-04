import { Service } from '../service/service.js'


const tableName = "todos";

export class todoController {

    async getTodo(req, res, next) {
        try {
            const service = new Service();
            let resultItems;
            if (Object.keys(req.query).length > 0) {
                const userId = req.query.userId;
                resultItems = await service.getBy(tableName, { "userId": userId });
                console.log("req: get user's id="+ userId +" todos, res: successfull")
            }
            else {
                resultItems = await service.get(tableName);
                console.log("req: get all todos, res: successfull")
            }
            resultItems.forEach((resultItem) => delete resultItem.isActive)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getTodoById(req, res, next) {
        try {
            const service = new Service();
            const id = req.params.id;
            const resultItems = await service.getBy(tableName, { "id": id });
            delete resultItems[0].isActive;
            console.log("req: get todo by id= " + id + ", res: successfull")
            res.status(200).json({ status: 200, data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addTodo(req, res, next) {
        try {
            const service = new Service();
            const resultItem = await service.add(tableName, req.body);
            console.log("req: add todo with id= " + resultItem.insertId + ", res: successfull")
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateTodo(req, res, next) {
        try {
            const service = new Service();
            await service.update(tableName, req.body, req.params.id);
            console.log("req: update todo with id= " + req.params.id + ", res: successfull")
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteTodo(req, res, next) {
        try {
            const todoService = new TodoService();
            const resultItem = await todoService.deleteTodo(req.params.id);
            console.log("req: delete todo with id= " + req.params.id + ", res: successfull")
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