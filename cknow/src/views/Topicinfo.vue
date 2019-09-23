<template>
    <div class="recommend">
        <top-menu></top-menu>
        <div class="topicinfotop">
            <div class="fixed">
                <div class="info">
                    <p class="title">{{ topicinfo.title }}</p>
                    <!-- <p class="content" v-html="topicinfo.content"></p> -->
                    <div class="bottom">
                        <span class="el-icon-thumb">赞同</span>
                        <span class="el-icon-chat-dot-round">评论</span>
                        <span
                            class="el-icon-star-on"
                            @click="collect"
                            :class="iscollect ? 'active' : 'disactive'"
                            >{{ iscollecttext }}</span
                        >
                    </div>
                </div>
                <div class="count">
                    <div class="public collectnum">
                        <p class="write">收藏数</p>
                        <p class="num">{{ topicinfo.collection }}</p>
                    </div>
                    <div class="public commentnum">
                        <p class="write">点赞数</p>
                        <p class="num">{{ topicinfo.like }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment">
            <div class="coment-left">
                <div class="publiccment">
                    <div class="top">
                        <img
                            :src="userinfo.avatar"
                            alt=""
                            class="publish-avatar"
                        />
                        <p class="publish-nickname">{{ userinfo.nickname }}</p>
                    </div>
                    <div
                        class="publish-content"
                        v-html="topicinfo.content"
                    ></div>
                </div>
                <div class="commentinfo" v-for="(com,index) in topiccom[0]" :key="index">
                    <div class="publiccment">
                        <div class="top">
                            <img
                                :src="topiccom[1][0].avatar"
                                alt=""
                                class="publish-avatar"
                            />
                            <p class="publish-nickname">
                                {{ topiccom[1][0].nickname }}
                            </p>
                        </div>
                        <div
                            class="publish-content"
                            v-html="com.content"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="comment-right">
                <div class="coment-right-info">
                    <p class="about-author">关于作者</p>
                    <div class="fullinfo">
                        <img :src="userinfo.avatar" alt="" class="avatar" />
                        <span>{{ userinfo.nickname }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from '@/components/HelloWorld.vue' */

export default {
    data: function() {
        return {
            topicinfo: [],
            topiccom: [],
            userinfo: [],
            collectflag: false,
            iscollect: false,
            iscollecttext: "收藏"
        };
    },
    methods: {
        collect: function() {
            this.collectflag = !this.collectflag;
            if (this.collectflag && !this.iscollect) {
                this.axios
                    .post("/collect/addcollect", {
                        tid: this.topicinfo.tid,
                        uid: localStorage.getItem("uid"),
                        collection: this.topicinfo.collection + 1
                    })
                    .then(response => {
                        //消息提示收藏成功
                        this.$message({
                            message: response.data.Msg,
                            type: "success"
                        });
                        this.iscollect = true;
                        this.iscollecttext = "已收藏";
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                //弹出模态框提示用于是否确认取消该收藏
                this.$confirm("将取消该收藏, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.axios
                            .post("/collect/delcollect", {
                                tid: this.topicinfo.tid,
                                uid: localStorage.getItem("uid"),
                                collection: this.topicinfo.collection - 1
                            })
                            .then(response => {
                                //消息提示取消收藏成功
                                this.$message({
                                    type: "success",
                                    message: "取消收藏成功!"
                                });
                                this.iscollect = false;
                                this.iscollecttext = "收藏";
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "操作已取消"
                        });
                    });
            }
        }
    },
    created: function() {
        var that = this;
        function getUserAccount() {
            // console.log(that.$route.query.tid)
            return that.axios.post("/topic/getonetopic", {
                tid: that.$route.query.tid,
                uid: localStorage.getItem("uid")
            });
        }

        function getUserPermissions() {
            return that.axios.post("/topic/conment", {
                tid: that.$route.query.tid
            });
        }

        that.axios.all([getUserAccount(), getUserPermissions()]).then(
            that.axios.spread(function(acct, perms) {
                // 两个请求现在都执行完成
                that.topicinfo = acct.data[0][0][0];
                that.userinfo = acct.data[1];
                that.topiccom = perms .data
                if (acct.data[0][1][0]) {
                    that.collectflag = true;
                    that.iscollect = true;
                    that.iscollecttext = "以收藏";
                }
                console.log(acct);
                console.log(perms);
            })
        );
    }
};
</script>

<style>
.bottom span {
    width: 80px;
    height: 30px;
    padding: 5px;
    box-sizing: border-box;
    text-align: center;
    line-height: 20px;
    color: #0084ff;
    background-color: #e5f2ff;
}
.bottom .active {
    color: #fff;
    background: #0084ff;
}

.center {
    width: 1000px;
    margin: 0 auto;
}
.el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
.topicinfotop {
    /* border-bottom: 1px solid #ccc; */
    margin-top: 2px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    background-color: white;
}
.bottom {
    margin-top: 10px;
}
.fixed {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding-top: 20px;
}
.info {
    width: 600px;
    /* margin: 0 auto; */
    text-align: left;
    /* padding-top: 40px; */
}
.count {
    /* background-color: red; */
    width: 360px;
    height: 80px;
    display: flex;
    justify-content: center;
}
.public {
    width: 70px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* background-color: #ccc; */
}
.public .write {
    font-size: 14px;
    color: #8590a6;
    margin-bottom: 2px;
}
.public .num {
    font-weight: 600;
    font-size: 18px;
}
.collectnum {
    border-right: 1px solid #ccc;
}
.comment {
    width: 1000px;
    margin: 0 auto;
    /* background-color: red; */
    text-align: left;
    display: flex;
    /* background-color: white; */
    /* box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1); */
    margin-top: 10px;
    justify-content: space-between;
}

.comment-right {
    width: 29%;
    height: 220px;
    /* box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1); */
    /* background-color: blue; */
}
.comment-right .coment-right-info {
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.about-author {
    line-height: 40px;
    padding-left: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
}
.fullinfo {
    display: flex;
    padding: 15px;
    box-sizing: border-box;
}
.fullinfo .avatar {
    width: 60px;
    height: 60px;
    background-color: red;
    flex-shrink: 0;
    margin-right: 10px;
}
.comment .coment-left {
    width: 70%;
    /* background-color: white; */
}
.coment-left .publiccment {
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.coment-left .top {
    height: 50px;
    /* background-color: red; */
    text-align: left;
    padding-bottom: 10px;
    display: flex;
}
.coment-left .commentinfo {
    /* border: 1px solid; */
    /* height: 50px; */
    /* background-color: red; */
    margin-top: 10px;
}
.top .publish-avatar {
    width: 50px;
    height: 50px;
}
.top .publish-nickname {
    width: 200px;
    height: 30px;
    line-height: 30px;
}
.coment-left .publish-content {
    padding-top: 10px;
}
</style>
