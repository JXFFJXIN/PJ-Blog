const dbUtil = require("./DBUtil");

module.exports.addComment = function (bid, reply, name, content, email, ctime, utime,success) {
    const sql = "insert into comment (`blog_id`, `parent_id`, `user_name`, `comment`,`user_email`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?);";
    const params = [bid, reply, name, content, email, ctime, utime];
    const connection = dbUtil.createConnection();
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

module.exports.queryCommentByPage = function (bid,page, pageSize, success) {
    const sql = "select * from comment where blog_id = ? order by id desc limit ?,?;";
    const params = [bid,page*pageSize, pageSize];
    const connection = dbUtil.createConnection();
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

module.exports.queryCommentAll = function (page, pageSize, success) {
    const sql = "select * from comment order by id desc limit ?,?;";
    const params = [page*pageSize, pageSize];
    const connection = dbUtil.createConnection();
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

module.exports.queryCommentCount = function (bid,success) {
    const sql = "select count(1) from comment where blog_id=?;";
    const params = [bid];
    const connection = dbUtil.createConnection();
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



module.exports.queryCommentById = function(id,success){
const sql = "select * from comment where blog_id = ?;";
    const params = [id];
    const connection = dbUtil.createConnection();
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
