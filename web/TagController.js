const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const blogDao = require("../dao/BlogDao")
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
            response.write(respUtil.writeResult("success","查询成功",result))
            response.end();
        }
        blogTagsMappingDao.queryTagsBlogMappingByTagsId(result[0].id,function(result){
            let temp = [];
            result.map(item=>{
                temp.push(item.blog_id);
            })
            response.writeHead(200);
            response.write(respUtil.writeResult("success","查询成功",temp))
            response.end();
        })

        // const BlogList = [];
        // temp.map(item=>{
        //         result.map(item=>{
        //             blogDao.queryBlogById(item.blog_id,function(result){
        //                 let resp = result[0];
        //                 BlogList.push(resp)
                        
        //             })
        //         })
        //     })
        // });
    })
}

function queryCountByTag(request,response){
    const params = url.parse(request.url,true).query;
    tagsDao.queryTag(params.tag,function(result){
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult("success","查询成功",result))
            response.end();
        }
        const temp = [];
        result.map(item=>temp.push(item.id))
        temp.map(item=>{
            blogTagsMappingDao.queryTagsBlogMappingByTagsId(item,function(result){
                response.writeHead(200);
                response.write(respUtil.writeResult("success","查询成功",result.length))
                response.end();
            })
        })
    })
}


path.set("/queryRandomTags",queryRandomTags);
path.set("/queryByTag",queryByTag);
path.set("/queryCountByTag",queryCountByTag);

module.exports.path = path;
