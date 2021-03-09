const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const tagsDao = require("../dao/TagsDao");
const blogTagsMappingDao = require("../dao/BlogTagsMappingDao");
const url = require("url");

let path = new Map();

function queryRandomTags(request,response){
    tagsDao.queryAllTags(function(resp){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",resp))
        response.end();
    })
}

function queryByTag(request,response){
    const params = url.parse(request.url,true).query;
    tagsDao.queryTag(params.tag,function(result){
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult("success","查询成功",resp))
            response.end();
        }
        blogTagsMappingDao.queryTagsBlogMappingByTagsId(result[0].tag,function(result){
            
        })
    })
}


path.set("/queryRandomTags",queryRandomTags);
path.set("/queryByTag",queryByTag);
module.exports.path = path;
