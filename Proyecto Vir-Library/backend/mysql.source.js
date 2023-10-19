import mysql from "mysql";

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'admin',
    password : '123456',
    database : 'tpf_2'
});

export default connection;