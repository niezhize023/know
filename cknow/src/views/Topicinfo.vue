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
                        <p class="num">{{topicinfo.collection}}</p>
                    </div>
                    <div class="public commentnum">
                        <p class="write">评论数</p>
                        <p class="num">{{topicinfo.comment}}</p>
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
            userinfo: []
        };
    },
    created: function() {
        this.axios
            .post("/topic/getonetopic", {
                tid: this.$route.query.tid
            })
            .then(response => {
                this.topicinfo = response.data[0][0][0];
                this.topiccom = response.data[0][1];
                this.userinfo = response.data[1];
                console.log(this.topicinfo);
            })
            .catch(function(error) {
                console.log(error);
            });
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
.fixed{
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
.count{
    /* background-color: red; */
    width: 360px;
    height: 100px;
    display: flex;
    justify-content: center;
}
.public{
    width: 70px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* background-color: #ccc; */
}
.public .write{
    font-size: 14px;
    color: #8590A6;
    margin-bottom: 2px;
}
.public .num{
    font-weight: 600;
    font-size: 18px;
}
.collectnum{
    border-right: 1px solid #ccc;
}
</style>
