<template>
  <div class="layout">
    <Aside />
    <div class="container about">
      <TopHeader />
      <el-row>
        <el-col :span="12"><el-input v-model="metaData.date" placeholder="请输入内容"></el-input></el-col>
        <el-col :span="12">{{ metaData.slug }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">{{ metaData.title }}</el-col>
      </el-row>
      <p>{{ extractedText }}</p>
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
      markdownContent: "",
      metaData: null,
    };
  },
  methods: {
    async getDetails() {
      axios
        .get(
          "https://raw.githubusercontent.com/lovezsh/hugo-blog/main/content/blog/" + this.id)
        .then((response) => {
          this.markdownContent = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {
    extractedMetadata() {
      const metadataStart = this.markdownContent.indexOf("---") + 3;
      const metadataEnd = this.markdownContent.indexOf("---", metadataStart);
      const metadataString = this.markdownContent
        .substring(metadataStart, metadataEnd)
        .trim();

      const metadataObject = {};
      const metadataLines = metadataString.split("\n");
      for (const line of metadataLines) {
        const [key, value] = line.split(":").map((str) => str.trim());
        if (key && value) {
          if (value.startsWith("[") && value.endsWith("]")) {
            metadataObject[key] = value
              .substring(1, value.length - 1)
              .split(",")
              .map((tag) => tag.trim());
          } else {
            metadataObject[key] = value;
          }
        }
      }
      this.metaData = metadataObject;
      console.log(this.metaData);
      return metadataObject;
    },
    extractedText() {
      const textStart =
        this.markdownContent.indexOf("---", this.markdownContent.indexOf("---") + 3) + 3;
      return this.markdownContent.substring(textStart).trim();
    },
  },
  mounted() {
    const id = this.$route.query.name;
    this.id = id;

    this.getDetails();
  },
};
</script>
