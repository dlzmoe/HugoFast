<template>
  <div class="layout">
    <Aside />
    <div class="container edit">
      <TopHeader />
      <div class="editwrap">
        <el-row :gutter="20">
          <el-col :span="8">时间：<el-input v-model="result3.date"></el-input></el-col>
          <el-col :span="8">分类：<el-input v-model="result4.category"></el-input></el-col>
          <el-col :span="8">slug：<el-input v-model="result1.slug1" disabled></el-input></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">标题：<el-input v-model="result2.title"></el-input></el-col>
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
            <el-button type="primary">发布文章</el-button>
            <el-tag type="danger">暂未对接发布api，提交无效。</el-tag>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import TopHeader from "@/components/TopHeader.vue";

import axios from "axios";
export default {
  name: "EditView",
  components: {
    Aside,
    TopHeader,
  },
  data() {
    return {
      id: "",
      text: '',
      pattern1: /slug:\s*(.*?)\n/,
      result1: { slug: '' },
      pattern2: /title:\s*(.*?)\n/,
      result2: { ttile: '' },
      pattern3: /date:\s*(.*?)\n/,
      result3: { date: '' },
      pattern4: /categories:\s*(.*?)\n/,
      result4: { category: '' },
      pattern5: /tags:\s*(.*?)\n---/,
      result5: { tags: '' },

      pattern: /^---\n([\s\S]+?)\n---/,
      content: null,
    };
  },
  methods: {
    findMatches() {
      axios
        .get(
          "https://raw.githubusercontent.com/lovezsh/hugo-blog/main/content/blog/" + this.id)
        .then((response) => {
          this.text = response.data;
          // console.log(this.text);

          this.extractMetadata();

        })
        .catch((error) => {
          console.error(error);
        });
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
      if (match3) {
        const category = match4[1].trim();
        this.result4 = { category };
      }
      // 
      // const match5 = this.text.match(this.pattern5);
      // if (match3) {
      //   const tags = match5[1].trim();
      //   this.result5 = { tags };
      // }

      const match = this.text.match(this.pattern);
      if (match) {
        this.content = this.text.replace(match[0], '').trim();
      }
    }
  },
  computed: {

  },
  mounted() {
    const id = this.$route.query.name;
    this.id = id;

    this.findMatches();
  },
};
</script>
