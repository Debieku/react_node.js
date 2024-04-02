
function postTodoQuery() {
    const query = ` INSERT INTO new_schema.todos (userId,title,completed) VALUES  ( ?,?,?)`;
    return query
}

function updateTodoQuery() {
    const query = `UPDATE new_schema.todos SET title=?, completed=?  WHERE id = ? AND isActive=1`;
    return query
}

function getTodoByUserIdQuery() {
    const query = `SELECT * FROM new_schema.todos where isActive=1 AND userId = ?`;
    return query
}



export {
    postTodoQuery,
    updateTodoQuery,
    getTodoByUserIdQuery
}