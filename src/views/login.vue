<template>
  <div class="login">
    <div class="container">
      <img src="@/assets/logo.png" alt="" />
      <!-- <h1>HugoFast</h1> -->
      <p>未检测到您的登陆信息：<a-tag color="orange" @click="showModal">查看：如何获取GitHub Token?</a-tag></p>

      <a-input v-model="HugoFastghpToken" placeholder="请输入Github Token，在setting中生成" @blur="repoflie" />
      <a-input v-model="githubrepo" placeholder="请输入Github仓库名，如: lovezsh/hugo-test" @blur="repoflie" />

      <a-select
        show-search
        v-model="state1"
        placeholder="选择目录"
        option-filter-prop="children"
        style="width: 100%"
        :filter-option="filterOption"
        v-if="hide1"
        @change="blogdir"
      >
        <a-select-option v-for="(item, index) in restaurants" :key="index" :value="item.value">
          {{ item.value }}
        </a-select-option>
      </a-select>

      <a-button type="primary" @click="setLogin" v-if="hide2">登陆</a-button>
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
        使用文档：<a href="https://hugofast-docs.netlify.app/" target="_blank">https://hugofast-docs.netlify.app/</a>
      </p>
      <p>
        1. 前往
        <a href="https://github.com/settings/tokens/" target="_blank">https://github.com/settings/tokens/</a>
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
      state1: "",
      loginErrorMessage: "",
      showLoginErrorMessage: false,
      hide1: false,
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
      // if (!this.HugoFastghpToken) {
      //   this.$message.error("未填写正确的GitHub Token！");
      //   return false;
      // }
      validateGitHubToken(this.HugoFastghpToken, "hugo-test")
        .then((result) => {
          const isValidToken = result.success;
          const tokenMessage = result.message;
          if (isValidToken) {
            localStorage.setItem("HugoFastRepoName", this.githubrepo);
            localStorage.setItem("HugoFastghpToken", this.HugoFastghpToken);
            this.showLoginErrorMessage = false;
            this.$router.push("/");
          } else {
            // this.$message.error(tokenMessage);
            this.loginErrorMessage = tokenMessage;
            this.showLoginErrorMessage = true;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    /** Log in to check */
    repoflie() {
      if (this.githubrepo == "") {
        this.loginErrorMessage = "请填写仓库名";
        this.showLoginErrorMessage = true;
        return false;
      }
      validateGitHubUrl(this.githubrepo).then((isValidUrl) => {
        if (isValidUrl) {
          this.restaurants = isValidUrl;
          this.hide1 = true;
          this.showLoginErrorMessage = false;
          console.log(this.restaurants);
        } else {
          this.loginErrorMessage = "仓库地址无效，请检查仓库地址";
          this.showLoginErrorMessage = true;
        }
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
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
  },
  mounted() {},
};

/** GitHub Token validation */
const validateGitHubToken = async (token, repositoryName) => {
  const headers = { Authorization: `token ${token}` };
  if (repositoryName === null) {
    return { success: false, message: "未填写仓库名" };
  }
  try {
    const userResponse = await axios.get("https://api.github.com/user", { headers });
    const user = userResponse.data;

    const repositoryResponse = await axios.get(`https://api.github.com/repos/${user.login}/${repositoryName}`, {
      headers,
    });

    if (repositoryResponse.status === 200) {
      // console.log(`Token has access to repository: ${repositoryName}`);
      return { success: true, message: `令牌访问存储库: ${repositoryName}` };
    } else {
      // console.log(`Token does not have access to repository: ${repositoryName}`);
      return { success: false, message: `令牌没有访问存储库: ${repositoryName}` };
    }
  } catch (error) {
    // console.log("Token validation error:", error.message);
    return { success: false, message: `令牌验证错误: ${error.message}` };
  }
};

/** Github Repository validation */
const validateGitHubUrl = async (githubrepo) => {
  try {
    const { data } = await axios.get(`https://api.github.com/repos/${githubrepo}/contents/content`);
    const originalArray = data.filter((item) => item.type === "dir");
    const newArray = originalArray.map((item) => ({
      value: item.name,
    }));
    return newArray;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false;
    } else {
      console.error(error);
    }
  }
  return axios;
};
</script>
