<template>
    <div class="home">
        <top-menu></top-menu>
        <div class="center">
            <el-container>
                <el-main id="el-main">
                    <div
                        v-for="(t, index) in topiclist"
                        :key="t.tid"
                        class="cont"
                    >
                        <router-link
                            :to="{ path: '/topicinfo', query: { tid: t.tid } }"
                            class="a"
                        >
                            <p class="title">{{ t.title }}</p>
                            <p>{{ t.content }}</p>
                            <!-- <p>{{t.time}}</p> -->
                        </router-link>
                        <div class="bottom">
                            <span class="el-icon-thumb">赞同</span>
                            <span class="el-icon-chat-dot-round">评论</span>
                            <span
                                class="el-icon-star-on"
                                :class="[t.tid==iscollect?'collct':'']"
                                @click="collect(index)"
                                >收藏</span
                            >
                        </div>
                    </div>
                </el-main>
                <el-aside width="300px">
                    <div class="userinfo">
                        <img
                            src="../assets/logo.png"
                            alt=""
                            @click="changeavatar"
                        />
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
            collectflag:false,
            iscollect:''
        };
    },
    methods: {

        changeavatar: function() {
            this.$router.push({ name: "avatar" });
        },
        collect: function(index) {
            this.collectflag = !this.collectflag
            if(this.collectflag){
                this.axios
                .post("/collect/addcollect", {
                    uid: localStorage.getItem("uid"),
                    tid: this.topiclist[index].tid
                })
                .then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.iscollect = this.topiclist[index].tid
                        this.$message({
                            message: "收藏成功",
                            type: "success"
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            }else{
                //取消收藏
                this.axios
                .post("/collect/delcollect", {
                    uid: localStorage.getItem("uid"),
                    tid: this.topiclist[index].tid
                })
                .then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.iscollect = ''
                        this.$message({
                            message: "取消收藏成功",
                            type: "success"
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        }
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
    background-color: white;
}
.el-container {
    margin-top: 10px;
}
.center .el-container .el-main {
    width: 700px;
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
    cursor: pointer
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
    border-radius: 50%;
}
.nickname {
    margin-left: 5px;
}
.collct{
    background-color: blue;
    color: white;
    
}
</style>