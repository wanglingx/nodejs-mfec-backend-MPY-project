const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mfec-project.cp8i9vsvhtho.ap-southeast-1.rds.amazonaws.com',
    database: 'toughhuman',
    port: 3306,
    user: 'admin',
    password: 'c280a1e0c8b6aa09d1d59f4e',
});

connection.connect;
module.exports = connection;