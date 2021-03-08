const express = require('express');
const globalConfig = require('./config');
const loader = require("./loader");

const app = new express();

app.use(express.static("./page/"));

app.post("/editEveryDay",loader.get("/editEveryDay"))
app.get("/queryEveryDay",loader.get("/queryEveryDay"))
app.post("/addBlog",loader.get("/addBlog"))
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"))
app.get("/queryBlogCount",loader.get("/queryBlogCount"))
app.get("/queryBlogById",loader.get("/queryBlogById"))
app.post("/addComment",loader.get("/addComment"))
app.get("/queryCommentByPage",loader.get("/queryCommentByPage"))
app.get("/queryCommentCount",loader.get("/queryCommentCount"))
app.get("/queryCommentAll",loader.get("/queryCommentAll"))

app.listen(globalConfig.port,function(){
    console.log("!!!服务器已开启!!!");
})
