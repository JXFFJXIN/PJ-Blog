const blogDao = require("../dao/BlogDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const tagsDao = require("../dao/TagsDao");
const blogTagsMappingDao = require("../dao/BlogTagsMappingDao");
const url = require("url");

let path = new Map();

function addBlog(request,response){
    // 响应数据data
    request.on("data",function(data){
        const txt = JSON.parse(data.toString())
        blogDao.insertBlog(txt.title, decodeURI(txt.content), 0, timeUtil.getNow(),timeUtil.getNow(), txt.tags, function (result) {
            let tags = txt.tags.split(",");
            let id = result.insertId;
            for(let i = 0; i < tags.length;i++){
                if(tags[i]==""){
                    continue;
                }
                let tag = tags[i];
                tagsDao.queryTag((tag),function(result){
                    if(result==null||result.length==0){
                        tagsDao.insertTag(tag,timeUtil.getNow(),timeUtil.getNow(),function(result){
                            console.log("标签插入成功")
                            blogTagsMappingDao.insertTagsBlogMapping(id,result.insertId,timeUtil.getNow(),timeUtil.getNow(),function(result){
                                console.log("标签文章成功映射")
                            });
                        })
                    }else{
                        console.log(result[0].id);
                        blogTagsMappingDao.insertTagsBlogMapping(id,result[0].id,timeUtil.getNow(),timeUtil.getNow(),function(result){
                            console.log("标签文章成功映射")
                        })
                    }
                });
            }
            response.writeHead(200);
            response.end(JSON.stringify({status: 1, msg: "ok"}));
        });
    })
}

function queryBlogByPage(request,response){
    const params = url.parse(request.url,true).query;
    blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function(result){
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<[a-zA-Z0-9]+>/g, "");
            result[i].content = result[i].content.replace(/<\/[a-zA-Z0-9]+>/g, "");
            result[i].content = result[i].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
            result[i].ctime = timeUtil.timeFormat(result[i].ctime);
            if(result[i].content.length > 300) {
                result[i].content = result[i].content.substr(0, 300);
            }
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    });
}

function queryBlogById(request,response){
    const params = url.parse(request.url,true).query;
    blogDao.queryBlogById(parseInt(params.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

function addView(request,response){
    const params = url.parse(request.url,true).query;
    blogDao.addView(parseInt(params.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })

}

function queryBlogHot(request,response){
    blogDao.queryBlogHot(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

function queryBlogCount(request,response){
    blogDao.queryBlogCount(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

function queryBlogAll(request,response){
    blogDao.queryBlogAll(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

path.set("/addBlog",addBlog);
path.set("/queryBlogByPage",queryBlogByPage);
path.set("/queryBlogCount",queryBlogCount)
path.set("/queryBlogById",queryBlogById)
path.set("/queryBlogAll",queryBlogAll)
path.set("/queryBlogHot",queryBlogHot)
path.set("/addView",addView)

module.exports.path = path;
