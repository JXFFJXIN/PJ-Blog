var blogDetail = new Vue({
    el:"#blog_detail",
    data:{
        detail:{
            title:"",
            content:"",
            ctime:"",
            tags:"",
            view:"",
        }
    },
    computed:{

    },
    created(){
        let searchUrlParams = location.search.indexOf("?")>-1?location.search.split("?")[1].split("$"):"",
            bid = -1;
        if(searchUrlParams == ""){
            return;
        }
        for (let i = 0; i < searchUrlParams.length; i++) {
            const element = searchUrlParams[i];
            if(element.split("=")[0]=="bid"){
                bid = element.split("=")[1];
            }
        }
        console.log(bid)
        axios({
            method:"get",
            url:`/queryBlogById?bid=${bid}`
        }).then((resp)=>{
            const element = resp.data.data[0];
            // blogDetail.title = element.title
            // blogDetail.id = element.id
            // blogDetail.tags = element.tags
            // blogDetail.ctime = element.ctime
            // blogDetail.view = element.view
            // blogDetail.content = element.content
            blogDetail.detail = {...blogDetail.detail,...element}
        }).catch((resp)=>{
            console.log("请求失败")
        })

    }
})