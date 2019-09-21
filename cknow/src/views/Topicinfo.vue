<template>
    <div class="recommend">
        <top-menu></top-menu>
        <div class="topicinfotop">
            <div class="fixed">
                <div class="info">
                    <p class="title">{{ topicinfo.title }}</p>
                    <p class="content">{{ topicinfo.content }}</p>
                </div>
                <div class="count">
                    <div class="public collectnum">
                        <p class="write">收藏数</p>
                        <p class="num">{{ topicinfo.collection }}</p>
                    </div>
                    <div class="public commentnum">
                        <p class="write">评论数</p>
                        <p class="num">{{ topicinfo.comment }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment">
            <div class="coment-left">
                <div class="top">
                    <img :src="userinfo.avatar" alt="" class="publish-avatar">
                    <p class="publish-nickname">{{userinfo.nickname}}</p>
                </div>
                <div class="publish-content">{{topicinfo.content}}</div>
            </div>
            <div class="comment-right">
                <p class="about-author">关于作者</p>
                <div class="fullinfo">
                    <img :src="userinfo.avatar" alt="" class="avatar">
                    <span>{{userinfo.nickname}}</span>
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
        };
    },
    created: function() {
<<<<<<< Updated upstream
        console.log(this.$route.query.tid)
        this.axios
            .post("/topic/getonetopic", {
                tid: this.$route.query.tid
            })
            .then(response => {
                console.log(response)
                this.topicinfo = response.data[0][0][0];
                this.topiccom = response.data[0][1];
                this.userinfo = response.data[1];
                console.log(this.topicinfo);
=======
        var that = this
        function getUserAccount() {
            // console.log(that.$route.query.tid)
            return that.axios.post("/topic/getonetopic",{tid:that.$route.query.tid});
        }

        function getUserPermissions() {
            return that.axios.post("/topic/conment",{tid:that.$route.query.tid});
        }

        that.axios.all([getUserAccount(), getUserPermissions()]).then(
            that.axios.spread(function(acct, perms) {
                // 两个请求现在都执行完成
                that.topicinfo = acct.data[0]
                that.userinfo = acct.data[1]
                console.log(acct)
                console.log(perms)

>>>>>>> Stashed changes

            })
        );
    }
};
</script>

<style>
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
    border-bottom: 1px solid #ccc;
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
    height: 100px;
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
.comment{
    width: 1000px;
    margin: 0 auto;
    /* background-color: red; */
    text-align: left;
    display: flex;
    justify-content: center;
}

.comment-right{
    width: 25%;
    height: 200px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1)
    /* background-color: blue; */
}
.about-author{
    line-height: 40px;
    padding-left: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
}
.fullinfo{
    display: flex;
    padding: 15px;
    box-sizing: border-box;
}
.fullinfo .avatar{
    width: 60px;
    height: 60px;
    background-color: red;;
    flex-shrink: 0;
    margin-right: 10px;
}
.comment .coment-left{
    padding: 20px;

    width: 70%;
    background-color: white;
    box-sizing: border-box;
}
.coment-left .top{
    height: 50px;
    /* background-color: red; */
    text-align: left;
    padding-bottom: 10px;
    display: flex;
}
.top .publish-avatar{
    width: 50px;
    height: 50px;
}
.top .publish-nickname{
    width: 200px;
    height: 30px;
    line-height: 30px;
}
.coment-left .publish-content{
    padding-top: 10px;
}
</style>
