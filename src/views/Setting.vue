<template>
  <div class="layout">
    <Aside />
    <div class="container setting">
      <TopHeader />
      <div v-loading="loading">
        <div class="item">
          <a-alert message="正在开发中，请谨慎使用。" banner style="width:100%" />
        </div>
        <div class="item">
          <label>域名: </label>
          <a-input v-model="setting.domain" placeholder="博客域名 https://"></a-input>
        </div>
        <div class="item">
          <label>昵称: </label>
          <a-input v-model="setting.name" placeholder="仅在管理后台生效"></a-input>
        </div>
        <div class="item">
          <label>头像: </label>
          <a-input v-model="setting.authorimg" placeholder="https://img.zburu.com/author.png"></a-input>
        </div>
        <div class="item">
          <a-button type="primary" @click="saveSetting">保存设置</a-button>
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
      settingBlo: false,
      setting: {
        domain: "",
        name: "",
        authorimg: "https://img.zburu.com/author.png",
      },
      ConfigSha: '',
    };
  },
  methods: {
    getConfigSha() {
      const HugoFastConfigSha = localStorage.getItem('HugoFastConfigSha');
      if (HugoFastConfigSha) {
        this.ConfigSha = HugoFastConfigSha;
      } else {
        axios
          .get("https://api.github.com/repos/" + this.githubrepo + "/contents/HugoFast.config.js")
          .then((response) => {
            this.ConfigSha = response.data.sha;
            localStorage.setItem('HugoFastConfigSha', this.ConfigSha);
          })
          .catch((error) => { });
      }

    },
    saveSetting() {
      this.loading = true;

      // 对字符串进行编码
      const str = JSON.stringify(this.setting);
      this.base64Str = Base64.encode(str);

      if (this.settingBlo == false) {
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
            this.$message.success('保存成功');
            localStorage.removeItem("HugoFastConfigSha");
            this.getConfigSha();
          })
          .catch((error) => {
            console.error(error);
            this.loading = false;
            this.$message.error('保存失败，请稍后重新保存');
          });
      } else {
        // 已有HugoFast.config.js进行修改
        axios
          .put(
            "https://api.github.com/repos/" +
            this.githubrepo +
            "/contents/HugoFast.config.js",
            {
              message: "提交于 " + this.currentDate,
              content: this.base64Str,
              sha: this.ConfigSha,
            },
            {
              headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: "token " + this.HugoFastghpToken,
              },
            }
          )
          .then((response) => {
            this.loading = false;
            this.$message.success('保存成功');
            localStorage.removeItem("HugoFastConfigSha");
            this.getConfigSha();
          })
          .catch((error) => {
            console.error(error);
            this.loading = false;
            this.$message.error('保存失败，请稍后重新保存');
          });
      }

      localStorage.setItem("HugoFast_Setting", JSON.stringify(this.setting));
    },
  },
  computed: {},
  mounted() {
    this.HugoFastghpToken = localStorage.getItem("HugoFastghpToken");
    this.githubrepo = localStorage.getItem("HugoFastRepoName");
    const setting = JSON.parse(localStorage.getItem("HugoFast_Setting"));
    if (setting) {
      this.settingBlo = true;
      this.setting = JSON.parse(localStorage.getItem("HugoFast_Setting"));
    }
    this.getConfigSha();
  },
};
</script>
