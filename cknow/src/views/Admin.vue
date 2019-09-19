<template>
  <div class="admin">
    <h1>管理员登录</h1>
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="管理员账号" prop="name" >
        <el-input v-model="ruleForm2.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" >
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
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
      // setTimeout(() => {
      else if (str.length < 2 || str.length > 16) {
        callback(new Error("用户账号为2-16位"));
      } else {
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
            url: "/user/admin",
            contentType: "application/x-www-form-urlencoded",
            data: params
          }).then(response => {
            if (response.data.resu.length == 0) {
              this.$message("账号或密码错误");
              // console.log("用户账号或密码错误")
            } else {
              this.$message("登录成功");
              this.$router.push({name:'backstage'})
              this.$store.commit('alogin')
              console.log(this.$store.state.astatus)
            }
            //  console.log(response.data)
          });
        } else {
          // console.log('error submit!!');
          console.log("账号或密码错误");
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
.admin {
  /* background-color: red; */
  width: 400px;
  height: 370px;
  padding: 30px 67px 0 30px;
  box-sizing: border-box;
  margin:100px auto;
  border: 2px solid red;
}
</style>