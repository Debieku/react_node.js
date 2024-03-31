
function postPostQuery() {
    const query = `INSERT INTO new_schema.posts VALUES  ( ?, ?, ?, ?, 1 )`;
    return query
}

function updatePostQuery() {
    const query = `UPDATE new_schema.posts SET name=?, email=?, phone=? WHERE id = ? AND isActive=1`;
    return query
}

export {
    postPostQuery,
    updatePostQuery
}
