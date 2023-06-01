<template>
  <div class="header">
    <div class="logo">Hugo 文章后台管理</div>
    <div class="menu">
  

      <template>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <div class="settingAuthor">
              <el-avatar :size="50" :src="this.setting.authorimg"></el-avatar>
            </div>
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <span>{{ this.setting.name }}</span>
            </a-menu-item>
            <a-menu-item key="1">
              <span @click="refreshCache">刷新缓存</span>
            </a-menu-item>
            <a-menu-item key="2">
              <span @click="goSetting">个人设置</span>
            </a-menu-item>
            <a-menu-item key="3">
              <span @click="loginOut">退出登陆</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>


    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <span>Github API 使用繁忙，请稍后再试。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="loginOut">回到首页</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      dialogVisible: false,
      setting: {
        domain: "",
        name: "",
        authorimg: "",
      },
    };
  },
  methods: {
    refreshCache() {
      localStorage.removeItem("HugoFastBasicData");
      localStorage.removeItem("HugoFastallData");
      window.location.href = "/#/list";
    },
    goSetting(){
      window.location.href = "/#/setting";
    },
    loginOut() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  mounted() {
    const setting = JSON.parse(localStorage.getItem("HugoFast_Setting"));
    if (setting != "") {
      this.setting = JSON.parse(localStorage.getItem("HugoFast_Setting"));
    }
  },
};
</script>
