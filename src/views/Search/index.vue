<template>
  <div>
    <!-- 顶部搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        background="#3296fa"
        @input="isEnter = false"
      />
    </form>
    <!-- 当搜索框为空 显示搜索历史 -->
    <!-- 当搜索框不为空 显示搜索建议 当回车是显示搜索结果 -->
    <!-- 子向父 -->
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <!-- 父传子 -->
      <SearchResult v-if="isEnter" :searchText="searchText"></SearchResult>
      <!-- 子传父 父绑定自定义事件 @search="onSearch" -->
      <SearchSuggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggest from './components/SearchSuggest.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  name: 'Search',
  created () { },
  data () {
    return {
      searchText: '',
      // 显示是否按下了回车键(显示结果) 默认没有按下回车键
      isEnter: false
    }
  },
  methods: {
    // 单击搜索建议 跳转到搜索结果 同时搜索框内容就是当前点击的搜索建议  子向父
    onSearch (keywords) {
      console.log(keywords)
      // 点击了搜索建议  搜索框内容就是当前点击的搜索建议
      this.searchText = keywords
      // 按下了回车 跳转显示搜索结果
      this.isEnter = true
      // 点击搜索关键词 存储到vuex里面
      this.$store.commit('setSearchHistoryList', keywords)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  }
}
</script>

<style scoped lang='less'>
</style>
