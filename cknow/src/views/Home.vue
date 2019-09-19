<template>
    <div class="home">
        <top-menu></top-menu>
        <div class="center">
            <el-container>
                <el-main>
                    <div v-for="t in topiclist" :key="t.tid" class="cont">
                        <router-link to="/recommend" class="a">
                            <p>{{t.title}}</p>
                            <p>{{t.content}}</p>
                            <p>{{t.time}}</p>
                        </router-link>
                    </div>
                </el-main>
                <el-aside width="200px">Aside</el-aside>
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
            topiclist: []
        };
    },
    created: function() {
        this.axios
            .get("/topic/gettopic")
            .then(response => {
                console.log(response.data)
                this.topiclist = response.data;
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

.el-container .el-main {
    background-color: #e9eef3;
    color: #333;
    padding: 0;
    text-align:left
}
.cont{
    background-color: white;
    margin-bottom: 10px;
}
a{
    line-height: 30px;
}
</style>