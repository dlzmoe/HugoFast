<template>
  <div class="layout">
    <Aside />
    <div class="container edit">
      <TopHeader />
      <div class="editwrap" v-loading="loading">
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
            <a-button type="primary" @click="publishNews">发布新文章</a-button>
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
  name: "PublishView",
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
    };
  },
  methods: {
    getDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.currentDate = `${year}-${month}-${day}`;
    },
    autogetDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.result3.date = `${year}-${month}-${day}`;
    },

    async publishNews() {
      // 获取一次提交时间
      const str =
        `---
title: ` + this.result2.title + `
date: ` + this.result3.date + `
categories:
  - ` + this.result4.category + `
tags:
  - ` + this.result5.tags + `
---

` + this.content;

      // 对字符串进行编码
      this.base64Str = Base64.encode(str);

      if (this.result2.title == "" || this.result2.title == undefined) {
        this.$message.error('未填写标题');
        return false;
      }
      if (this.result3.date == "" || this.result3.date == undefined) {
        this.$message.error('未填写日期');
        return false;
      }
      if (this.result4.category == "" || this.result4.category == undefined) {
        this.$message.error('未填写分类');
        return false;
      }

      if (this.content == "" || this.content == undefined) {
        this.$message.error('请输入文章内容');
        return false;
      }

      this.loading = true;
      // 发布新文章
      axios
        .put(
          "https://api.github.com/repos/" +
          this.githubrepo +
          "/contents/content/" +
          this.bloglistdir +
          "/" +
          this.result3.date +
          "-" +
          this.result2.title +
          ".md",
          {
            message: "提交于 " + this.currentDate,
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
          this.loading = false;
          this.$message.success('发布成功');
          localStorage.removeItem("HugoFastallData");
          this.$router.push("/list");
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

    this.autogetDate();
  },
};
</script>
