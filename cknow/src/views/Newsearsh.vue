<template>
    <div>
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
export default {
    data(){
        return{
            // myinput:'',
 topiclist: [],
value:''
        
        }
    },
    methods: {
        // getinfo(){
           
        // }

    },
    created() {
       this.value=this.$route.params.val
 this.axios.post("/user/getmysearsh", {
                // inputvalue:this.$route.params.val
                inputvalue:this.$route.params.val
            })
            .then((response)=> {
            //   console.log(response.data)
              this.topiclist=response.data


            //   console.log(response.data[1])
            })
        
  
        
    },
    mounted() { console.log(this.$route.params.val)
    
           this.value=this.$route.params.val
 this.axios.post("/user/getmysearsh", {
                // inputvalue:this.$route.params.val
                inputvalue:this.$route.params.val
            })
            .then((response)=> {
            //   console.log(response.data)
              this.topiclist=response.data


            //   console.log(response.data[1])
            })
    },
    // updated() {
    //     console.log(this.$route.params.val)

    // // this.getinfo()
  
        
    // },
    
}
</script>
<style>
    
</style>