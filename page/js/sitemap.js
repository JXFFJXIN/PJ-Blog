var blogList = new Vue({
    el:"#blog_list",
    data:{
        blogList:[],
    },
    computed:{

    },
    created(){
        axios({
            method:"get",
            url:"/queryBlogAll",
        }).then((resp)=>{
            const ele = resp.data.data;
            for (let i = 0; i < ele.length; i++) {
                const element = ele[i];
                let temp = {};
                temp.content = element.title
                temp.id = element.id
                temp.link = `/blog_detail.html?bid=${element.id}`
                blogList.blogList.push(temp);
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
})