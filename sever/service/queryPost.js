
function postPostQuery() {
    const query = `INSERT INTO new_schema.posts ( userId, title, body) VALUES  ( ?, ?, ? )`;
    return query
}

function updatePostQuery() {
    const query = `UPDATE new_schema.posts SET title=?, body=? WHERE id = ? AND isActive=1`;
    return query
}

export {
    postPostQuery,
    updatePostQuery
}
