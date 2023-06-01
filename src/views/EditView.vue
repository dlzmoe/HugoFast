<template>
  <div class="layout">
    <Aside />
    <div class="container edit">
      <TopHeader />
      <div class="editwrap" v-loading="loading">
        <a-row>
          <a-col :span="24">
            <div class="edit-headicon">
              <a v-if="this.id" style="color: #000"
                :href="`https://github.com/${this.githubrepo}/blob/main/content/${this.bloglistdir}/${this.id}.md`"
                target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" width="24"
                  height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5">
                  </path>
                </svg>
              </a>
              <a target="_blank"
                :href="`${this.setting.domain}/${this.bloglistdir}/${this.result3.date}-${this.result2.title}`"
                style="color: #000">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-world" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                  <path d="M3.6 9h16.8"></path>
                  <path d="M3.6 15h16.8"></path>
                  <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                  <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                </svg></a>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">标题：<a-input v-model="result2.title" /></a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="8">时间: <a-input v-model="result3.date" placeholder="格式如：2023-05-31" /></a-col>
          <a-col :span="8">分类:
            <a-input v-model="result4.category" placeholder="暂时只支持填写一个分类" />
          </a-col>
          <a-col :span="8">标签:
            <a-input v-model="result5.tags" placeholder="暂时只支持填写一个标签" />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <template>
              <a-textarea v-model="content" class="content" auto-size />
            </template>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-button type="primary" @click="publishArticle">更新文章</a-button>
          </a-col>
        </a-row>
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
  name: "EditView",
  components: {
    Aside,
    TopHeader,
  },
  data() {
    return {
      bloglistdir: "",
      loading: false,
      HugoFastghpToken: "",
      githubrepo: "",
      detailsSha: "",
      id: "",
      text: "",
      pattern1: /slug:\s*(.*?)\n/,
      result1: { slug: "" },
      pattern2: /title:\s*(.*?)\n/,
      result2: { ttile: "" },
      pattern3: /date:\s*(.*?)\n/,
      result3: { date: "" },
      pattern4: /categories:\s*(.*?)\n/,
      result4: { category: "" },
      pattern5: /tags:\s*(.*?)\n/,
      result5: { tags: "" },

      pattern: /^---\n([\s\S]+?)\n---/,
      content: null,
      currentDate: "",
      base64Str: "",

      setting: {
        domain: "",
      },
    };
  },
  methods: {
    findMatches() {
      this.loading = true;
      axios
        .get(
          "https://raw.githubusercontent.com/" +
          this.githubrepo +
          "/main/content/" +
          this.bloglistdir +
          "/" +
          this.id +
          ".md"
        )
        .then((response) => {
          this.text = response.data;
          this.extractMetadata();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.currentDate = `${year}-${month}-${day}`;
    },
    extractMetadata() {
      const match2 = this.text.match(this.pattern2);
      if (match2) {
        const title = match2[1].trim();
        this.result2 = { title };
      }
      //
      const match3 = this.text.match(this.pattern3);
      if (match3) {
        const date = match3[1].trim();
        this.result3 = { date };
      }
      //
      const match4 = this.text.match(this.pattern4);
      if (match4) {
        const category = match4[1].trim();
        this.result4 = { category };
      }
      //
      const match5 = this.text.match(this.pattern5);
      if (match5) {
        const tags = match5[1].trim();
        this.result5 = { tags };
      }

      const match = this.text.match(this.pattern);
      if (match) {
        this.content = this.text.replace(match[0], "").trim();
      }

      this.loading = false;
    },
    async publishArticle() {
      this.loading = true;
      // 获取一次提交时间
      this.getDate();
      const str =
        `---
title: ` + this.result2.title + `
date: ` + this.result3.date + `
categories:
  ` + this.result4.category + `
tags:
  ` + this.result5.tags + `
---

` + this.content;

      // 对字符串进行编码
      this.base64Str = Base64.encode(str);

      // 编辑旧文章
      axios
        .put(
          "https://api.github.com/repos/" +
          this.githubrepo +
          "/contents/content/" +
          this.bloglistdir +
          "/" +
          this.id +
          ".md",
          {
            message: "提交于 " + this.currentDate,
            content: this.base64Str,
            sha: this.detailsSha,
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
          this.$message.success('更新成功');
          localStorage.removeItem("HugoFastallData");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
  },
  computed: {},
  mounted() {
    this.HugoFastghpToken = localStorage.getItem("HugoFastghpToken");
    this.githubrepo = localStorage.getItem("HugoFastRepoName");
    this.bloglistdir = localStorage.getItem("bloglistdir");
    this.setting = JSON.parse(localStorage.getItem("HugoFast_Setting"));

    if (this.$route.query.name != undefined) {
      this.id = this.$route.query.name;
    } else {
      this.id = null;
    }
    this.detailsSha = this.$route.query.sha;

    this.findMatches();
  },
};
</script>
