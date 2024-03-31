
function postCommentQuery() {
    const query = `INSERT INTO new_schema.comments VALUES  ( ?, ?, ?, ?, 1 )`;
    return query
}

function updateCommentQuery() {
    const query = `UPDATE new_schema.comments SET name=?, email=?, phone=? WHERE id = ? AND isActive=1`;
    return query
}

export {
    postCommentQuery,
    updateCommentQuery
}
