<template>
    <div class="side-mlist">
        <el-aside width="300px" class="scroll">
            <div class="right-top-list">
                <div class="GlobalWrite-nav">
                    <router-link :to="{ path: '/write' }">
                        <span class="font el-icon-s-comment"></span>
                        <p class="write">写回答</p>
                    </router-link>
                    <router-link :to="{ path: '/write' }">
                        <span class="font el-icon-edit-outline"></span>
                        <p class="write">写文章</p>
                    </router-link>
                    <router-link :to="{ path: '/write' }">
                        <span class="font el-icon-chat-dot-round"></span>
                        <p class="write">写想法</p>
                    </router-link>
                </div>
                <div class="blank myreply">
                    <span class="el-icon-timer"></span> 我的稍后答
                </div>
                <div class="blank mydraft">
                    <span class="el-icon-chat-square"></span> 我的草稿
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
</template>

<script>
export default {
    data:function(){
        return{
            left:'',
            top:''
        }
    },
    mounted() {
        var topnavigator = document.querySelector(".scroll");
        this.top = topnavigator.offsetTop
        this.left = topnavigator.offsetLeft
        window.onscroll = (e) =>{
            console.log(e.wheelDelta);
            console.log(e.detail)
            var top = window.pageYOffset || document.documentElement.scrollTop;
            /* console.log(top<this.top)
            console.log(top) */
            if (top > topnavigator.offsetTop) {
                topnavigator.style.position = "fixed";
                topnavigator.style.left = this.left+"px";
            } else if(top<this.top){
                topnavigator.style.position = "relative";
                topnavigator.style.left = 0;
            }
        };
    },
};
</script>

<style scoped>
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
</style>