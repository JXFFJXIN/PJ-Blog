const commentDao = require("../dao/CommentDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const url = require("url");

const path = new Map();

function addComment(request,response){
    request.on("data",function(data){
        const jsonData = JSON.parse(data.toString())
        commentDao.addComment(
            parseInt(jsonData.bid),
            parseInt(jsonData.reply),
            jsonData.name,
            jsonData.content,
            jsonData.email,
            timeUtil.getNow(),
            timeUtil.getNow(),
            function(result){
                response.writeHead(200);
                response.write(respUtil.writeResult("success","添加成功",result));
                response.end();
            }
        )
    })
}

function queryCommentByPage(request,response){
    const params = url.parse(request.url,true).query;
    console.log(params);
    commentDao.queryCommentByPage(parseInt(params.bid),parseInt(params.page),parseInt(params.pageSize),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    });
}

function queryCommentAll(request,response){
    const params = url.parse(request.url,true).query;
    console.log(params)
    commentDao.queryCommentAll(parseInt(params.page),parseInt(params.pageSize),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    });
}



function queryCommentCount(request,response){
    const params = url.parse(request.url,true).query;
    commentDao.queryCommentCount(parseInt(params.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

path.set("/addComment",addComment);
path.set("/queryCommentByPage",queryCommentByPage);
path.set("/queryCommentCount",queryCommentCount);
path.set("/queryCommentAll",queryCommentAll);
module.exports.path = path;