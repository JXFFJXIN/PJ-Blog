const dbUtil = require("./DBUtil");

module.exports.insertBlog = function (title, content, view, ctime, utime, tags, success) {
    const sql = "insert into blog (`title`, `content`, `view`, `ctime`,`utime`, `tags`) values (?, ?, ?, ?, ?, ?);";
    const params = [title, content, view, ctime, utime, tags];
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

module.exports.queryBlogByPage = function (page, pageSize, success) {
    const sql = "select * from blog order by id desc limit ?,?;";
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

module.exports.queryBlogCount = function (success) {
    const sql = "select count(1) from blog ;";
    const params = [];
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

module.exports.queryBlogById = function(id,success){
const sql = "select * from blog where id = ?;";
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

module.exports.queryBlogAll = function(success){
    const sql = "select * from blog order by id desc;";
    const params = [];
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

module.exports.addView = function(id,success){
    const sql = "update blog set view = view + 1 where id = ?;";
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

module.exports.queryBlogHot = function(success){
    const sql = "select * from blog order by view desc limit 7;";
    const params = [];
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


module.exports.queryBloCountgByTag = function(tag,success){
    const sql = "select * from blog order by view desc where tag;";
    const params = [tag];
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