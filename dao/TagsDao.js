var dbUtil = require("./DBUtil");

function insertTag(tag,ctime,utime, success) {
    var sql = "insert into tags (`tag`,`ctime`,`utime`) values (?,?,?);";
    var params = [tag,ctime,utime];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

function queryTag(tag, success) {
    var sql = "select * from tags where tag = ?;";
    var params = [tag];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

function queryAllTags(success) {
    var sql = "select * from tags ;";
    var connection = dbUtil.createConnection();
    var params = [];
    connection.connect();
    connection.query(sql,params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTags = queryAllTags;