function loginQuery() {
    const query = `SELECT COUNT(*) FROM new_schema.userpassword WHERE userId=? and password=?`;
    return query
}

function registerQuery() {
    const query = `INSERT INTO new_schema.userpassword ( userId, password ) VALUES  ( ?, ? )`;
    return query
}

function updatePassword() {
    return `UPDATE new_schema.userpassword SET password=? WHERE id = ?`;
}

export {
    loginQuery,
    registerQuery
} 