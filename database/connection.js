const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'xxxx',
    database: 'xxxx',
    port: 3306,
    user: 'admin',
    password: 'xxxxxxx',
});

connection.connect;
module.exports = connection;