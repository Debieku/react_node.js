
function getQuery(tableName) {
    const query = `SELECT * FROM ${tableName} where isActive=1`;
    return query
}

function getByIdQuery(tableName) {
    const query = `SELECT * FROM ${tableName}  where isActive=1 AND id = ?`;
    return query
}

function deleteQuery(tableName) {
    const query = `UPDATE ${tableName} SET isActive=0  WHERE isActive=1 AND id = ?`;
    return query
}

export {
    getQuery,
    getByIdQuery,
    deleteQuery
}