<template>
    <div class="home">
        <top-menu></top-menu>
        <div class="center">
            <el-container>
                <el-main id="el-main">
                    <div
                        v-for="t in topiclist"
                        :key="t.tid"
                        class="cont"
                    >
                        <router-link
                            :to="{ path: '/topicinfo', query: { tid: t.tid } }"
                            class="a"
                        >
                            <p class="title">{{ t.title }}</p>
                            <p v-html="t.content"></p>
                            <!-- <p>{{t.time}}</p> -->
                        </router-link>
                    </div>
                </el-main>
                <el-aside width="300px">
                    <div class="userinfo">
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
            topiclist: [],
        };
    },
    methods: {
    
        
    },
    created: function() {
        this.$store.state.status = localStorage.getItem("token");
        this.$store.state.uid = localStorage.getItem("uid");
        console.log(this.$store.state.uid);
        //判断本地缓存中是否有用户登录成功的状态，有就将用户登录状态存在vuex的状态管理器中没有就将将vuex里面的状态设置为0
        if (!this.$store.state.status) {
            //如果状态为0，就跳转到登录界面
            this.$router.push({ name: "login" });
        } else {
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
    }
};
</script>
<style>
body {
    background-color: #f6f6f6;
}
.center {
    width: 1000px;
    margin: 0 auto;
}
.center .el-aside {
    line-height: 30px;
    text-align: left;
    height: 200px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
}
.el-container {
    margin-top: 10px;
    background-color: #F6F6F6;
    /* padding-left: 30px; */
    box-sizing: border-box;
}
.center .el-container #el-main {
    width: 700px;
    padding-left: 30px;
    box-sizing: border-box;
    padding: 0;
    text-align: left;
    line-height: 30px;
    background-color: #f6f6f6;
    margin-right: 10px;
}
.cont {
    background-color: white;
    margin-bottom: 10px;
    width: 680px;
    cursor: pointer;
    padding-left: 20px;
    padding-top: 10px;
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
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
.userinfo img {
    /* background-color: red; */
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    flex-shrink: 0;
    border-radius: 50%;
}
.nickname {
    margin-left: 5px;
}
.collct{
    background-color: blue;
    color: white;
    
}
.a>p+p{
    /* display: flex; */
}
.a>p+p p:nth-child(2){
    width: 50px;
    height: 50px;
    box-ordinal-group:1
}
.a>p+p p:nth-child(1){
    box-ordinal-group:2;
    flex-shrink: 0;
}
</style>