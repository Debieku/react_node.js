import express from 'express';
import { commentRouter } from  './routers/commentRouter.js'
import { userRouter } from './routers/userRouter.js'
import { todoRouter } from './routers/todoRouter.js'
import { postRouter } from './routers/postRouter.js'
import {logErrors} from './middleware/logError.js'

const app = express();

app.use(express.json());
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/todo', todoRouter);
app.use('/comment', commentRouter);
app.use(logErrors);


app.listen(8080, (err) => {
    // if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});

console.log("yeeeeiiii!!!!!!!!!!!!!")