<template>
    <div class="app">
       <div class="toop">
         <ul>
           <li>13</li>
           <li>23</li>
           <li>33</li>
         </ul>
       </div>
<div class="backleft"> 

</div>
<div>
</div>


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
      prop="imgs"
      label="图片"
      width="120">
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
          content: [],
          imgs: '',
          like: '',
          comment: '',
          collection:'',
          time:'',
          tid:''
        
   
        }],
        arr:[]
      };
    },
    methods: {
       getinfo(){
        //  var str=new RegExp()
        // console.log(this.tableData4.content)
      // var str=this.tableData4.content
        
        // str.replace("<.*?(?<=/>)","")
        // this.tableData4.content=str
//<(\S*?)[^>]*>.*?</>|<.*? />
// this.tableData4.content=this.tableData4.content.replaceAll("<script.*?(?<=/script>)","")
       },
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
        console.log(index)
        console.log(this.tableData4[index].tid)
           this.axios({
            method: "post",
            url: "/backstage/remove",
            data: {tid:this.tableData4[index].tid}
          }).then(response => {
              this.$message("删除成功");
          
          });
          rows.splice(index, 1);
      }

    },
    created() {
    
      this.axios.get('/backstage/info').then((response) => {
        console.log(response.data.re)
//         for(var i=0;i<response.data.re.length;i++){
   
//          console.log(response.data.re[i].content)
// response.data.re[i].content
//         //  response.data.re[i].content    
//           // this.arr.push(response.data.re[i].content)
//         }
//         console.log(this.arr)
      this.tableData4=response.data.re
   console.log(this.tableData4[0].tid)
        this.getinfo()
      
})
    },

}
</script>
<style>
ul{
  list-style:none;

}
ul li{
  display: block
}
.backleft{
  width: 18%;
  background-color: pink;
  height: 200px;
  float: left;
  margin-right: 2%;
}
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
  
   .toop{
     width: 100%;
     height: 80px;
     background-color: red;
   }


</style>