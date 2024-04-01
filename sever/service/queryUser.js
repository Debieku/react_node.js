
function postUserQuery() {
    const query = `INSERT INTO new_schema.users (name, email, phone) VALUES  ( ?, ?, ? )`;
    return query
}

function updateUserQuery() {
    const query = `UPDATE new_schema.users SET name=?, email=?, phone=? WHERE id = ? AND isActive=1`;
    return query
}

function getByNameQuery() {
    const query = `SELECT * FROM  new_schema.users  where isActive=1 AND userName = ?`;
    return query
}

export {
    postUserQuery,
    updateUserQuery,
    getByNameQuery
}
