<template>
    <div>
        <top-menu></top-menu>
        <div id="edit-center">
            <el-carousel indicator-position="none" height="200px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <!-- <h3>{{ item }}</h3> -->
                </el-carousel-item>
            </el-carousel>
            <div class="person">
                <div class="introduction">
                    <div class="pictures">
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:81/upload/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="imageUrl"
                                :src="imageUrl"
                                class="avatar"
                            />
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            ></i>
                        </el-upload>
                    </div>
                    <div class="username">
                        {{ nickname }}
                    </div>
                    <div class="backhome">返回主页 ></div>
                </div>
                <div class="person-center">
                    <div class="gender">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="用户名">
                                <el-input v-model="form.nickname"></el-input>
                            </el-form-item>

                            <el-form-item label="手机号">
                                <el-input v-model="form.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="居住地">
                                <el-input v-model="form.live"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group v-model="form.gender">
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="个人简介">
                                <el-input
                                    type="textarea"
                                    v-model="form.introduction"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit"
                                    >立即创建</el-button
                                >
                                <el-button>取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    inject: ["reload"],
    data() {
        return {
            // activeName: "first",
            nickname: "",
            imageUrl: "https://pic4.zhimg.com/da8e974dc_im.jpg",
            form: {
                live: "",
                gender: "",
                phone: "",
                introduction: "",
                nickname: localStorage.getItem("nickname")
            }
        };
    },
    created: function() {
        this.nickname = localStorage.getItem("nickname");
        this.imageUrl = localStorage.getItem("avatar");
        this.axios
            .get("/user/selectuser", {
                params: {
                    uid: localStorage.getItem("uid")
                }
            })
            .then(response => {
                console.log(response);
                this.imageUrl = response.data[0].avatar;
                this.nickname = response.data[0].nickname;
                this.form.nickname = response.data[0].nickname;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    methods: {
        onSubmit() {
            // console.log("submit!");
            this.axios
                .post("/user/editinfo", {
                    uid: localStorage.getItem("uid"),
                    imageUrl: this.imageUrl,
                    live: this.form.live,
                    gender: this.form.gender,
                    phone: this.form.phone,
                    introduction: this.form.introduction,
                    live: this.form.live,
                    nickname: this.form.nickname
                })
                .then(response => {
                    if (response.data) {
                        this.$message({
                            message: "修改成功",
                            type: "success"
                        });
                        this.reload();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleAvatarSuccess(res, file) {
            /* this.imageUrl = URL.createObjectURL(file.raw); */
            console.log(res.src);
            this.imageUrl = res.src;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/png" || "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        }
    }
};
</script>
<style>
body {
    background-color: #f6f6f6;
}
.person-center .gender .el-form {
    width: 500px;
}
.gender .el-form-item {
    width: 500px;
}
.gender .el-form-item .el-input__inner {
    border: none;
    border-bottom: 1px solid #ccc;
}
#edit-center {
    width: 1000px;
    margin: 0 auto;
    height: 800px;
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: white;
    position: relative;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.person {
    width: 100%;
    /* height: 500px; */
    background-color: white;
    position: relative;
}

.introduction .pictures {
    position: absolute;
    top: -40px;
    width: 150px;
    height: 150px;
    /* background-color: blue; */
    z-index: 9999;
}
.pictures .avatar-uploader .el-upload {
    border: none;
    position: relative;
}
.pictures .avatar-uploader .el-icon-plus:before {
    content: "\E6D9";
    display: block;
    position: absolute;
    top: 60px;
    left: 60px;
}
.introduction .username {
    /* background-color: #2c3e50; */
    width: 200px;
    height: 50px;
    position: absolute;
    top: 10px;
    left: 160px;
    line-height: 50px;
    font-size: 24px;
    font-weight: 600;
    /* color: aqua; */
}
.introduction {
    height: 120px;
    /* background-color: red; */
    border: 1px solid transparent;
    border-bottom: 1px solid #ccc;
}
.introduction .backhome {
    /* border: 1px solid transparent; */
    margin-top: 20px;
    text-align: right;
    padding-right: 30px;
    box-sizing: border-box;
}
.person-center {
    display: flex;
    justify-content: center;
    text-align: left;
    padding-top: 20px;
    box-sizing: border-box;
}
.gender {
    width: 500px;
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
    background-size: 100% 100%;
}
.el-carousel__item:nth-child(2n + 1) {
    /* background-image: url("http://pic.58pic.com/58pic/15/16/27/28E58PICUud_1024.jpg"); */
    background-size: 100% 100%;
}
/* 头像上传样式 */
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}
.avatar {
    width: 150px;
    height: 150px;
    display: block;
}
</style>