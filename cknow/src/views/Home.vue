<template>
    <div class="home">
        <top-menu></top-menu>
        <div class="center">
            <el-container>
                <el-main>
                    <div v-for="t in topiclist" :key="t.tid" class="cont">
                        <router-link :to="{path:'/topicinfo',query:{tid:t.tid}}" class="a">
                            <p class="title">{{ t.title }}</p>
                            <p>{{ t.content }}</p>
                            <!-- <p>{{t.time}}</p> -->
                            
                        </router-link>
                        <div class="bottom">
                            <span class="el-icon-thumb">赞同</span>
                            <span class="el-icon-chat-dot-round">评论</span>
                            <span class="el-icon-star-on">收藏</span>
                        </div>
                    </div>
                </el-main>
                <el-aside width="200px">
                    <div class="userinfo">
                        <img src="../assets/logo.png" alt="" @click="changeavatar">
                        <span class="nickname">鱼戏断桥边</span>
                    </div>
                </el-aside>
            </el-container>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from '@/components/HelloWorld.vue' */
export default {
    data: function() {
        return {
            topiclist: []
        };
    },
    methods:{
        changeavatar:function(){
            this.$router.push({name:"avatar"})
        }
    },
    created: function() {
        this.axios
            .get("/topic/gettopic")
            .then(response => {
                console.log(response.data);
                this.topiclist = response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};
</script>
<style>
body{
    background-color: #F6F6F6
}
.center {
    width: 1000px;
    margin: 0 auto;
}
.center .el-aside{
    line-height: 30px;
    text-align: left;
    background-color: white;
    
}
.el-container{
    margin-top: 10px;
}
.center .el-container .el-main {
    width: 700px;
    padding: 0;
    text-align: left;
    line-height: 30px;
    background-color: #F6F6F6;
    margin-right: 10px;
}
.cont {
    background-color: white;
    margin-bottom: 10px;
    /* height: 200px; */
}
a {
    line-height: 30px;
    color: black;
}
.title {
    font-size: 20px;
    font-weight: 600;
}
.bottom {
    width: 400px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.userinfo {
    padding: 2px;
    display: flex;
    align-items: center;
}
.userinfo img{
    /* background-color: red; */
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 50%
}
.nickname{
    margin-left: 5px;
}
</style>