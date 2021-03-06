var dbUtil = require("./DBUtil");

function insertEveryDay(content, ctime, success) {
    var insertsql = "insert into everyday (`content`,`ctime`) values (?,?);";
    var params = [content, ctime];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertsql, params, function (error, result) {
        if (error) {
            console.log("失败")
            return Error(error);
        } else {
            console.log("成功")
            success(result);
        }
    });
    connection.end();
}

function queryEveryDay(success) {
    var querysql = "SELECT * FROM everyday order by id desc limit 1;";
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querysql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;