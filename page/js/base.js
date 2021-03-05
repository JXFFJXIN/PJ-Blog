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
        commentList:[
            {
                name:"用户名",
                date:"2018-10-10",
                comment:"这里是一堆评论，这里是一堆评论，这里是一堆评论，这里是一堆评论",
                id:"1"
            },
            {
                name:"用户名",
                date:"2018-10-10",
                comment:"这里是一堆评论，这里是一堆评论，这里是一堆评论，这里是一堆评论",
                id:"2"
            },
            {
                name:"用户名",
                date:"2018-10-10",
                comment:"这里是一堆评论，这里是一堆评论，这里是一堆评论，这里是一堆评论",
                id:"3"
            },
            {
                name:"用户名",
                date:"2018-10-10",
                comment:"这里是一堆评论，这里是一堆评论，这里是一堆评论，这里是一堆评论",
                id:"4"
            },
            {
                name:"用户名",
                date:"2018-10-10",
                comment:"这里是一堆评论，这里是一堆评论，这里是一堆评论，这里是一堆评论",
                id:"5"
            },
            {
                name:"用户名",
                date:"2018-10-10",
                comment:"这里是一堆评论，这里是一堆评论，这里是一堆评论，这里是一堆评论",
                id:"6"
            },
            {
                name:"用户名",
                date:"2018-10-10",
                comment:"这里是一堆评论，这里是一堆评论，这里是一堆评论，这里是一堆评论",
                id:"7"
            },
            {
                name:"用户名",
                date:"2018-10-10",
                comment:"这里是一堆评论，这里是一堆评论，这里是一堆评论，这里是一堆评论",
                id:"8"
            }
        ]
    },
    computed:{

    },
    created(){
        
    }
})