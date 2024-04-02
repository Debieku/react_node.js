
import { executeQuery } from './db.js';
import { getQuery ,getByIdQuery, deleteQuery} from './getAndDeleteQuerys.js'
import { postCommentQuery, updateCommentQuery,getCommentByPostIdQuery } from './queryComment.js'

const tableName = "new_schema.comments";
export class CommentService {
    
    async getComment() {
        const queryComment = getQuery(tableName);
        const result = await executeQuery(queryComment);
        return result;
    }

    async getCommentByPostId(postId){
        const queryComment = getCommentByPostIdQuery();
        const result = await executeQuery(queryComment, [postId]);
        return result;
   }

    async getCommentById(id) {
        const queryComment = getByIdQuery(tableName);
        const result =  await executeQuery(queryComment, [id]);
        return result;
    }

    async addComment(commentItem) {
        const queryComment = postCommentQuery();
        const propertyValues = Object.values(commentItem);
        const result = await executeQuery(queryComment, propertyValues);
        return result;
    }

    async updateComment(commentItem, id) {
        const queryComment = updateCommentQuery();
        const propertyValues = Object.values(commentItem);
        propertyValues.push(id);
        await executeQuery(queryComment, propertyValues);
    }
    
    async deleteComment(id) {
        console.log(id)
        const queryComment = deleteQuery(tableName);
        await executeQuery(queryComment,[ id]);
    }
}