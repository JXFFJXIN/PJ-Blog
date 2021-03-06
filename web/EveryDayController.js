// var app = require("../express");
// var url = require("url");
// var everyDayDao = require("../dao/EveryDayDao");
// var timeUtil = require("../util/TimeUtil");

// app.get("/blog/addEveryDay", function (request, response) {
//     var params = url.parse(request.url, true).query;
//     everyDayDao.insertEveryDay(params.content, timeUtil.getNow(), function (result) {
//         response.writeHead(200);
//         response.end(JSON.stringify({status: 1, msg: "success"}));
//     });
// });

// app.get("/blog/getEveryDay", function (request, response) {
//     everyDayDao.queryLastEveryDay(function (result) {
//         response.writeHead(200);
//         response.end(JSON.stringify(result));
//     });
// });
const everyDayDao = require("../dao/EveryDayDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
let path = new Map();

function editEveryDay(request,response){
    // 响应数据data
    request.on("data",function(data){
        // 执行数据逻辑
        everyDayDao.insertEveryDay(data.toString().trim(),timeUtil.getNow(),function(result){
            // console.log(result)
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
        })
    })
}

function queryEveryDay(request,response){
    // 响应数据data
    everyDayDao.queryEveryDay(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result));
        response.end();
    })
}

path.set("/editEveryDay",editEveryDay);
path.set("/queryEveryDay",queryEveryDay);

module.exports.path = path;

