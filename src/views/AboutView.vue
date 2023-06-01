<template>
  <div class="layout">
    <Aside />
    <div class="container about">
      <TopHeader />
      <div>
        <vue-simple-markdown :source="articleDetail.context"></vue-simple-markdown>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import TopHeader from "@/components/TopHeader.vue";

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

    const HugoFastAboutArticle = localStorage.getItem("HugoFastAboutArticle", this.articleDetail.context);
    if (HugoFastAboutArticle) {
      this.articleDetail.context = HugoFastAboutArticle;
    } else {
      axios
        .get("https://raw.githubusercontent.com/lovezsh/vue-admin-hugo/main/README.md")
        .then((response) => {
          this.articleDetail.context = response.data;
          localStorage.setItem("HugoFastAboutArticle", this.articleDetail.context)
        })
        .catch((error) => {
          console.error(error);
        });
    }

  },
};
</script>
