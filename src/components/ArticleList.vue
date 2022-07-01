<template>
  <van-cell-group>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        @refresh="onRefresh"
        ref="pullRefresh"
      >
        <!-- <van-cell
          :title="item.title"
          value="内容"
          label="描述信息"
          v-for="(item, index) in articleLists"
          :key="index"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleLists"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
let ele = null
let scrollTop = 0
// 把文章列表封装成公共的组件 多次使用
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    // 调用文章列表方法
    this.getArticleLists()
  },
  // 记住滚动条的位置 点击切换 滚动的位置不变
  mounted () {
    // console.log(this.$refs.pullRefresh)
    ele = this.$refs.pullRefresh.$el
    // console.log(ele)
    ele.addEventListener('scroll', function () {
      // console.log(1111111)
      scrollTop = this.scrollTop
    })
  },
  activated () {
    // 每次进入页面时  把滚动条滚动到上一次的位置
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      // 文章列表
      articleLists: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    // 请求获取文章列表
    async getArticleLists () {
      // 下拉刷新
      if (this.refreshing) {
        this.articleLists = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({
          channel_id: this.id, timestamp: this.timestamp
        })
        // console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        // 上滑加载
        // 如果数据全部加载完 将finish改为true
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleLists.push(...res.data.data.results)
        // 数据更新加载状态完毕
        this.loading = false
      } catch (err) {
        console.log('ArticleList' + err)
      }
    },
    // 上滑加载
    onLoad () {
      this.getArticleLists()
    },
    // 下拉刷新
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.timestamp = Date.now()
      this.onLoad()
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
body {
  overflow: hidden;
}
.van-cell-group {
  margin-top: 182px;
}
.van-pull-refresh {
  overflow: auto;
}
</style>
