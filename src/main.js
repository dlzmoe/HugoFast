import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'; // 导入Vuex的存储配置

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '@/assets/style/index.css'

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
