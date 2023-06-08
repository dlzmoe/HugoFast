import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import 'github-markdown-css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);


import '@/assets/style/index.css'

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
