<template>
  <div class="reg">
    <div class="tt">
   <span>用户注册</span>
      <!-- <router-link to="/login" id="ll"><span>用户登录</span></router-link>
    <router-view/> -->
</div>

<!-- <div class="big"> -->
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="70px"
      id="ff"
    >
    <!-- <div prop="name">
      <input type="text" v-model="ruleForm2.name"  placeholder="请输入账号"  class="input">
    </div>
    <div prop="password">
      <input type="password" v-model="ruleForm2.pass"  placeholder="请输入账号"  class="input">
    </div>
    <div prop="checkPass">
      <input type="password" v-model="ruleForm2.checkPass"  placeholder="请输入账号"  class="input">
    </div>
    <div prop="verification">
      <input type="text" v-model="ruleForm2.name"  placeholder="请输入账号"  class="input">
    </div> -->
      <el-form-item label="用户账号" prop="name">
        <el-input v-model="ruleForm2.name" class="input" placeholder="请输入账号">
        </el-input>
      </el-form-item>
       <el-form-item label="密码" prop="pass">
        <el-input  type="password" v-model="ruleForm2.pass" auto-complete="off"  placeholder="请输入密码"  class="input"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input  type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请确认密码"  class="input"></el-input>
      </el-form-item>
      <!-- <div class="verification"></div>
  <el-form-item label="验证码" prop="checking">
        <el-input v-model="ruleForm2.checking" placeholder="请输入验证码"  class="input"></el-input>
      </el-form-item> -->
      <el-form-item id="from">
        <el-button type="primary" @click="submitForm('ruleForm2')" id="rreg">注册</el-button>
      </el-form-item>
      <!-- </div> -->
    </el-form>
    <div class="box">
未注册手机验证后自动登录
<br>
注册即代表同意《知乎协议》《隐私保护指引》

      </div>

      <br>
     <!-- <el-button plain class="app">下载app</el-button> -->
  </div>
</template>

<script>
export default {
  data: function() {
    var checkName = (rule, str, callback) => {
      if (!str) {
        callback(new Error("用户账号不能为空"));
      }
      // setTimeout(() => {
      else if (str.length < 2 || str.length > 16) {
        callback(new Error("用户账号为2-16位"));
      } else {
          // if(this.name)
          this.CheckUser()
        callback();
      }

      // }, 100);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //验证码
    // var validatechecking = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入验证码"));
    //   } else if (value !== this.ruleForm2.checking) {
    //     callback(new Error("验证码错误请重新输入"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        name: "",
        verification:"",
  
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
       
      }
    };
  },
  methods: {
    CheckUser:function(){
      
        this.axios({
            method: "post",
            url: "/user/checkreg",
            data: this.name
          }).then(response => {
            console.log(response.data)
            if(response.data.code==-1){
                this.$confirm('你已注册,请直接登录' ,'提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
             }
          
             
           else{
              return true
            }
           this.$router.push({name:'login'})
    })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = new URLSearchParams();
          params.append("name", this.ruleForm2.name);
          params.append("passwd", this.ruleForm2.pass);
          this.axios({
            method: "post",
            url: "/user/reg",
            // contentType: "application/x-www-form-urlencoded",
            data: params
            // data:{"name": this.ruleForm2.name,
            // "passwd":this.ruleForm2.pass}
          }).then(response => {
              this.$message("注册成功");
               this.$router.push({name:'login'})
             console.log(response.data)
          });
        } else {
          console.log(error);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
body{

  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568892768234&di=92b016e9e0adb8766966051bb7bb3432&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F14%2F29%2F47e58PICQUR_1024.jpg'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  
}
.reg {
  background-color: white;
  width: 400px;
  height: 370px;

  box-sizing: border-box;
  margin:100px auto;
border-radius: 4px;
box-shadow: rgb(179, 183, 194)

}
.input{
  width: 350px;

  height: 40px;
  font-size: 16px;
}
.big{
  width: 100%;
  height: auto;


}

#rreg{
width: 350px;
 padding-left: 20px;
}
#ff{
  width: 300px;
  margin: auto

  
}
#ll{
  color: #2C3E50;
 height: 40px;
 line-height: 40px;
}
#ll:hover{
  color: #0084FF
}
#from{
  width: 300px;
 margin-left: -95px;


}
.box{
  padding:15px 20px;
  width:100%;
  height: 70px;
  box-sizing: border-box;
  background-color: #F6F6F6;
  color: #808080;
  font-size: 14px;
  text-align: left;
  
}

.about{
  width: 100%;
  height: 50px;
  background-color: red;
}

.about2{
  width: 100%;
  height: 50px;
  background-color: red;
}

.tt{
  width: 100%;
  height:40px ;
  float: left;
text-align: center;
line-height: 40px;
font-size:25px;

}
/* span{
  float: left;
  width: 100%;
}
span:hover{
  color: #0084FF;
  cursor: pointer;
}
a:hover{
  color: #0084FF;
  cursor: pointer;
} */
</style>