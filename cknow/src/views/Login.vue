<template>
  <div class="login">
    <div class="tt">
      <span>用户登录</span>
    </div>
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="70px"
      id="ff"
    >
      <el-form-item label="用户账号" prop="name">
        <el-input v-model="ruleForm2.name" class="input" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"  class="input"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请确认密码"  class="input"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" id="rreg">登录</el-button>
        <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data: function() {
    var checkName = (rule, str, callback) => {
      if (!str) {
        callback(new Error("用户账号不能为空"));
      }
      else if (str.length < 2 || str.length > 16) {
        callback(new Error("用户账号为2-16位"));
      } else {
        callback();
      }
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
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        name: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = new URLSearchParams();
          params.append("name", this.ruleForm2.name);
          params.append("passwd", this.ruleForm2.pass);
          this.axios({
            method: "post",
            url: "/user/login",
            contentType: "application/x-www-form-urlencoded",
            data: params
          }).then(response => {
            if (response.data.resu.length == 0) {
              this.$message("用户账号或密码错误");
            } else {
              this.$message("登录成功");
              // console.log(response.data.resu[0].uid)
              this.$router.push({name:'home'})
              this.$store.commit('increment')
              localStorage.setItem("token",this.$store.state.status)
              localStorage.setItem("uid",response.data.resu[0].uid)
            }
          });
        } else {
          console.log("用户账号或密码错误");
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
  /* position: absolute; */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568892768234&di=92b016e9e0adb8766966051bb7bb3432&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F14%2F29%2F47e58PICQUR_1024.jpg'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  
}
.login {
background-color: white;
  width: 400px;
  height: 370px;
  /* padding: auto; */
  /* padding: 30px 67px 0 67px; */
  box-sizing: border-box;
  margin:100px auto;
border-radius: 4px;
box-shadow: rgb(179, 183, 194)
  /* border: 2px solid red; */
}
.input{
  width: 350px;
  /* margin: 200px; */
  height: 40px;
  font-size: 16px;
  /* border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
border-bottom: 1px solid #DCDFE6; */
}
#rreg{
/* width: 350px;  */
    margin: 0 0 0 -90px;
/* padding-left: 20px; */
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

 /* text-align: center; */
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
span{
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
}
</style>