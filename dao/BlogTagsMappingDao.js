var dbUtil = require("./DBUtil");

function insertTagsBlogMapping(blogId, tagsId,ctime,utime, success) {
    var sql = "insert into tags_blog_mapping (`blog_id`, `tag_id`,`ctime`,`utime`) values (?, ?,?,?);";
    var params = [blogId, tagsId,ctime,utime];
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

function queryTagsBlogMappingByBlogId(blogId, success) {
    var sql = "select * from tags_blog_mapping where blog_id = ?;";
    var params = [blogId];
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

function queryTagsBlogMappingByTagsId(tagsId, success) {
    var sql = "select * from tags_blog_mapping where tag_id = ?;";
    var params = [tagsId];
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

module.exports.insertTagsBlogMapping = insertTagsBlogMapping;
module.exports.queryTagsBlogMappingByBlogId = queryTagsBlogMappingByBlogId;
module.exports.queryTagsBlogMappingByTagsId = queryTagsBlogMappingByTagsId;