<template>
    <div>
        <div id="wangeditor">
            <div class="top"  >
               <h1>写文章</h1>
            </div>
            <input
                type="text"
                id="input"
                placeholder="请输入标题(最多50个字)"
                v-model="title"
            />
            <!-- <textarea name="" id="text"> -->
            <div ref="editorElem" class="wangeditor"></div>
            <!-- </textarea> -->
        </div>
        <el-row>
            <el-button type="primary" plain @click="release"
                >发布文章</el-button
            >
            <el-button type="info" plain @click="signout">退出</el-button>
        </el-row>
    </div>
</template>
<script>
import E from "wangeditor";

export default {
    inject: ["reload"],
    name: "Editor",
    data() {
        return {
            img:'',
            editor: null,
            editorContent: "",
            title: "",
            dialogImageUrl: '',
        dialogVisible: false
        };
    },
    methods: {
        signout: function() {
            this.$router.push({ name: "login" });
        },
        release: function() {
            var time = new Date();
            var publishtime = time.toLocaleString();
            var par = {
                title: this.title,
                editorContent: this.editorContent,
                uid: localStorage.getItem("uid"),
                publishtime
            };
            this.axios({
                method: "post",
                url: "/user/write",
                data: par
            }).then(response => {
                if (response.data.code == 1) {
                    // console.log(publishtime)
                    this.$message("发布成功");
                    //  this.$router.go(0)
                    this.reload();
                    // this.$router.push({ name: "write" });
                } else {
                    console.log(response.data);
                }
            });
            console.log(this.title);
            console.log(this.editorContent);
        },
        catchData: function() {
            console.log(this.editorContent);
        }
    },
    // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
    // props: ['catchData'], // 接收父组件的方法
    mounted() {
        this.editor = new E(this.$refs.editorElem);
        // 编辑器的事件，每次改变会获取其html内容
        this.editor.customConfig.onchange = html => {
            this.editorContent = html;
            this.catchData(this.editorContent);
            // 把这个html通过catchData的方法传入父组件
        };

        this.editor.customConfig.menus = [
            // 菜单配置
            "head", // 标题
            "bold", // 粗体
            "fontSize", // 字号
            "fontName", // 字体
            "italic", // 斜体
            "underline", // 下划线
            "strikeThrough", // 删除线
            "foreColor", // 文字颜色
            "backColor", // 背景颜色
            "link", // 插入链接
            "list", // 列表
            "justify", // 对齐方式
            "quote", // 引用
            "emoticon", // 表情
            "image", // 插入图片
            "table", // 表格
            "code", // 插入代码
            "undo", // 撤销
            "redo" // 重复
        ];
        this.editor.customConfig.uploadImgServer =
            "http://localhost:81/upload/img";
        this.editor.customConfig.uploadImgParamsWithUrl = true;
        this.editor.customConfig.uploadFileName = "imgs";
        this.editor.create(); // 创建富文本实例
    }
};
</script>
<style scoped>
html {
    width: 1000px;
    /* height: 350px; */
    margin: auto;
}
.wangeditor{
    text-align: left;
}
.top {
    width: 1000px;
    height: 100px;
    text-align: center;
    line-height: 80px;
}
#input {
    width: 1000px;
    height: 100px;
    font-size: 24px;
    padding-left: 20px;
    box-sizing: border-box;
    outline: none;
}
#wangeditor {
    width: 1000px;
    margin: auto;
}

</style>