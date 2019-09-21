<template>
    <div>
        <top-menu></top-menu>
        <div class="center">
          <el-carousel indicator-position="none" height="200px">
    <el-carousel-item v-for="item in 4" :key="item">
      <!-- <h3>{{ item }}</h3> -->
    </el-carousel-item>
  </el-carousel>
  <div class="person">
<div class="picture">

</div>
<div class="username">
啥都不会viuefduv
</div>

<div style="margin: 20px 0" class="edit" @click="edit">
  <el-button type="primary" plain>编辑个人资料</el-button>
</div>
  </div>



<div class="left">
<el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

</div>
<div class="right">
 <div class="writeclick" @click="writewz">
<i class="el-icon-edit-outline"></i>点击写文章
 </div>

</div>





        </div>
    </div>
</template>
<script>
export default {
   data(){
     return {
  activeName: 'first',

     }
   },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      writewz(){
           this.$router.push({name:'write'})
        
      },
      edit(){
           this.$router.push({name:'write'})

      }  
    }
}
</script>
<style> 
body {
    background-color: #f6f6f6;
}
.center {
    width: 1000px;
    margin: 0 auto;
    height: 1000px;
    background-color: red;
    position: relative;
}
.person{
    width: 100%;
    height: 100px;
    background-color: pink;
    position:relative;
}

.picture{
  position: absolute;
  top: -40px;
  width: 100px;
  height: 100px;
  background-color: blue;
  z-index: 9999;
}
.username{
  background-color: #2C3E50;
  width: 200px;
  height: 50px;
  position: absolute;
  top:10px;
  left: 110px;
  line-height: 50px;
  font-size:20px;
  color: aqua;
}
.edit{
position: absolute;
right: 20px;
}
.left{
  width: 70%;
  height: 300px;
  background-color: #A82AA1;
}
.right{
    width: 29%;
  height: 300px;
  background-color: rgb(99, 34, 95);
  position: absolute;
  right:0;
}

.writeclick{
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: rgb(199, 136, 147);
  font-size: 30px;
  text-align: center;
  cursor: pointer;
}








.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
      background-image: url("http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg");
      background-size:100% 100%;
  }
  .el-carousel__item:nth-child(2n+1) {
      background-image: url("http://pic.58pic.com/58pic/15/16/27/28E58PICUud_1024.jpg");
           background-size:100% 100%;}
</style>