import mysql from 'mysql2/promise'

const db = await mysql.createPool({
    host: 'localhost',      
    user: 'root',           
    password: 'dbadmin',           
    database: 'dissertation_management_system',   
});

export default db; 