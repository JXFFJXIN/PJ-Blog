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
            {
                title:"这个是标题",
                content:"介是内容介是内容介是内容介是内容介是内容介是内容介是内容介是内容",
                date:"2018-01-01",
                views:"101",
                tags:"test1 test2",
                id:"2",
                link:""
            },
            {
                title:"这个是标题",
                content:"介是内容介是内容介是内容介是内容介是内容介是内容介是内容介是内容",
                date:"2018-01-01",
                views:"101",
                tags:"test1 test2",
                id:"3",
                link:""
            },

        ]
    },
    computed:{

    },
    created(){
        
    }
})