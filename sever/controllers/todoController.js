
import { TodoService } from '../service/todoService.js'

export class todoController {
    async getTodo(req, res, next) {
        try {
            const todoService = new TodoService();
            let resultItems;
            if(Object.keys(req.query).length>0)
            {
                 resultItems = await todoService.getTodoByUserId(req.query.userId)
            }
            else{
                 resultItems = await todoService.getTodo()
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

    // async getTodoByUserId(req, res, next){
    //     try {            
    //         console.log("control beggining");
    //         const todoService = new TodoService();
            
    //         return res.status(200).json(resultItems);
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }

    async getTodoById(req, res, next) {
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
            const resultItem = await todoService.addTodo(req.body);
            res.status(200).json(resultItem);
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
            res.status(200).json({ status: 200, data: resultItem });
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
            const todoService = new TodoService();
            await todoService.updateTodo(req.body, req.params.id);
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