<template>
  <div class="layout">
    <Aside />
    <div class="container home">
      <TopHeader />
      <div>
        <template>
          <a-empty />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import TopHeader from "@/components/TopHeader.vue";

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

    };
  },
  methods: {},

  mounted() {
    this.githubrepo = localStorage.getItem("HugoFastRepoName");
    this.bloglistdir = localStorage.getItem("bloglistdir");


  },
};
</script>
