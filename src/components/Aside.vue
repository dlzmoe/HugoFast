<template>
  <div class="aside">
    <nav>
      <router-link to="/">列表</router-link>
      <router-link to="/publish">发布</router-link>
      <router-link to="/setting">设置 (beta)</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Aside",
};
</script>
