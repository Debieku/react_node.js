
function postTodoQuery() {
    const query = ` INSERT INTO new_schema.todos (userId,title,completed) VALUES  ( ?,?,?)`;
    return query
}

function updateTodoQuery() {
    const query = `UPDATE new_schema.todos SET title=?, completed=?  WHERE id = ? AND isActive=1`;
    return query
}

export {
    postTodoQuery,
    updateTodoQuery,
}