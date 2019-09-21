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

  </div>





        </div>
    </div>
</template>
<script>
export default {
   data(){
     return {
  
     }
   },
   methods:{
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
}
.person{
    width: 100%;
    height: 100px;
    background-color: pink;
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