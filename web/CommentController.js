const commentDao = require("../dao/CommentDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
// 验证码逻辑：
// 1. 安装并引入svg-captcha
// 2. 在业务逻辑中创建随机图并返回
// captcha.create({类css样式})
// 3. 通过axios访问对应的地址获取随机图的data和text
const captcha = require("svg-captcha")
const url = require("url");
const path = new Map();

function queryRandomCode(request,response){
    const img = captcha.create({
        fontSize:50,
        width:100,
        height:34
    })
    response.writeHead(200);
    response.write(respUtil.writeResult("success","添加成功",img));
    response.end();
}

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
path.set("/queryRandomCode",queryRandomCode)
module.exports.path = path;