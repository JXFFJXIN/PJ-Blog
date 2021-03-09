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
        axios({
            method:"get",
            url:`/addView?bid=${bid}`
        }).then(resp=>{
            axios({
                method:"get",
                url:`/queryBlogById?bid=${bid}`
            }).then((resp)=>{
                const element = resp.data.data[0];
                blogDetail.detail = {...blogDetail.detail,...element}
            }).catch((resp)=>{
                console.log("请求失败")
            })
        }).catch((err)=>{
            console.log(err)
        })
        
        

    }
})