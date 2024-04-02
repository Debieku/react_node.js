function loginQuery() {
    const query = `SELECT COUNT(*) FROM new_schema.userpassword WHERE userId=? and password=?`;
    return query
}

function registerQuery() {
    const query = `INSERT INTO new_schema.userpasswords (userName, password ) VALUES  ( ?, ? )`;
    return query
}


export {loginQuery,
    registerQuery} 