<template>
    <div class="app">
        <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
  <el-menu-item index="3">订单管理</el-menu-item>
</el-menu>



<el-row class="tac left" >
<el-col :span="24">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>


 <el-table
    :data="tableData4"
    border
    style="width: 80%"
   min-height="250"
   max-height="600"
    >
    <el-table-column
      fixed
      prop="uid"
      label="用户"
      width="50"
      >
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容"
      width="420">
    </el-table-column>
    <el-table-column
      prop="imgs"
      label="图片"
      width="120">
    </el-table-column>
    <el-table-column
      prop="like"
      label="点赞数"
      width="70">
    </el-table-column>
    <el-table-column
      prop="comment"
      label="评论数"
      width="70">
    </el-table-column>
    <el-table-column
      prop="collection"
      label="收藏数"
      width="70">
    </el-table-column>
    <el-table-column
      prop="time"
      label="发布时间"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="80">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData4)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

    </div>
</template>
<script>
export default {
     data:function(){
      return {
        activeIndex: '1',
        activeIndex2: '1',
        tableData4: [{
          uid: '',
          title: '',
          content: '',
          imgs: '',
          like: '',
          comment: '',
          collection:'',
          time:''
        }]
      };
    },
    methods: {
      //  getinfo(){
      //  }
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
    }, 
    deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    created() {
      // this.getinfo()
      this.axios.get('/backstage/info').then((response) => {
      // console.log(response.data.re)
      this.tableData4=response.data.re
})
//  this.axios({
//             method: "post",
//             url: "/backstage/info",
//           }).then(response => {
//              console.log(response.data)
//           }).catch(response => {
//              console.log(response)
//           })
    },

}
</script>
<style>
html{
  height: auto;
  width: 100%;
}
.app{
    min-width: 1260px;
    width: 100%
}
   el-table{
       float: right;

   }
   .left{
       width:200px;
       float: left;
       margin: 0 50px 0 0;
   }


</style>