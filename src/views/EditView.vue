<template>
  <div class="layout">
    <Aside />
    <div class="container edit">
      <TopHeader />
      <div class="editwrap" v-loading="loading">
        <el-row>
          <el-col :span="24">
            <a v-if="this.id" style="color: #409eff"
              :href="`https://github.com/${this.githubrepo}/blob/main/content/blog/${this.id}`" target="_blank">
              https://github.com/{{ this.githubrepo }} /main/content/blog/{{ this.id }}
            </a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">标题：<el-input v-model="result2.title"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">时间:<el-input v-model="result3.date" placeholder="格式如：2023-05-31"></el-input></el-col>
          <el-col :span="6">分类: <el-input v-model="result4.category" placeholder="暂时只支持填写一个分类"></el-input></el-col>
          <el-col :span="6">标签: <el-input v-model="result5.tags" placeholder="暂时只支持填写一个标签"></el-input></el-col>
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
            <el-button v-if="this.id != null" type="primary" @click="publishArticle">更新文章</el-button>
            <el-button v-else type="primary" @click="publishNews">发布新文章</el-button>
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
      bloglistdir: "",
      loading: false,
      ghpToken: "",
      githubrepo: "",
      detailsSha: "",
      id: "",
      text: "",

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
      if (this.id != null) {
        this.loading = true;
        axios
          .get(
            "https://raw.githubusercontent.com/" +
            this.githubrepo +
            "/main/content/" +
            this.bloglistdir +
            "/" +
            this.id + ".md"
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
    autogetDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.result3.date = `${year}-${month}-${day}`;
    },
    getDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.currentDate = `${year}-${month}-${day}`;
    },
    extractMetadata() {
      if (this.id != null) {

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
      }
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

` +
        this.content;

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
          this.id + ".md",
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
    async publishNews() {
      // 获取一次提交时间
      this.getDate();
      const str =
        `---
title: ` + this.result2.title + `
date: ` + this.result3.date + `
categories:
  - ` + this.result4.category + `
tags:
  - ` + this.result5.tags + `
---

` +
        this.content;

      // 对字符串进行编码
      this.base64Str = Base64.encode(str);

      if (this.result2.title == '' || this.result2.title == undefined) {
        this.$notify({
          title: "未填写标题",
          type: "error",
        });
        return false;
      }
      if (this.result3.date == '' || this.result3.date == undefined) {
        this.$notify({
          title: "未填写日期",
          type: "error",
        });
        return false;
      }
      if (this.result4.category == '' || this.result4.category == undefined) {
        this.$notify({
          title: "未填写分类",
          type: "error",
        });
        return false;
      }

      if (this.content == '' || this.content == undefined) {
        this.$notify({
          title: "请输入文章内容",
          type: "error",
        });
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
          this.result3.date + "-" + this.result2.title + ".md",
          {
            message: "提交于 " + this.currentDate,
            content: this.base64Str,
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
    this.bloglistdir = localStorage.getItem("bloglistdir");

    if (this.$route.query.name != undefined) {
      this.id = this.$route.query.name;
    } else {
      this.id = null;
    }
    this.detailsSha = this.$route.query.sha;

    this.findMatches();
    this.autogetDate();
  },
};
</script>
