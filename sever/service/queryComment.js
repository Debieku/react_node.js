
function postCommentQuery() {
    const query = `INSERT INTO new_schema.comments ( postId, email, name, body ) VALUES  ( ?, ?, ?, ? )`;
    return query
}

function updateCommentQuery() {
    const query = `UPDATE new_schema.comments SET name=?, body=? WHERE id = ? AND isActive=1`;
    return query
}

function getCommentByPostIdQuery() {
    const query = `SELECT * FROM new_schema.comments where isActive=1 AND postId = ?`;
    return query
}

export {
    postCommentQuery,
    updateCommentQuery,
    getCommentByPostIdQuery
}
