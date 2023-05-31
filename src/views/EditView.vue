<template>
  <div class="layout">
    <Aside />
    <div class="container edit">
      <TopHeader />
      <div class="editwrap" v-loading="loading">
        <el-row>
          <el-col :span="24">
            <a
              v-if="this.id"
              style="color: #409eff"
              :href="`https://github.com/${this.githubrepo}/blob/main/content/blog/${this.id}`"
              target="_blank"
            >
              https://github.com/{{ this.githubrepo }} /main/content/blog/{{ this.id }}
            </a>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"
            >时间：<el-input v-model="result3.date" disabled></el-input
          ></el-col>
          <el-col :span="6"
            >分类：<el-input v-model="result4.category" disabled></el-input
          ></el-col>
          <el-col :span="6"
            >标签：<el-input v-model="result5.tags" disabled></el-input
          ></el-col>
          <el-col :span="6"
            >slug：<el-input v-model="result1.slug1" disabled></el-input
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            >标题：<el-input v-model="result2.title" disabled></el-input
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <template>
              <el-input type="textarea" v-model="content" class="content"></el-input>
            </template>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-button v-if="this.id" type="primary" @click="publishArticle"
              >发布文章</el-button
            >
          </el-col>
        </el-row>
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
      loading: false,
      ghpToken: "",
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
    findMatches() {
      if (this.id) {
        this.loading = true;
        axios
          .get(
            "https://raw.githubusercontent.com/" +
              this.githubrepo +
              "/main/content/blog/" +
              this.id
          )
          .then((response) => {
            this.text = response.data;
            // console.log(this.text);
            this.extractMetadata();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    getDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.currentDate = `${year}-${month}-${day}`;
    },
    extractMetadata() {
      const match1 = this.text.match(this.pattern1);
      if (match1) {
        const slug1 = match1[1].trim();
        this.result1 = { slug1 };
      }
      //
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
slug: ` +
        this.result1.slug1 +
        `
title: ` +
        this.result2.title +
        `
date: ` +
        this.result3.date +
        `
categories:
  ` +
        this.result4.category +
        `
tags:
  ` +
        this.result5.tags +
        `
---

` +
        this.content;

      // 对字符串进行编码
      this.base64Str = Base64.encode(str);

      axios
        .put(
          "https://api.github.com/repos/" +
            this.githubrepo +
            "/contents/content/blog/" +
            this.id,
          {
            message: "提交于 " + this.currentDate,
            content: this.base64Str,
            sha: this.detailsSha,
          },
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: "token " + this.ghpToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.$notify({
            title: "发布成功",
            type: "success",
          });
          localStorage.removeItem("allData");
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
    this.ghpToken = localStorage.getItem("ghpToken");
    this.githubrepo = localStorage.getItem("githubRepoHugoToken");

    this.id = this.$route.query.name;
    this.detailsSha = this.$route.query.sha;

    this.findMatches();
  },
};
</script>
