<template>
    <div>
        <top-menu></top-menu>
        <div class="middle" id="center-top">
            <el-carousel indicator-position="none" height="200px">
                <el-carousel-item v-for="item in 4" :key="item">
                
                </el-carousel-item>
            </el-carousel>
            <div class="person">
                <img class="picture" :src="userinfo.avatar" alt="">
                <div class="username">
                    {{userinfo.nickname}}
                </div>

                <div style="margin: 20px 0" class="edit" @click="edit">
                    <el-button type="primary" plain>编辑个人资料</el-button>
                </div>
            </div>

            <div class="pre-left">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="我的收藏" name="first" >
                        <el-main id="el-main">
                    <div
                        v-for="t in objectlist"
                        :key="t.tid"
                        class="cont"
                    >
                        <router-link
                            :to="{ path: '/topicinfo', query: { tid: t.tid } }"
                            class="a"
                        >
                            <p class="title">{{ t.title }}</p>
                            
                            <p v-html="t.content"></p>
                         
                        </router-link>
                    </div>
                </el-main>             
                        </el-tab-pane
                    >
                    <el-tab-pane label="我的文章" name="second"
                        >
                         <el-main id="el-main">
                    <div
                        v-for="t in articlelist"
                        :key="t.tid"
                        class="cont"
                    >
                        <router-link
                            :to="{ path: '/topicinfo', query: { tid: t.tid } }"
                            class="a"
                        >
                            <p class="title">{{ t.title }}</p>
                            <p v-html="t.content"></p>
                        </router-link>
                    </div>
                </el-main> 
                        </el-tab-pane>
                </el-tabs>



            </div>
            <div class="pre-right">
                <div class="writeclick" @click="writewz">
                    <i class="el-icon-edit-outline"></i>点击写文章
                </div>
                <div class="pre-rightbottom">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: "first",
            userinfo:[],
            tid:[],
            objectlist:[],
            articlelist:[]    
        };
    },
    methods: {
        handleClick(tab, event) {
            // if(tab._uid=="35"){
                     this.axios.post("/user/getarticle", {
                data:{uid: localStorage.getItem("uid"),}
            })
            .then((response)=> {
                this.articlelist=response.data
            })
            // }
        },
        writewz() {
            this.$router.push({ name: "write" });
        },
        edit() {
            this.$router.push({ name: "editinfo" });
        },
        getcoll(str){
   this.axios.post("/user/getcollectiontopic", {
                data:{tid:str}
            })
            .then((response)=> {
                // console.log(response.data);
                this.objectlist=response.data
            })
   
        }
    },
    created: function() {
        // console.log(localStorage.getItem("uid"));
        this.axios.post("/user/getuserinfo", {
                uid: localStorage.getItem("uid"),
            })
            .then((response)=> {
                // console.log(response);
                this.userinfo = response.data[0]
            })
           

             this.axios.post("/user/getcollection", {
                uid: localStorage.getItem("uid"),
            })
            .then((response)=> {
                // console.log(response);
                this.tid = response.data.resu
                // console.log(this.tid)
                var str=this.tid.join(",")
                // console.log(str)
                    this.getcoll(str)
                    

            })
            this.handleClick()
           
    },
    
    
      
};
</script>
<style>

.pre-left .title{
    text-align: left;
    widows: 100%;
}
.pre-left .cont img{
    float: left;
    width: 200px;

}

body {
    background-color: #f6f6f6;
}
.middle {
    width: 1000px;
    margin: 0 auto;

    /* height: auto; */
    background-color: white;
    position: relative;
}
#center-top {
    margin-top: 2px;
}
.person {
    width: 100%;
    height: 80px;
    background-color: pink;
    position: relative;
}
.person .picture{
    position: absolute;
    top: -40px;
    left: 0;
    width: 100px;
    height: 100px;
    background-color: #E7E7E7;
    z-index: 9999;
}

.username {
    /* background-color: #2C3E50; */
    width: 200px;
    height: 50px;
    position: absolute;
    top: 10px;
    left: 110px;
    line-height: 50px;
    font-size: 20px;
    text-align: left;
    /* color: aqua; */
}
.edit {
    position: absolute;
    right: 20px;
}
.pre-left {
    width: 74%;
    /* height: 300px; */
    /* background-color: #a82aa1; */
    float: left;
}
.pre-right {
    width: 25%;
    height: 300px;
    float: left;
    margin-left: 10px;
}
.pre-rightbottom{
    /* background-color: red; */
    height: 200px;
    border: 1px solid #409EFF;
}
.middle::after{
    content: '';
    display: block;
    clear: both;
}
#pane-first{
    height: 1000px;
}
.writeclick {
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    line-height: 80px;
    color: #409EFF;
    font-size: 30px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #409EFF;
}
.writeclick:hover{
    background-color: #E9F2FC;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-image: url("http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg");
    background-size: 100% 100%;
}
.el-carousel__item:nth-child(2n + 1) {
    /* background-image: url("http://pic.58pic.com/58pic/15/16/27/28E58PICUud_1024.jpg"); */
    background-size: 100% 100%;
}
</style>