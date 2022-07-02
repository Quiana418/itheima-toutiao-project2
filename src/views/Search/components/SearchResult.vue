<template>
  <div class="container">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 加载下一页 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in searchResult"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 复用之前articleItem组件
import ArticleItem from '@/components/ArticleItem.vue'
import { getSearchResultList } from '@/api/search'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  name: 'searchResult',
  created () {
    // 调用请求搜搜结果的方法
    this.getSearchResultList()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      // 搜索结果
      searchResult: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    // 获取搜索结果请求的方法
    async getSearchResultList () {
      try {
        const res = await getSearchResultList({ page: this.page, per_page: this.per_page, q: this.searchText })
        // 如果数据加载完毕 将finished改为true
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // 追加数据合并 而不是覆盖
        // this.searchResult = res.data.data.results
        this.searchResult.push(...res.data.data.results)
        // 这个是数据更新之后 将loading改为false
        this.loading = false
        // 更新完毕之后 下拉加载改为false
        this.isLoading = false
      } catch (err) {
        console.log('searchResult', err)
      }
    },
    // 加载下一页
    onLoad () {
      // 异步更新数据 页数递增
      this.page++
      // 请求下一页数据
      this.getSearchResultList()
    },
    // 下拉刷新
    onRefresh () {
      this.searchResult = []
      this.page = 1
      this.getSearchResultList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
.container {
  //视口高度的100%
  height: calc(100vh - 108px);
  overflow: auto !important;
}
</style>
