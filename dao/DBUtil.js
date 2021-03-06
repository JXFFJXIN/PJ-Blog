var mysql = require("mysql2");

function createConnection() {
    var connection = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "961211",
        database: "blogdb"
    });
    return connection;
}

module.exports.createConnection = createConnection;