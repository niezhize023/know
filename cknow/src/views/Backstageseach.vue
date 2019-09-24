<template>
  <div>
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

    <div style="margin-top: 15px;" class="back-search">
      <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="用户ID" value="1"></el-option>
          <el-option label="标题" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="Searchid"></el-button>
      </el-input>
    </div>

    <el-table
      :data="tableData4"
      border
      style="width: 80%"
      id="table"
      min-height="250"
      max-height="600"
    >
      <el-table-column fixed prop="uid" label="用户" width="50"></el-table-column>
     
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="content" label="内容" width="570"></el-table-column>
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


  </div>
</template>
<script>
export default {
  data() {
    return {
      input5: "",
      select: "",
      activeIndex: "1",
      tableData4: [
        {
          uid: "",
          title: "",
          content: [],
          imgs: "",
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
      if (key == 2) {
        this.$router.push({ name: "backstage" });
      }
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
    },
    Searchid() {
      console.log(this.select);
      console.log(this.input5);
      if (this.select == 1) {
        var params = new URLSearchParams();
        params.append("uid", this.input5);

        this.axios({
          method: "post",
          url: "/backstage/searchid",
          data: params
        }).then(response => {
          console.log(response.data.re);
          this.tableData4 = response.data.re;
        });
      } else {
        var params = new URLSearchParams();
        params.append("title", this.input5);

        this.axios({
          method: "post",
          url: "/backstage/searchtitle",
          data: params
        }).then(response => {
          console.log(response.data.re);
          this.tableData4 = response.data.re;
        });
      }
    }
  }
};
</script>
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
#table {
  margin: 0 auto;
}
.back-search{
  width: 80%;
  margin: 15px auto;
}
</style>