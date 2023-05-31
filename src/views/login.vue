<template>
  <div class="login">
    <div class="container">
      <p>
        未检测到您的登陆信息，请重新输入：
        <el-tag type="warning" @click="dialogVisible = true"
          >查看：如何获取GitHub Token?</el-tag
        >
      </p>
      <el-input
        v-model="ghpToken"
        placeholder="请输入Github Token，在setting中生成"
      ></el-input>
      <el-input
        v-model="githubrepo"
        placeholder="请输入Github仓库名，如: lovezsh/hugo-blog"
        @blur="repoflie"
      ></el-input>
      <el-autocomplete
        class="inline-input"
        v-model="state1"
        :fetch-suggestions="querySearch"
        placeholder="选择目录"
        @select="handleSelect"
        @input="blogdir"
        v-if="hide1"
      ></el-autocomplete>
      <el-button type="primary" @click="setLogin" v-if="hide2">确认</el-button>
    </div>

    <div class="fixed">
      <el-link href="https://github.com/lovezsh/vue-admin-hugo" target="_blank">https://github.com/lovezsh/vue-admin-hugo</el-link>
    </div>

    <el-dialog title="如何获取GitHub Token?" :visible.sync="dialogVisible" width="30%">
      <p>
        1. 前往
        <el-link href="https://github.com/settings/tokens/" target="_blank"
          >https://github.com/settings/tokens/</el-link
        >
      </p>
      <p>2. 获取以下权限：repo / user</p>
      <p>3. 生成 token</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      ghpToken: "",
      githubrepo: "",
      dialogVisible: false,
      restaurants: [],
      state1: "",
      hide1: false,
      hide2: false,
    };
  },
  methods: {
    setLogin() {
      localStorage.setItem("githubRepoHugoToken", this.githubrepo);
      localStorage.setItem("ghpToken", this.ghpToken);

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

      
      this.$router.push("/");
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
    repoflie() {
      if (this.githubrepo == "") {
        return false;
      }
      axios
        .get("https://api.github.com/repos/" + this.githubrepo + "/contents/content")
        .then((response) => {
          const originalArray = response.data;
          const originalArray1 = originalArray.filter((item) => item.type === "dir");
          const newArray = originalArray1.map((item) => {
            return {
              value: item.name,
            };
          });
          this.restaurants = newArray;
          this.hide1 = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {},
    blogdir() {
      this.hide2 = true;
      localStorage.setItem("bloglistdir", this.state1);
    },
  },
  mounted() {},
};
</script>
