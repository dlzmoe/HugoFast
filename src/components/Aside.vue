<template>
  <div class="aside">
    <nav>
      <router-link to="/"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home"
          width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
          stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
        </svg><span>首页</span></router-link>
      <router-link to="/list"><svg xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-align-box-left-top" width="24" height="24" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
          <path d="M9 13h-2"></path>
          <path d="M13 10h-6"></path>
          <path d="M11 7h-4"></path>
        </svg><span>列表</span></router-link>
      <router-link to="/publish"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-vercel"
          width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
          stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 19h18l-9 -15z"></path>
        </svg><span>发布</span></router-link>
      <router-link to="/setting"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings"
          width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
          stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z">
          </path>
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
        </svg><span>设置</span></router-link>
      <router-link to="/about"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clipboard-text"
          width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
          stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
          <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
          <path d="M9 12h6"></path>
          <path d="M9 16h6"></path>
        </svg><span>关于</span></router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Aside",
};
</script>
