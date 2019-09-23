<template>
  <div class="app">
    <div class="toop">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">处理中心</el-menu-item>

        <el-menu-item index="2">话题管理</el-menu-item>

        <div class="backname">管理员!欢迎回来!</div>
      </el-menu>
    </div>

    <div></div>

    <el-table
      :data="tableData4"
      border
      style="width: 80%"
      id="table"
      min-height="250"
      max-height="500"
    >
      <el-table-column fixed prop="uid" label="用户" width="50"></el-table-column>
     
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="content" label="内容" width="500"></el-table-column>

      <el-table-column prop="like" label="点赞数" width="70"></el-table-column>
      <el-table-column prop="comment" label="评论数" width="70"></el-table-column>
      <el-table-column prop="collection" label="收藏数" width="70"></el-table-column>
      <el-table-column prop="time" label="发布时间" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination> -->
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      activeIndex: "2",
      // page:'',
      // pagenum:'',
      tableData4: [
        {
          uid: "",
          title: "",
          content: "",
          imgs: "",
          like: "",
          comment: "",
          collection: "",
          time: "",
          tid: ""
        }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.$router.push({ name: "backstageseach" });
      }
      // console.log(key, keyPath);
    },

    deleteRow(index, rows) {
      // console.log(index);
      // console.log(this.tableData4[index].tid);
      this.axios({
        method: "post",
        url: "/backstage/remove",
        data: { tid: this.tableData4[index].tid }
      }).then(response => {
        this.$message("删除成功");
      });
      rows.splice(index, 1);
    }
  },
  created() {
    this.axios.get("/backstage/info").then(response => {
      console.log(response.data.re);
      for (var i = 0; i < response.data.re.length; i++) {
        //取出了内容为字符串
        console.log(response.data.re[i].content);
        //  this.tableData4.content='345'
        // this.arr.push(response.data.re[i].content)
      }
      console.log(this.arr);
      this.tableData4 = response.data.re;
      //  console.log(this.tableData4[0].tid)
   
    });
  }
};
</script>
<style >
.toop ul {
  list-style: none;
  float: left;
}
.toop ul li {
  display: block;
  float: left;
  width: 200px;
  background: white;
  height: 80px;
  line-height: 80px;
}
.backleft {
  width: 18%;
  background-color: pink;
  height: 200px;
  float: left;
  margin-right: 2%;
}
html {
  height: auto;
  width: 100%;
}
.app {
  min-width: 1260px;
  width: 100%;
}
el-table {
  float: right;
}

.toop {
  width: 100%;
  height: 60px;
  margin-bottom: 40px;
}
.backname {
  width: 190px;
  height: 60px;
  line-height: 60px;
  float: right;
  /* background: pink; */
  margin: 0 60px;
  color: #545c64;
}
.el-menu-demo {
  width: 100% !important;
  background-color: white;
}
#table {
  margin: 0 auto;
}
.el-table .cell {

    overflow: hidden!important;
    white-space: nowrap!important;
}


</style>