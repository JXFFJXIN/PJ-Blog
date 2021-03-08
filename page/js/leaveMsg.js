const comment = new Vue({
    el:"#comment",
    data:{
        page:1,
        pageSize:5,
        count:0,
        pageToolList:[],
        commentList:[]
    },
    computed:{
        changePage(){
            return function(page){
                this.getCommentList(page,this.pageSize);
                this.page = page;
            }
        },
        getCommentList(){
            return function(page,pageSize){
                let searchUrlParams = location.search.indexOf("?")>-1?location.search.split("?")[1].split("$"):"",
                    bid ;
                if(searchUrlParams == ""){
                    return;
                }
                for (let i = 0; i < searchUrlParams.length; i++) {
                    const element = searchUrlParams[i];
                    if(element.split("=")[0]=="bid"){
                        try{
                            bid = element.split("=")[1];
                        }catch(e){
                            console.log(e)
                        }
                    }
                }
                console.log(bid)
                axios({
                    method:"get",
                    url:`/queryCommentByPage?page=${page-1}&pageSize=${pageSize}&bid=${bid}`,
                }).then(function(resp){
                    const result = resp.data.data;
                    const list = [];
                    for(let i = 0;i<result.length;i++){
                        let temp = {};
                        temp.name = result[i].user_name;
                        temp.reply = result[i].parent_id;
                        temp.id = result[i].id;
                        temp.content = result[i].comment;
                        temp.ctime = result[i].ctime;
                        list.push(temp);
                    }
                    comment.commentList = list;
                    // console.log(comment.commentList)
                }).catch(function(error){
                    console.log("请求错误"+error)
                });
                axios({
                    method:"get",
                    url:`/queryCommentCount?bid=${bid}`
                }).then(function(resp){
                    comment.count = resp.data.data[0]["count(1)"]
                    comment.generatePageTool;
                    // console.log(comment.count)
                }).catch(function(error){
                    console.log("请求失败")
                })
            }
        },
        generatePageTool(){
            let newPage = this.page,
                pageSize = this.pageSize,
                totalCount = this.count,
                result = [];
            result.push({text:"<<",page:1})
            if(newPage>2){
                result.push({text:newPage-2,page:newPage-2});
            }
            if(newPage>1){
                result.push({text:newPage-1,page:newPage-1});
            }
            result.push({text:newPage,page:newPage});
            if(newPage + 1<=(totalCount+pageSize-1)/pageSize){
                result.push({text:newPage+1,page:newPage+1});
            }
            if(newPage + 2<=(totalCount+pageSize-1)/pageSize){
                result.push({text:newPage+2,page:newPage+2});
            }
            result.push({text:">>",page:parseInt((totalCount+pageSize-1)/pageSize)})
            this.pageToolList = result;
            return result;
        },
        sendComment(){
            return function(){
                let searchUrlParams = location.search.indexOf("?")>-1?location.search.split("?")[1].split("$"):"",
                    bid ;
                if(searchUrlParams == ""){
                    return;
                }
                for (let i = 0; i < searchUrlParams.length; i++) {
                    const element = searchUrlParams[i];
                    if(element.split("=")[0]=="bid"){
                        try{
                            bid = element.split("=")[1];
                        }catch(e){
                            console.log(e)
                        }
                    }
                }
                let reply = document.getElementById("comment_reply").value,
                name = document.getElementById("comment_name").value,
                email = document.getElementById("comment_email").value,
                content = document.getElementById("comment_content").value,
                data={
                    bid,
                    reply,
                    name,
                    email,
                    content
                }
                axios({
                    method:"post",
                    url:"/addComment",
                    data:data,
                }).then((resp)=>{
                    // console.dir("请求成功,"+resp)
                    comment.getCommentList(comment.page,comment.pageSize);
                }).catch((err)=>{
                    // console.log("请求失败,"+err)
                })
                
            }
        }
        
    },
    created(){
        this.getCommentList(this.page,this.pageSize);
    } 
})