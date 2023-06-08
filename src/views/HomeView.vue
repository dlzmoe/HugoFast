<template>
  <div class="layout">
    <Aside />
    <div class="container home">
      <TopHeader />
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card :title="this.HugoFast_ME.name">
            <a-avatar :size="64" icon="user" :src="this.HugoFast_ME.avatar_url" />
            <div class="flex">
              <a :href="this.HugoFast_ME.blog" target="_blaml">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-world" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                  <path d="M3.6 9h16.8"></path>
                  <path d="M3.6 15h16.8"></path>
                  <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                  <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                </svg>
              </a>
              <span> {{ this.HugoFast_ME.location }}</span>
            </div>
            <a slot="extra" :href="this.HugoFast_ME.html_url" target="_blank">more</a>
            <p>Repositories: {{ this.HugoFast_ME.public_repos }}</p>
            <p>Followers: {{ this.HugoFast_ME.followers }}</p>
            <p>Following: {{ this.HugoFast_ME.following }}</p>

          </a-card>
        </a-col>
        <a-col :span="18">
          <div class="markdown-body" v-html="HugoFastMeReadme"></div>
        </a-col>
      </a-row>

    </div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import TopHeader from "@/components/TopHeader.vue";
import { marked } from 'marked';
import axios from "axios";
export default {
  name: "HomeView",
  components: {
    Aside,
    TopHeader,
  },
  data() {
    return {
      bloglistdir: "",
      BasicData: "",
      HugoFast_ME: "",
      HugoFastMeReadme: "",
    };
  },
  methods: {
    // 获取仓库基本设置
    getBasicData() {
      const HugoFastBasicData = JSON.parse(localStorage.getItem("HugoFastBasicData"));
      if (HugoFastBasicData) {
        this.BasicData = HugoFastBasicData;
        this.getMe();
        this.getReadme();
      } else {
        axios
          .get("https://api.github.com/repos/" + this.githubrepo)
          .then((response) => {
            this.BasicData = response.data;
            localStorage.setItem("HugoFastBasicData", JSON.stringify(response.data));

            // 获取个人资料 / 需要用到 getBasicData 的数据
            this.getMe();
            this.getReadme();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    // 获取HugoFast.config.js
    getHugoFastConfig() {
      const HugoFast_Setting = JSON.parse(localStorage.getItem("HugoFast_Setting"));
      if (HugoFast_Setting) {
      } else {
        axios
          .get(
            "https://raw.githubusercontent.com/" +
            this.githubrepo +
            "/main/HugoFast.config.js"
          )
          .then((response) => {
            localStorage.setItem("HugoFast_Setting", JSON.stringify(response.data));
          })
          .catch((error) => { });
      }
    },
    // 获取个人资料
    getMe() {
      const HugoFast_ME = JSON.parse(localStorage.getItem("HugoFast_ME"));
      if (HugoFast_ME) {
        this.HugoFast_ME = HugoFast_ME
        console.log(this.HugoFast_ME);
      } else {
        axios
          .get(
            "https://api.github.com/users/" + this.BasicData.owner.login
          )
          .then((response) => {
            this.HugoFast_ME = response.data;
            console.log(this.HugoFast_ME);
            localStorage.setItem("HugoFast_ME", JSON.stringify(response.data));
          })
          .catch((error) => { });
      }
    },
    // 获取主页
    getReadme() {
      const HugoFastMeReadme = localStorage.getItem("HugoFastMeReadme");
      if (HugoFastMeReadme) {
        this.HugoFastMeReadme = HugoFastMeReadme;
      } else {
        axios
          .get("https://raw.githubusercontent.com/" + this.BasicData.owner.login + "/" + this.BasicData.owner.login + "/main/README.md")
          .then((response) => {
            this.HugoFastMeReadme = marked(response.data);
            localStorage.setItem("HugoFastMeReadme", this.HugoFastMeReadme);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },

  mounted() {
    this.githubrepo = localStorage.getItem("HugoFastRepoName");
    this.bloglistdir = localStorage.getItem("bloglistdir");

    this.getBasicData();
    this.getHugoFastConfig();

  },
};
</script>
