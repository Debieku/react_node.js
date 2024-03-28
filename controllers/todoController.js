

import { TodoService } from '../service/todoService.js'
export class todoController {

    async getTodo(req, res, next) {
        try {

            const todoService = new TodoService();
            const resultItems = await todoService.getTodo()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getTodoById(req, res) {
        try {
            const todoService = new TodoService();
            const resultItem = await todoService.getTodoById(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
             next(err)
        }
    }


    async addTodo(req, res ,next) {
        try {
            const todoService = new TodoService();
             await todoService.addTodo(req.body);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
           next(err)
           
        }
    }


    async deleteTodo(req, res) {
        try {
            const todoService = new TodoService();
            const resultItem = await todoService.deleteTodo(req.params.id);
            // console.log("todo");
            // console.log(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
             next(err)        }
    }

    async updateTodo(req, res) {
        try {
            const todoService = new TodoService();
            await todoService.updateTodo(req.body);
         
            // console.log(req.params.id);
            // console.log(req.body);
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