<template>
  <!-- 收藏 -->
  <van-loading v-if="isLoading" size=".53333rem" />
  <van-icon
    v-else
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  props: {
    // 控制是否点击了收藏
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  name: 'CollectArticle',
  created () { },
  data () {
    return {
      // 防止用户频繁点击 控制是否发送ajax请求
      // 控制加载时转圈
      isLoading: false
    }
  },
  methods: {

    // 组件传值 sync 实现点击收藏
    async onClick () {
      // Ajax请求之前
      this.isLoading = true
      // 点击收藏 发起请求 收藏或者取消收藏
      if (this.is_collected) {
        // 当前为已收藏 请求取消收藏
        try {
          // ?query   /: params
          // this.$route.params.article_id 获取路径参数
          await delCollect(this.$route.params.article_id)
          this.$emit('update:is_collected', !this.is_collected)
          this.$toast.success('操作成功')
        } catch (err) {
          console.log('CollectArticle', err)
        }
      } else {
        // 未收藏 请求添加收藏
        try {
          // this.$route.params.article_id 获取路径参数
          await addCollect(this.$route.params.article_id)
          this.$emit('update:is_collected', !this.is_collected)
          this.$toast.success('操作成功')
        } catch (err) {
          console.log('CollectArticle', err)
        }
      }
      // ajax结束
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
