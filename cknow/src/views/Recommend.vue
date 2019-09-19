<template>
    <div class="recommend">
        <top-menu></top-menu>
        <div class="center">
            <el-container>
                <el-main>Recommend</el-main>
                <el-aside width="200px">Aside</el-aside>
            </el-container>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from '@/components/HelloWorld.vue' */

export default {
    
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
</style>
