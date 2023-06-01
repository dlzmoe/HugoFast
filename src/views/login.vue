<template>
  <div class="login">
    <div class="container">
      <h1>HugoFast</h1>
      <p>
        未检测到您的登陆信息：
        <el-tag type="warning" @click="dialogVisible = true">查看：如何获取GitHub Token?</el-tag>
      </p>
      <a-input v-model="HugoFastghpToken" placeholder="请输入Github Token，在setting中生成" />
      <a-input v-model="githubrepo" placeholder="请输入Github仓库名，如: lovezsh/hugo-test" @blur="repoflie" />

      <a-select show-search v-model="state1" placeholder="选择目录" option-filter-prop="children" style="width:100%"
        :filter-option="filterOption" v-if="hide1" @change="blogdir">
        <a-select-option v-for="(item, index) in restaurants" :key="index" :value="item.value">
          {{ item.value }}
        </a-select-option>
      </a-select>

      <a-button type="primary" @click="setLogin" v-if="hide2">确认</a-button>
    </div>

    <div class="fixed">
      <a href="https://github.com/lovezsh/HugoFast" target="_blank">Github</a>
    </div>

    <el-dialog title="如何获取GitHub Token?" :visible.sync="dialogVisible" width="30%">
      <p>
        1. 前往
        <el-link href="https://github.com/settings/tokens/" target="_blank">https://github.com/settings/tokens/</el-link>
      </p>
      <p>2. 获取以下权限：repo / user</p>
      <p>3. 生成 token</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      HugoFastghpToken: "",
      githubrepo: "",
      dialogVisible: false,
      restaurants: [],
      state1: "",
      hide1: false,
      hide2: false,
    };
  },
  methods: {
    setLogin() {
      localStorage.setItem("HugoFastRepoName", this.githubrepo);
      localStorage.setItem("HugoFastghpToken", this.HugoFastghpToken);

      if (!this.githubrepo) {
        this.$message.error('未填写仓库名');
        return false;
      }
      if (!this.HugoFastghpToken) {
        this.$message.error('未填写正确的GitHub Token！');
        return false;
      }


      this.$router.push("/");
    },
    repoflie() {
      if (this.githubrepo == "") {
        return false;
      }
      axios
        .get("https://api.github.com/repos/" + this.githubrepo + "/contents/content")
        .then((response) => {
          const originalArray = response.data;
          const originalArray1 = originalArray.filter((item) => item.type === "dir");
          const newArray = originalArray1.map((item) => {
            return {
              value: item.name,
            };
          });
          this.restaurants = newArray;
          console.log(this.restaurants);
          this.hide1 = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    blogdir() {
      this.hide2 = true;
      localStorage.setItem("bloglistdir", this.state1);
    },

    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log('blur');
    },
    handleFocus() {
      console.log('focus');
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  },
  mounted() { },
};
</script>
