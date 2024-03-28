
function getUsersQuery() {
    const query = `SELECT * FROM new_schema.users where isActive=1`;
    return query
}

function getUsersByIdQuery() {
    const query = `SELECT * FROM new_schema.users  where isActive=1 AND id = ?`;
    return query
}

function postQuery() {
    
    const query = ` INSERT INTO new_schema.users VALUES  (?)`;
    return query
}

function updateQuery() {
    
    const query = ` UPDATE new_schema.users SET ?  WHERE id = ? AND isActive=1`;
    return query
}


function deleteQuery() {
    
    const query = ` UPDATE new_schema.users SET isActive=0  WHERE isActive=1 AND id = ?`;
    return query
}
export {
    getUsersQuery, getUsersByIdQuery,postQuery,updateQuery,deleteQuery
}