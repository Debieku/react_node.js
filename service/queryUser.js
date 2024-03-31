
function postUserQuery() {
    const query = `INSERT INTO new_schema.users VALUES  ( ?, ?, ?, ?, 1 )`;
    return query
}

function updateUserQuery() {
    const query = `UPDATE new_schema.users SET name=?, email=?, phone=? WHERE id = ? AND isActive=1`;
    return query
}

export {
    postUserQuery,
    updateUserQuery
}
