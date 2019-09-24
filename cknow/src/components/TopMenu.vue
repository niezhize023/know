<template>
    <div class="tophome">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#fff"
            text-color="#000"
            active-text-color="#0084ff"
        >
            <el-menu-item>
                <router-link to="/">
                    <img src="../assets/logo.png" alt="" />
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
                <!-- <el-button type="primary" icon="el-icon-search" class="mysearsh" @click="mysearshclick"></el-button> -->
                    <div :class="isgange?'showlist':''">
                        <p v-for="item in searchlist" :key="item.tid">

                            <router-link
                            :to="{ path: '/topicinfo', query: { tid: item.tid } }"
                            class="a"
                            >
                            <span class="title">{{ item.title }}</span>
                            <!-- <p v-html="item.content"></p> -->
                            <!-- <p>{{t.time}}</p> -->
                            </router-link>
                        </p>
                    </div>
            </el-menu-item>

            <el-submenu index="2" class="mycenter">
                <template slot="title">
                    个人中心
                </template>
                <el-menu-item index="2-1" @click="myperson"
                    >我的主页</el-menu-item
                >
                <!-- <el-menu-item index="2-2">编辑</el-menu-item> -->
                <el-menu-item index="2-2">退出</el-menu-item>
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
            input: "",
            searchlist:[],
            isgange:false
        };
    },
     watch: {
            input:function(){

            if(this.input){
              this.axios.post("/user/getmysearsh", {
                inputvalue:this.input
            })
            .then((response)=> {
             this.searchlist=response.data
             if(response.data.length){
                this.isgange = true
                 
             }
            //   console.log("list:"+this.searchlist)
            })
        
            }else{
                // console.log("空")
                this.isgange = false

                this.searchlist=[]
            }
        }

        },
    methods: {
    //    outfocus(){
        //    this.isgange = false
            // this.searchlist=[]
            // this.input=''
    //    },
        mysearshclick(){
            // console.log(this.input)
            var params={val:this.input}
            this.$router.push({name:'newsearsh',params:params})
           
        },
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
            if (key == "2-2") {
                //清空本地缓存
                localStorage.clear();
                //跳转到登录界面
                this.$router.push({ name: "login" });
            }
        },
        myperson: function() {
            this.$router.push({ name: "personal" });
        }
    },
    created: function() {
        // console.log(this.$route.path);
        if (this.$route.path == "/recommend") {
            this.activeIndex = "5";
            this.activeIndex2 = "5";
        } else if (this.$route.path == "/follow") {
            this.activeIndex = "6";
            this.activeIndex2 = "6";
        } else if (this.$route.path == "/hot") {
            this.activeIndex = "7";
            this.activeIndex2 = "7";
        }
    }
};
</script>

<style>

.search .el-input__inner{
border-radius: 0

}
.showlist{
    width: 89.5%;
    height: 200px;
    background-color: white;
    position: absolute;
    z-index: 20;
    top: 50px;
    border: 1px solid #ccc;
    overflow: scroll;
    overflow-x: hidden;


}
::-webkit-scrollbar {
/*隐藏滚轮*/
display: none;
}
.showlist p{
  text-align: left;
  line-height: 26px;
}
.showlist p span{
    font-size: 14px;
    font-weight: normal;
  
}
.mysearsh{
    width: 46px;
    height: 37px;
    line-height: 37px;
    margin: 0 10px;
    background-color: #fff;
    padding: 0;
    padding-left: 5px;
}
* {
    margin: 0px;
    padding: 0px;
}
.tophome {
    /* border-bottom: 1px solid #ccc; */
    background-color: white;
    width: 100%;
    height: 70px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);

}
.tophome .el-menu-demo {
    width: 1000px !important;
    background-color: white;
    margin: 0 auto;
}
.el-menu-item:hover {
    background-color: white !important;
}
.el-menu.el-menu--horizontal {
    border: none;
}
.mycenter {
    position: absolute;
    right: 84px;
    top: 0;
}
.search {
    width: 400px;
}
a {
    text-decoration: none;
}
.a {
    height: 60px;
    /* line-height: 60px; */
}
</style>