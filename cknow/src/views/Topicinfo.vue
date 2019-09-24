<template>
    <div class="recommend">
        <top-menu></top-menu>
        <div class="topicinfotop">
            <div class="fixed">
                <div class="info">
                    <p class="title">{{ topicinfo.title }}</p>
                    <!-- <p class="content" v-html="topicinfo.content"></p> -->
                    <div class="bottom">
                        
                        <span class="el-icon-chat-dot-round" @click="comment"
                            >写回答</span
                        >
                        <span
                            class="el-icon-star-on"
                            @click="collect"
                            :class="iscollect ? 'active' : 'disactive'"
                            >{{ iscollecttext }}</span
                        >
                    </div>
                </div>
                <div class="count">
                    <div class="public commentnum">
                    </div>
                    <div class="public collectnum">
                        <p class="write">收藏数</p>
                        <p class="num">{{ topicinfo.collection }}</p>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="comment">
            <div class="coment-left">
                <div class="commentinfo" :class="iswrite ? '' : 'writing'">
                    <div ref="editorElem" class="wangeditor"></div>
                    <el-row>
                        <el-button type="primary" plain @click="release"
                            >提交回答</el-button
                        >
                        <el-button type="info" plain @click="signout"
                            >退出</el-button
                        >
                    </el-row>
                </div>
                <div class="publiccment">
                    <div class="top">
                        <img
                            :src="userinfo.avatar"
                            alt=""
                            class="publish-avatar"
                        />
                        <!-- <p class="publish-nickname">{{ userinfo.nickname }}</p> -->
                        <div class="nick-time">
                            <p class="publish-nickname">
                                {{ userinfo.nickname }}
                            </p>
                            <p class="publish-time">
                                发布时间:{{ topicinfo.time }}
                            </p>
                        </div>
                    </div>
                    <div
                        class="publish-content"
                        v-html="topicinfo.content"
                    ></div>
                </div>
                <div
                    class="commentinfo"
                    v-for="(com, index) in topiccom[0]"
                    :key="index"
                >
                    <div class="publiccment">
                        <div class="top">
                            <img
                                :src="com.avatar"
                                alt=""
                                class="publish-avatar"
                            />
                            <div class="nick-time">
                                <p class="publish-nickname">
                                    {{ com.nickname }}
                                </p>
                                <p class="publish-time">
                                    发布时间:{{ com.time }}
                                </p>
                            </div>
                        </div>
                        <div class="publish-content" v-html="com.content"></div>
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
import E from "wangeditor";
export default {
    inject: ["reload"],
    name: "Editor",
    data: function() {
        return {
            editor: null,
            editorContent: "",
            topicinfo: [],
            topiccom: [],
            info:[],
            userinfo: [],
            collectflag: false,
            iscollect: false,
            
            //判断是否点击写评论
            iswrite: false,
            writeflag: false,
            iscollecttext: "收藏"
        };
    },
    watch: {
        "$route.query.tid":function(){
            // console.log(this.tid)
            this.reload();
         
            // this.$router.go(0);
        }
    },
    mounted() {
        this.editor = new E(this.$refs.editorElem);
        // 编辑器的事件，每次改变会获取其html内容
        this.editor.customConfig.onchange = html => {
            this.editorContent = html;
            this.catchData(this.editorContent);
            // 把这个html通过catchData的方法传入父组件
        };

        this.editor.customConfig.menus = [
            // 菜单配置
            "head", // 标题
            "bold", // 粗体
            "fontSize", // 字号
            "fontName", // 字体
            "italic", // 斜体
            "underline", // 下划线
            "strikeThrough", // 删除线
            "foreColor", // 文字颜色
            "backColor", // 背景颜色
            "link", // 插入链接
            "list", // 列表
            "justify", // 对齐方式
            "quote", // 引用
            "emoticon", // 表情
            "image", // 插入图片
            "table", // 表格
            "code", // 插入代码
            "undo", // 撤销
            "redo" // 重复
        ];
        this.editor.customConfig.uploadImgServer =
            "http://localhost:81/upload/img";
        this.editor.customConfig.uploadImgParamsWithUrl = true;
        this.editor.customConfig.uploadFileName = "imgs";
        this.editor.create(); // 创建富文本实例
    },
    methods: {
        signout: function() {
            this.iswrite = false;
        },
        //写回答
        release: function() {
            console.log(localStorage.getItem("avatar"))
            var time = new Date();
            var publishtime = time.toLocaleString();
            var par = {
                tid: this.topicinfo.tid,
                content: this.editorContent,
                uid: localStorage.getItem("uid"),
                time: publishtime,
                avatar:localStorage.getItem("avatar"),
                nickname:localStorage.getItem("nickname")
            };
            this.axios({
                method: "post",
                url: "/comment/addcoment",
                data: par
            }).then(response => {
                if (response.data.code == 1) {
                    // console.log(publishtime)
                    this.$message("回答成功");

                    this.reload();
                    // this.$router.push({ name: "home" });
                } else {
                    console.log(response.data);
                }
            });
            console.log(this.title);
            console.log(this.editorContent);
        },
        catchData: function() {
            console.log(this.editorContent);
        },
        //点击收藏按钮
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
                        this.reload();
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
                                this.reload();
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
        },
        comment: function() {
            this.iswrite = true;
        }
    },
    created: function() {
        console.log(this.tid)
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
                tid: that.$route.query.tid,
                uid: localStorage.getItem("uid")
            });
        }

        that.axios.all([getUserAccount(), getUserPermissions()]).then(
            that.axios.spread(function(acct, perms) {
                // 两个请求现在都执行完成
                that.topicinfo = acct.data[0][0][0];
                that.userinfo = acct.data[1];
                that.topiccom = perms.data;
                
                if (acct.data[0][1][0]) {
                    that.collectflag = true;
                    that.iscollect = true;
                    that.iscollecttext = "已收藏";
                }
                /* console.log(acct);
                console.log(perms); */
            })
        );
    },
  
};
</script>

<style>
.nick-time {
    margin-left: 10px;
}
.publish-time {
    font-size: 12px;
    color: rgb(167, 165, 165);
}
.bottom span {
    width: 80px;
    height: 30px;
    padding: 5px;
    /* margin-bottom: 10px; */
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
    padding-bottom: 20px;
    cursor: pointer;
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
    /* margin-top: 10px; */
    justify-content: space-between;
}

.comment-right {
    width: 29%;
    height: 220px;
    /* box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1); */
    /* background-color: blue; */
}
.comment-right .coment-right-info {
    margin-top: 10px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    background-color: white;
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
    flex-shrink: 0;
    margin-right: 10px;
}
.comment .coment-left {
    width: 70%;
    padding-top: 0;
    /* background-color: white; */
}
.coment-left .publiccment {
    margin-top: 10px;
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
    background-color: white;
    margin-top: 10px;
}
.commentinfo .el-row {
    display: flex;
    justify-content: flex-end;
}
.coment-left .writing {
    display: none;
}
.commentinfo .wangeditor .w-e-toolbar {
    background-color: white !important;
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
