
import { executeQuery } from './db.js';
import { getQuery ,getByIdQuery, deleteQuery} from './getAndDeleteQuerys.js'
import { postPostQuery, updatePostQuery } from './queryPost.js'

const tableName = "new_schema.posts";
export class PostService {
    
    async getPost() {
        const queryPost = getQuery(tableName);
        const result = await executeQuery(queryPost);
        return result;
    }

    async getPostById(id) {
        const queryPost = getByIdQuery(tableName);
        const result =  await executeQuery(queryPost, [id]);
        return result;
    }

    async addPost(postItem) {
        const queryPost = postPostQuery();
        const propertyValues = Object.values(postItem);
        await executeQuery(queryPost, propertyValues);
    }

    async updatePost(postItem, id) {
        const queryPost = updatePostQuery();
        const propertyValues = Object.values(postItem);
        propertyValues.push(id);
        await executeQuery(queryPost, propertyValues);
    }
    
    async deletePost(id) {
        console.log(id)
        const queryPost = deleteQuery(tableName);
        await executeQuery(queryPost,[ id]);
    }
}