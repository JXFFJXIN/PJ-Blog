
const everyday = new Vue({
    el:"#everyday",
    data:{
        content:"",
    },
    computed:{
        getContent(){
            return this.content
        }
    },
    created(){
        // 请求数据给content赋值
        axios({
            url: "/queryEveryDay",
            method: "get"
        }).then(function(resp){
            everyday.content = resp.data.data[0].content;
        });
    }
})

const articleList = new Vue({
    el:"#article_list",
    data:{
        page:1,
        pageSize:5,
        count:1,
        pageToolList:[],
        articleList:[
            // {
            //     title:"这个是标题",
            //     content:"介是内容介是内容介是内容介是内容介是内容介是内容介是内容介是内容",
            //     date:"2018-01-01",
            //     views:"101",
            //     tags:"test1 test2",
            //     id:"1",
            //     link:""
            // },

        ]
    },
    computed:{
        changePage(){
            return function(page){
                this.getArticleList(page,this.pageSize);
                this.page = page;
            }
        },
        getArticleList(){
            return function(page,pageSize){
                let searchUrlParams = location.search.indexOf("?")>-1?location.search.split("?")[1].split("$"):"",
                    tag ;
                for (let i = 0; i < searchUrlParams.length; i++) {
                    const element = searchUrlParams[i];
                    if(element.split("=")[0]=="tag"){
                        try{
                            tag = element.split("=")[1];
                        }catch(e){
                            console.log(e)
                        }
                    }
                }
                if(!tag){
                    axios({
                        method:"get",
                        url:`/queryBlogByPage?page=${page-1}&pageSize=${pageSize}`,
                    }).then(function(resp){
                        const result = resp.data.data;
                        const list = [];
                        for(let i = 0;i<result.length;i++){
                            let temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.views = result[i].view;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.date = result[i].ctime;
                            temp.link = `/blog_detail.html?bid=${result[i].id}`;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                    }).catch(function(error){
                        console.log("请求错误"+error)
                    });
                    axios({
                        method:"get",
                        url:"/queryBlogCount"
                    }).then(function(resp){
                        articleList.count = resp.data.data[0]["count(1)"]
                        articleList.generatePageTool;
                    }).catch(function(error){
                        console.log("请求失败")
                    })
                }else{
                    axios({
                        method:"get",
                        url:`/queryByTag?tag=${tag}`,
                    }).then((resp)=>{
                        resp.data.data.map(item=>{
                            axios({
                                method:"get",
                                url:`queryBlogById?bid=${item}`
                            }).then((resp)=>{
                                const result = resp.data.data;
                                let temp = {};
                                temp.title = result[0].title;
                                temp.content = result[0].content;
                                temp.views = result[0].view;
                                temp.tags = result[0].tags;
                                temp.id = result[0].id;
                                temp.date = result[0].ctime;
                                temp.link = `/blog_detail.html?bid=${result[0].id}`;
                                articleList.articleList.push(temp);
                            }).catch((err)=>{
                                console.log(err)
                            })
                        })
                        
                        articleList.count = resp.data.data.length
                        articleList.generatePageTool;
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
                
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
        }
    },
    created(){
        this.getArticleList(this.page,this.pageSize);
    }
})

