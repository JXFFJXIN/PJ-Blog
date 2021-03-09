const randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:[]
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
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then((resp)=>{
            const ele = resp.data.data;
            ele.map(item=>{randomTags.tags.push(item.tag);})
        }).catch((err)=>{
            console.log(err)
        })
    }
})

const newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[]
    },
    computed:{

    },
    created(){
        axios({
            method:"get",
            url:"/queryBlogHot"
        }).then((resp)=>{
            const ele = resp.data.data;
            ele.map(item=>{
                let temp = {
                    title:item.title,
                    link:`/blog_detail.html?bid=${item.id}`,
                    id:item.id
                };
                newHot.titleList.push(temp)
            })
        }).catch((err)=>{
            console.log(err)
        })
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