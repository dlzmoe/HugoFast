<template>
  <div class="login">
    <div class="container">
      <img src="@/assets/logo.png" alt="" />
      <!-- <h1>HugoFast</h1> -->
      <p>
        未检测到您的登陆信息：<a-tag color="orange" @click="showModal"
          >查看：如何获取GitHub Token?</a-tag
        >
      </p>

      <a-input
        v-model="HugoFastghpToken"
        placeholder="请输入Github Token，在setting中生成"
      />
      <a-input
        v-model="githubrepo"
        placeholder="请输入Github仓库名，如: lovezsh/hugo-test"
        @blur="repoflie"
      />
      <a-row :gutter="[24, 8]">
        <a-col :span="12">
          <a-select
            show-search
            v-model="state"
            placeholder="选择目录"
            option-filter-prop="children"
            style="width: 100%"
            :filter-option="filterOption"
            v-if="hide1"
            @change="blogdir"
          >
            <a-select-option
              v-for="(item, index) in restaurants"
              :key="index"
              :value="item.value"
            >
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="12">
          <a-select
            show-search
            v-model="state1"
            placeholder="选择目录"
            option-filter-prop="children1"
            style="width: 100%"
            :filter-option="filterOption1"
            v-if="hide11"
            @change="blogdir1"
          >
            <a-select-option
              v-for="(item, index) in restaurants1"
              :key="index"
              :value="item.value"
            >
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row :gutter="[24, 8]" v-if="hide2">
        <a-col :span="12">
          <a-select
            show-search
            v-model="state2"
            placeholder="选择目录"
            option-filter-prop="children2"
            style="width: 100%"
            :filter-option="filterOption2"
            @change="blogdir2"
          >
            <a-select-option
              v-for="(item, index) in restaurants2"
              :key="index"
              :value="item.value"
            >
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="12">
          <a-button type="primary" @click="setLogin">登陆</a-button>
        </a-col>
      </a-row>

      <a-alert
        v-if="showLoginErrorMessage === true"
        :message="loginErrorMessage"
        type="warning"
        closable
        @close="showLoginErrorMessage = false"
      />
    </div>

    <div class="fixed">
      <a href="https://github.com/lovezsh/HugoFast" target="_blank">Github</a>
      |
      <a href="https://hugofast-docs.netlify.app/" target="_blank">使用文档</a>
    </div>

    <a-modal
      title="如何获取GitHub Token?"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>
        使用文档：<a href="https://hugofast-docs.netlify.app/" target="_blank"
          >https://hugofast-docs.netlify.app/</a
        >
      </p>
      <p>
        1. 前往
        <a href="https://github.com/settings/tokens/" target="_blank"
          >https://github.com/settings/tokens/</a
        >
      </p>
      <p>2. 获取以下权限：repo / user</p>
      <p>3. 生成 token</p>
    </a-modal>
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
      restaurants: [],
      restaurants1: [],
      restaurants2: [],
      state: "",
      state1: "",
      state2: "",
      loginErrorMessage: "",
      showLoginErrorMessage: false,
      hide1: false,
      hide11: false,
      hide2: false,

      visible: false,
      confirmLoading: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.visible = false;
    },
    handleCancel(e) {
      this.visible = false;
    },
    setLogin() {
      if (!this.HugoFastghpToken) {
        this.$message.error("未填写正确的GitHub Token！");
        return false;
      }
      validateGitHubToken(this.HugoFastghpToken).then((isValidToken) => {
        if (!this.githubrepo) {
          this.$message.error("未填写仓库名");
          this.showLoginErrorMessage = true;
          return false;
        }
        if (isValidToken) {
          localStorage.setItem("HugoFastRepoName", this.githubrepo);
          localStorage.setItem("HugoFastghpToken", this.HugoFastghpToken);
          if (this.state2 != "") {
            localStorage.setItem(
              "bloglistdir",
              this.state + "/" + this.state1 + "/" + this.state2
            );
          } else {
            localStorage.setItem("bloglistdir", this.state + "/" + this.state1);
          }
          this.showLoginErrorMessage = false;
          this.$router.push("/");
        } else {
          this.loginErrorMessage = "GitHub Token 无效，请检查Token是否正确";
          this.showLoginErrorMessage = true;
        }
      });
    },
    /** Log in to check */
    repoflie() {
      if (this.githubrepo == "") {
        this.loginErrorMessage = "请填写仓库名";
        this.showLoginErrorMessage = true;
        return false;
      }
      axios
        .get("https://api.github.com/repos/" + this.githubrepo + "/contents")
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
          this.showLoginErrorMessage = false;
        })
        .catch((error) => {
          this.loginErrorMessage = "仓库地址无效，请检查仓库地址";
          this.showLoginErrorMessage = true;
          console.error(error);
        });
    },
    blogdir() {
      this.hide11 = true;
      axios
        .get(
          "https://api.github.com/repos/" + this.githubrepo + "/contents/" + this.state
        )
        .then((response) => {
          const originalArray = response.data;
          const originalArray1 = originalArray.filter((item) => item.type === "dir");
          const newArray = originalArray1.map((item) => {
            return {
              value: item.name,
            };
          });
          this.restaurants1 = newArray;
          console.log(this.restaurants1);
          this.hide1 = true;
          this.showLoginErrorMessage = false;
        })
        .catch((error) => {
          this.loginErrorMessage = "仓库地址无效，请检查仓库地址";
          this.showLoginErrorMessage = true;
          console.error(error);
        });
    },
    blogdir1() {
      this.hide2 = true;
      axios
        .get(
          "https://api.github.com/repos/" +
            this.githubrepo +
            "/contents/" +
            this.state +
            "/" +
            this.state1
        )
        .then((response) => {
          const originalArray1 = response.data;
          const originalArray2 = originalArray1.filter((item) => item.type === "dir");
          const newArray = originalArray2.map((item) => {
            return {
              value: item.name,
            };
          });
          this.restaurants1 = newArray;
          console.log(this.restaurants1);
          this.hide1 = true;
          this.showLoginErrorMessage = false;
        })
        .catch((error) => {
          this.loginErrorMessage = "仓库地址无效，请检查仓库地址";
          this.showLoginErrorMessage = true;
          console.error(error);
        });
    },
    blogdir2() {
      if (this.state2 != "") {
        localStorage.setItem(
          "bloglistdir",
          this.state + "/" + this.state1 + "/" + this.state2
        );
      } else {
        localStorage.setItem("bloglistdir", this.state + "/" + this.state1);
      }
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    filterOption1(input, option) {
      return (
        option.componentOptions.children1[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    filterOption2(input, option) {
      return (
        option.componentOptions.children2[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
  mounted() {},
};

/** GitHub Token validation */
const validateGitHubToken = (token) => {
  const headers = { Authorization: `token ${token}` };
  return axios
    .get("https://api.github.com/user", { headers })
    .then((response) => true)
    .catch((error) => false);
};
</script>
