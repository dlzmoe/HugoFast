<template>
  <div class="layout">
    <Aside />
    <div class="container about">
      <TopHeader />
      <div>
        <div class="markdown-body" v-html="articleDetail.context"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import TopHeader from "@/components/TopHeader.vue";
import { marked } from 'marked';
import axios from "axios";
export default {
  name: "AboutView",
  components: {
    Aside,
    TopHeader,
  },
  data() {
    return {
      bloglistdir: "",
      articleDetail: {
        context: "",
      },
    };
  },
  methods: {},

  mounted() {
    this.githubrepo = localStorage.getItem("HugoFastRepoName");
    this.bloglistdir = localStorage.getItem("bloglistdir");

    const HugoFastAboutArticle = localStorage.getItem("HugoFastAboutArticle");
    if (HugoFastAboutArticle) {
      this.articleDetail.context = HugoFastAboutArticle;
    } else {
      axios
        .get("https://raw.githubusercontent.com/lovezsh/vue-admin-hugo/main/README.md")
        .then((response) => {
          this.articleDetail.context = marked(response.data);
          localStorage.setItem("HugoFastAboutArticle", this.articleDetail.context)

        })
        .catch((error) => {
          console.error(error);
        });
    }

  },
};
</script>
