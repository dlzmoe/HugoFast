<template>
  <div class="login">
    <div class="container">
      <p>未检测到您的登陆信息，请重新输入：</p>
      <el-input v-model="githubrepo" placeholder="请输入Github仓库名，如: lovezsh/hugo-blog"></el-input>
      <el-button type="primary" @click="setLogin">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      githubrepo: '',
    }
  },
  methods: {
    setLogin() {
      localStorage.setItem('githubRepoHugoToken', this.githubrepo);
      this.$router.push('/')
    }
  },
  mounted() {

  }
}
</script>
