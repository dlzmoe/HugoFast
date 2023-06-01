<template>
  <div class="layout">
    <Aside />
    <div class="container setting">
      <TopHeader />
      <div v-loading="loading">
        <div class="item">
          <el-alert title="正在开发中，请谨慎使用。" type="warning"> </el-alert>
        </div>
        <div class="item">
          <label>域名: </label>
          <el-input v-model="setting.domain" placeholder="博客域名 https://"></el-input>
        </div>
        <div class="item">
          <label>昵称: </label>
          <el-input v-model="setting.name" placeholder="仅在管理后台生效"></el-input>
        </div>
        <div class="item">
          <label>头像: </label>
          <el-input
            v-model="setting.authorimg"
            placeholder="https://img.zburu.com/author.png"
          ></el-input>
        </div>
        <div class="item">
          <el-button type="primary" @click="saveSetting">保存设置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import TopHeader from "@/components/TopHeader.vue";

let Base64 = require("js-base64").Base64;
import axios from "axios";
export default {
  name: "setting",
  components: {
    Aside,
    TopHeader,
  },
  data() {
    return {
      loading: false,
      HugoFastghpToken: "",
      githubrepo: "",
      base64Str: "",
      setting: {
        domain: "",
        name: "",
        authorimg: "https://img.zburu.com/author.png",
      },
    };
  },
  methods: {
    saveSetting() {
      this.loading = true;

      // 对字符串进行编码
      const str = JSON.stringify(this.setting);
      this.base64Str = Base64.encode(str);

      // 没有HugoFast.config.js，新建一个
      axios
        .put(
          "https://api.github.com/repos/" +
            this.githubrepo +
            "/contents/HugoFast.config.js",
          {
            message: "更新 HugoFast.config.js 文件",
            content: this.base64Str,
          },
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: "token " + this.HugoFastghpToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.$notify({
            title: "保存成功",
            type: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
          this.$notify({
            title: "保存失败",
            type: "error",
          });
        });

      // 已有HugoFast.config.js进行修改
      // axios
      //   .put(
      //     "https://api.github.com/repos/" +
      //       this.githubrepo +
      //       "/contents/content/" +
      //       this.bloglistdir +
      //       "/" +
      //       this.id +
      //       ".md",
      //     {
      //       message: "提交于 " + this.currentDate,
      //       content: this.base64Str,
      //       sha: this.detailsSha,
      //     },
      //     {
      //       headers: {
      //         Accept: "application/vnd.github.v3+json",
      //         Authorization: "token " + this.HugoFastghpToken,
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     this.loading = false;
      //     this.$notify({
      //       title: "发布成功",
      //       type: "success",
      //     });
      //     localStorage.removeItem("HugoFastallData");
      //     this.$router.push("/");
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     this.loading = false;
      //   });
      localStorage.setItem("HugoFast_Setting", JSON.stringify(this.setting));
    },
  },
  computed: {},
  mounted() {
    this.HugoFastghpToken = localStorage.getItem("HugoFastghpToken");
    this.githubrepo = localStorage.getItem("HugoFastRepoName");
    const setting = JSON.parse(localStorage.getItem("HugoFast_Setting"));
    if (setting != "") {
      this.setting = JSON.parse(localStorage.getItem("HugoFast_Setting"));
    }
  },
};
</script>
