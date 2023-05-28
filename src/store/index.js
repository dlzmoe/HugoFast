// store.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    globalData: 'Global data' // 在state中定义全局数据
  },
  getters: {
    getGlobalData: state => state.globalData // 定义获取全局数据的getter
  },
  mutations: {
    setGlobalData: (state, payload) => {
      state.globalData = payload; // 定义修改全局数据的mutation
    }
  },
  actions: {
    updateGlobalData: ({ commit }, payload) => {
      commit('setGlobalData', payload); // 定义一个action用于触发mutation修改全局数据
    }
  }
});
