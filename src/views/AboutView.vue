<template>
  <div class="layout">
    <Aside />
    <div class="container about">
      <TopHeader />

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
     
    };
  },
  methods: {
    
  },
  mounted() {
    this.githubrepo = localStorage.getItem("githubRepoHugoToken");
    axios
      .get("https://api.github.com/repos/" + this.githubrepo)
      .then((response) => {
       
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
