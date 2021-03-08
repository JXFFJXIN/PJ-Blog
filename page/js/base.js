const randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:["asd","dsded","dsndifjie","sdsuncbxoi","dsdhei","dshdiushnd","sdedn","asd","dsded","dsndifjie","sdsuncbxoi","dsdhei","dshdiushnd","sdedn"]
    },
    computed:{
        randomColor(){
            return function(){
                let red = Math.random()*255>150?150:Math.random()*255;
                let green = Math.random()*255>150?150:Math.random()*255;
                let blue = Math.random()*255>150?150:Math.random()*255;
                return `rgb(${red},${green},${blue})`
            }
        }
    },
    created(){

    }
})

const newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[
            {
                title:"这是一个链接",
                link:"http://www.baidu.com",
                id:"1",
            },
            {
                title:"这是一个链接",
                link:"http://www.baidu.com",
                id:"1",
            },
            {
                title:"这是一个链接",
                link:"http://www.baidu.com",
                id:"2",
            },
            {
                title:"这是一个链接",
                link:"http://www.baidu.com",
                id:"3",
            },
            {
                title:"这是一个链接",
                link:"http://www.baidu.com",
                id:"4",
            },
            {
                title:"这是一个链接",
                link:"http://www.baidu.com",
                id:"5",
            },
            {
                title:"这是一个链接",
                link:"http://www.baidu.com",
                id:"6",
            },
            {
                title:"这是一个链接",
                link:"http://www.baidu.com",
                id:"7",
            },
            {
                title:"这是一个链接",
                link:"http://www.baidu.com",
                id:"8",
            },
            {
                title:"这是一个链接",
                link:"http://www.baidu.com",
                id:"9",
            }
        ]
    },
    computed:{

    },
    created(){

    }
})

const newComments = new Vue({
    el:"#new_comments",
    data:{
        page:1,
        pageSize:5,
        commentList:[]
    },
    computed:{
        getCommentList(){
            return function(page,pageSize){
                axios({
                    method:"get",
                    url:`/queryCommentAll?page=${page-1}&pageSize=${pageSize}`,
                }).then(function(resp){
                    const result = resp.data.data;
                    const list = [];
                    for(let i = 0;i<result.length;i++){
                        let temp = {};
                        temp.name = result[i].user_name;
                        temp.reply = result[i].parent_id;
                        temp.id = result[i].id;
                        temp.comment = result[i].comment;
                        temp.date = result[i].ctime;
                        list.push(temp);
                    }
                    newComments.commentList = list;
                }).catch(function(error){
                    console.log("请求错误"+error)
                });
            }
        },
    },
    created(){
        this.getCommentList(this.page,this.pageSize)
    }
})