<template>
    <div>
        <top-menu></top-menu>
        <div class="middle" id="center-top">
            <el-carousel indicator-position="none" height="200px">
                <el-carousel-item v-for="item in 4" :key="item">
                </el-carousel-item>
            </el-carousel>
            <div class="person">
                <img class="picture" :src="userinfo.avatar" alt="" />
                <div class="username">
                    {{ userinfo.nickname }}
                </div>

                <div style="margin: 20px 0" class="edit" @click="edit">
                    <el-button type="primary" plain>编辑个人资料</el-button>
                </div>
            </div>

            <div class="person-bottom">
                <div class="pre-left">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="我的收藏" name="first">
                            <el-main id="el-main">
                                <div
                                    v-for="t in objectlist"
                                    :key="t.tid"
                                    class="cont"
                                >
                                    <router-link
                                        :to="{
                                            path: '/topicinfo',
                                            query: { tid: t.tid }
                                        }"
                                        class="a"
                                    >
                                        <p class="title">{{ t.title }}</p>

                                        <p v-html="t.content"></p>
                                    </router-link>
                                </div>
                            </el-main>
                        </el-tab-pane>
                        <el-tab-pane label="我的文章" name="second">
                            <el-main id="el-main">
                                <div
                                    v-for="t in articlelist"
                                    :key="t.tid"
                                    class="cont"
                                >
                                    <router-link
                                        :to="{
                                            path: '/topicinfo',
                                            query: { tid: t.tid }
                                        }"
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
                    <el-aside width="300px" class="scroll">
                        <div class="right-top-list">
                            <div class="GlobalWrite-nav">
                                <router-link :to="{ path: '/write' }">
                                    <span class="font el-icon-s-comment"></span>
                                    <p class="write">写回答</p>
                                </router-link>
                                <router-link :to="{ path: '/write' }">
                                    <span
                                        class="font el-icon-edit-outline"
                                    ></span>
                                    <p class="write">写文章</p>
                                </router-link>
                                <router-link :to="{ path: '/write' }">
                                    <span
                                        class="font el-icon-chat-dot-round"
                                    ></span>
                                    <p class="write">写想法</p>
                                </router-link>
                            </div>
                            <div class="blank myreply">
                                <span class="el-icon-timer"></span> 我的稍后答
                            </div>
                            <div class="blank mydraft">
                                <span class="el-icon-chat-square"></span>
                                我的草稿
                            </div>
                        </div>
                        <div class="GlobalSideBar-categoryList">
                            <div class="list">
                                <span class="font el-icon-magic-stick"></span>
                                <p class="write">live</p>
                            </div>
                            <div class="list">
                                <span class="font el-icon-reading"></span>
                                <p class="write">书店</p>
                            </div>
                            <div class="list">
                                <span class="font el-icon-orange"></span>
                                <p class="write">圆桌</p>
                            </div>
                            <div class="list">
                                <span class="font el-icon-edit"></span>
                                <p class="write">专栏</p>
                            </div>
                            <div class="list">
                                <span class="font el-icon-s-shop"></span>
                                <p class="write">付费咨询</p>
                            </div>
                        </div>
                        <div class="Footer">
                            <p>刘看山.知乎指南.知乎协议.知乎隐私保护指引</p>
                            <p>应用，工作.申请开通知乎机构号</p>
                            <p>侵权举报，网上有害信息举报专区</p>
                            <p>京ICP证110745号</p>
                            <p>京公网安备11010802010035号</p>
                            <p>违法和不良信息举报: 010-82716601</p>
                            <p>儿童色情信息举报专区</p>
                            <p>证照中心</p>
                            <p>联系我们◎2019知乎</p>
                        </div>
                    </el-aside>
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
            userinfo: [],
            tid: [],
            objectlist: [],
            articlelist: []
        };
    },
    methods: {
        handleClick(tab, event) {
            // if(tab._uid=="35"){
            this.axios
                .post("/user/getarticle", {
                    data: { uid: localStorage.getItem("uid") }
                })
                .then(response => {
                    this.articlelist = response.data;
                });
            // }
        },
        writewz() {
            this.$router.push({ name: "write" });
        },
        edit() {
            this.$router.push({ name: "editinfo" });
        },
        getcoll(str) {
            this.axios
                .post("/user/getcollectiontopic", {
                    data: { tid: str }
                })
                .then(response => {
                    // console.log(response.data);
                    this.objectlist = response.data;
                });
        }
    },
    created: function() {
        // console.log(localStorage.getItem("uid"));
        this.axios
            .post("/user/getuserinfo", {
                uid: localStorage.getItem("uid")
            })
            .then(response => {
                // console.log(response);
                this.userinfo = response.data[0];
            });
        this.axios
            .post("/user/getcollection", {
                uid: localStorage.getItem("uid")
            })
            .then(response => {
                // console.log(response);
                this.tid = response.data.resu;
                // console.log(this.tid)
                var str = this.tid.join(",");
                // console.log(str)
                this.getcoll(str);
            });
        this.handleClick();
    }
};
</script>
<style>
.scroll{
    position: relative;
    left: 0;
    top: 0;
}
.el-aside {
    line-height: 26px;
    text-align: left;
}
.blank {
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    color: #8590a6;
    font-size: 14px;
}
.write {
    color: #444;
}
.right-top-list {
    background-color: white;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.GlobalWrite-nav {
    padding: 2px;
    height: 97px;
    /* background-color: red; */
    display: flex;
    align-items: center;
}
.GlobalSideBar-categoryList {
    margin-top: 10px;
    height: 200px;
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    /* background-color: red; */
}
.GlobalSideBar-categoryList .list {
    height: 100px;
    width: 33%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
.GlobalSideBar-categoryList .list p {
    font-size: 15px;
    color: #8590a6;
}
.GlobalSideBar-categoryList .list:nth-child(1) span {
    color: rgb(255, 207, 0);
}
.GlobalSideBar-categoryList .list:nth-child(1):hover p {
    color: rgb(255, 207, 0);
}
.GlobalSideBar-categoryList .list:nth-child(2) span {
    color: rgb(67, 212, 128);
}
.GlobalSideBar-categoryList .list:nth-child(2):hover p {
    color: rgb(67, 212, 128);
}
.GlobalSideBar-categoryList .list:nth-child(3) span {
    color: rgb(0, 132, 255);
}
.GlobalSideBar-categoryList .list:nth-child(3):hover p {
    color: rgb(0, 132, 255);
}
.GlobalSideBar-categoryList .list:nth-child(4) span {
    color: rgb(15, 136, 235);
}
.GlobalSideBar-categoryList .list:nth-child(4):hover p {
    color: rgb(15, 136, 235);
}
.GlobalSideBar-categoryList .list:nth-child(5) span {
    color: rgb(84, 120, 240);
}
.GlobalSideBar-categoryList .list:nth-child(5):hover p {
    color: rgb(84, 120, 240);
}
.Footer {
    margin-top: 10px;
    height: 280px;
}
.Footer p {
    font-size: 14px;
    line-height: 2;
    color: #8590a6;
}
.font {
    font-size: 20px;
    color: #8590a6;
}
.GlobalWrite-nav a {
    height: 100%;
    width: 33%;
    /* background-color: blue; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
.pre-left .title {
    text-align: left;
    widows: 100%;
}
.pre-left .el-tabs__nav-wrap .el-tabs__nav-scroll {
    background-color: white;
    padding-left: 10px;
    box-sizing: border-box;
}
.pre-left .cont img {
    float: left;
    width: 200px;
}
.pre-left .cont {
    padding: 0;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
}
body {
    background-color: #f6f6f6;
}
.middle {
    width: 1000px;
    margin: 0 auto;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    position: relative;
}
#center-top {
    margin-top: 2px;
    text-align: left;
}
.person {
    width: 100%;
    height: 80px;
    background-color: pink;
    position: relative;
}
.person .picture {
    position: absolute;
    top: -40px;
    left: 0;
    width: 100px;
    height: 100px;
    background-color: #e7e7e7;
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
    width: 666px;
    /* padding-left: 10px; */
    margin-top: 5px;
    box-sizing: border-box;
}
.pre-left .el-tabs__content #pane-first {
    height: auto;
}
.pre-left #el-main {
    background-color: #f6f6f6;
    padding: 0;
    text-align: left;
}
.pre-left .el-tabs__header {
    margin-bottom: 0;
}
.pre-right {
    width: 300px;
    margin-left: 15px;
    margin-top: 5px;
}
.pre-right .el-aside {
    background-color: #f6f6f6;
}
.person-bottom {
    display: flex;
}
.person-bottom::after {
    content: "";
    display: block;
    clear: both;
}
#pane-first {
    height: 1000px;
}
.writeclick {
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    line-height: 80px;
    color: #409eff;
    font-size: 30px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #409eff;
}
.writeclick:hover {
    background-color: #e9f2fc;
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
    background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569297908164&di=42be50b44f7c082d139a930a5d2af978&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F14%2F29%2F47e58PICQUR_1024.jpg");
    background-size: 100% 100%;
}
</style>