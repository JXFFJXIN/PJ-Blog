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
        count:100,
        articleList:[
            {
                title:"这个是标题",
                content:"介是内容介是内容介是内容介是内容介是内容介是内容介是内容介是内容",
                date:"2018-01-01",
                views:"101",
                tags:"test1 test2",
                id:"1",
                link:""
            },

        ]
    },
    computed:{
        getArticleList(){
            return function(page,pageSize){
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
                        temp.link = ""+result[i].id;
                        list.push(temp);
                    }
                    articleList.articleList = list;
                }).catch(function(error){
                    console.log("请求错误"+error)
                })
            }
        }
    },
    created(){
        this.getArticleList(this.page,this.pageSize);
    }
})