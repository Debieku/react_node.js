
function getTodosQuery() {
    const query = `SELECT * FROM new_schema.todos where isActive=1`;
    return query
}

function getTodosByIdQuery() {
    const query = `SELECT * FROM new_schema.todos  where isActive=1 AND id = ?`;
    return query
}

function postTodoQuery() {
    
    const query = ` INSERT INTO new_schema.todos VALUES  (?)`;
    return query
}

function updateTodoQuery() {
    
    const query = ` UPDATE new_schema.todos SET ?  WHERE id = ? AND isActive=1`;
    return query
}


function deleteTodoQuery() {
    
    const query = ` UPDATE new_schema.todos SET isActive=0  WHERE isActive=1 AND id = ?`;
    return query
}
export {
    getTodosQuery, getTodosByIdQuery,postTodoQuery,updateTodoQuery,deleteTodoQuery
}