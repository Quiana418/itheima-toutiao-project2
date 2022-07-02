<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in suggestList"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highLight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  name: 'searchSuggest',
  created () { },
  data () {
    return {
      // 搜索联想词
      suggestList: []
    }
  },
  methods: {
    // 处理搜索词高亮的方法 正则全局匹配
    highLight (str) {
      // const reg = // 正则字面量方式 里面不能放表达式
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  // 监听输入框内容的变化 不能用created 这个只能执行一次 切换（第二次输入就会被销毁）
  watch: {
    searchText: {
      immediate: true,
      handler (newVal) {
        // 防抖:减少请求的次数 下一次执行前先清空上一次的定时器
        clearTimeout(timer)
        timer = setTimeout(async () => {
          // console.log(newVal)
          try {
            const res = await getSuggestList(newVal)
            // console.log(res)
            this.suggestList = res.data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 600)
      }
    }
  },
  filters: {},
  components: {},
  beforeDestroy () {
    // 销毁定时器 避免内存泄漏
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
</style>
