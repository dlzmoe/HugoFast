<template>
  <div class="header">
    <div class="logo">Hugo 后台管理</div>
    <div class="menu">
      <el-dropdown trigger="click">
        <div class="settingAuthor">
          <el-avatar :size="50" :src="this.setting.authorimg"></el-avatar>
        </div>
        <!-- <el-button type="primary">
          设置<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button> -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            ><span>{{ this.setting.name }}</span></el-dropdown-item
          >
          <el-dropdown-item><span @click="refreshCache">刷新缓存</span></el-dropdown-item>
          <el-dropdown-item><span @click="loginOut">退出登陆</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
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
      window.location.href = "/";
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
