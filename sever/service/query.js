
function getQuery(tableName) {
    return `SELECT * FROM new_schema.${tableName} WHERE isActive = 1`;
}

function getByQuery(tableName, key) {
    return `SELECT * FROM new_schema.${tableName} WHERE isActive = 1 AND ${key} = ?`;
}

function addQuery(tableName, keys) {
    return `INSERT INTO new_schema.${tableName} (${keys.map((key, i) => { return key })}) VALUES  (${keys.map((i) => { return '?' })})`;
}

function updateQuery(tableName, keys) {
    return `UPDATE new_schema.${tableName} SET ${keys.map((key, i) => { return key + '= ?' })} WHERE id = ? AND isActive = 1`;
}

function deleteQuery(tableName) {
    return `UPDATE new_schema.${tableName} SET isActive=0 WHERE isActive=1 AND id = ?`;
}

function limit(tableName){
   return `SELECT * FROM new_schema.${tableName} LIMIT ? OFFSET ?;`
    
}

export {
    getQuery,
    getByQuery,
    deleteQuery,
    addQuery,
    updateQuery,
    limit
}