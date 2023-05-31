<template>
  <div class="login">
    <div class="container">
      <p>
        未检测到您的登陆信息，请重新输入：
        <i class="el-icon-warning-outline loginhint" @click="dialogVisible = true"></i>
      </p>
      <el-input
        v-model="githubrepo"
        placeholder="请输入Github仓库名，如: lovezsh/hugo-blog"
      ></el-input>
      <el-input
        v-model="ghpToken"
        placeholder="请输入Github Token，在setting中生成"
      ></el-input>
      <el-button type="primary" @click="setLogin">确认</el-button>
    </div>

    <el-dialog
      title="如何获取GitHub Token?"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <p>1. 前往 <a href="https://github.com/settings/tokens/" target="_blank">https://github.com/settings/tokens/</a></p>
      <p>2. 获取以下权限：repo / user</p>
      <p>3. 生成 token </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      githubrepo: "",
      ghpToken: "",
      dialogVisible: true,
    };
  },
  methods: {
    setLogin() {
      localStorage.setItem("githubRepoHugoToken", this.githubrepo);
      localStorage.setItem("ghpToken", this.ghpToken);
      this.$router.push("/");

      if (!this.githubrepo) {
        this.$notify.error({
          title: "未填写仓库名",
        });
        return false;
      }
      if (!this.ghpToken) {
        this.$notify.error({
          title: "未填写正确的GitHub Token！",
        });
        return false;
      }
    },

    open() {
      this.$alert("这是一段内容", "获取github token", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
  },
  mounted() {},
};
</script>
