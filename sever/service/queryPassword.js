
function postPasswordQuery() {
    const query = `INSERT INTO new_schema.password ( userId, password ) VALUES  ( ?, ? )`;
    return query
}



export {
    postPasswordQuery
    
}