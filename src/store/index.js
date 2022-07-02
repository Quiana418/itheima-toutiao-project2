import Vue from 'vue'
import Vuex from 'vuex'

// Vuex + 本地存储（用插件做yarn add vuex-persist ） 做数据持久化
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    // 存储搜索关键词
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setSearchHistoryList (state, payload) {
      console.log(payload)
      console.log(state.searchHistoryList)
      // 存储搜索历史 每次新的搜索关键词 存储到最开始的位置
      // 同时还要去重 历史记录不能重复
      // let arr = state.searchHistoryList.unshift(payload)
      let arr = state.searchHistoryList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
    },
    // 根据索引删除历史记录数组里的 某项
    delHistory (state, index) {
      state.searchHistoryList.splice(index, 1)
    },
    // 点击删除全部 清空历史记录数组
    delAll (state) {
      state.searchHistoryList = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
