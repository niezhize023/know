<template>
    <div class="top">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#fff"
            text-color="#000"
            active-text-color="#0084ff"
        >
            <el-menu-item >
                <router-link to="/">
                    <img src="../assets/logo.png" alt="">
                </router-link>
            </el-menu-item>
            <el-menu-item index="5">
                <router-link to="/recommend" class="a">
                    推荐
                </router-link>
            </el-menu-item>
            <el-menu-item index="6">
                <router-link to="/follow" class="a">
                    关注
                </router-link>
            </el-menu-item>
            <el-menu-item index="7">
                <router-link to="/hot" class="a">
                    热榜
                </router-link>
            </el-menu-item>

            <el-menu-item class="search">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="input"
                >
                </el-input>
            </el-menu-item>

            <el-submenu index="2" class="mycenter">
                <template slot="title">个人中心</template>
                <el-menu-item index="2-1" @click="myperson">我的主页</el-menu-item>
                <el-menu-item index="2-2">编辑</el-menu-item>
                <el-menu-item index="2-3">退出</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: "1",
            activeIndex2: "1",
            input:''
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            if(key=='2-3'){
                //清空本地缓存
                localStorage.clear();
                //跳转到登录界面
                this.$router.push({ name: "login" });
            }
        },
         myperson:function(){
              this.$router.push({name:'personal'})

  }
    },
    created:function(){
      console.log(this.$route.path)
      if(this.$route.path=='/recommend'){
          this.activeIndex = '5'
          this.activeIndex2 = '5'
      }else if(this.$route.path=='/follow'){
          this.activeIndex = '6'
          this.activeIndex2 = '6'
      }else if(this.$route.path=='/hot'){
          this.activeIndex = '7'
          this.activeIndex2 = '7'
      }
  },
 
};
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
.top{
    border-bottom: 1px solid #ccc;
    background-color: white;
    height: 70px;
}
.el-menu-demo {
    width: 1000px;
    background-color: white;
    margin: 0 auto;
}
.el-menu-item:hover{
    background-color: white !important;
}
.el-menu.el-menu--horizontal{
    border: none
}
.mycenter{
    position: absolute;
    right: 84px;
    top: 0;
}
.search{
    width: 400px;
}
a{
    text-decoration: none;
}
.a{
    height: 60px;
    /* line-height: 60px; */
}
</style>