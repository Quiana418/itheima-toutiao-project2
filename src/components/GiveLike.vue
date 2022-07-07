<template>
  <div>
    <van-loading v-if="isLoading" size=".53333rem" />
    <van-icon
      :color="attitude === 1 ? 'red' : '#777'"
      :name="attitude === 1 ? 'good-job' : 'good-job-o'"
      v-else
      @click="onClick"
    />
  </div>
</template>

<script>
import { addLike, delLike } from '@/api/article'
export default {
  model: {
    prop: 'attitude'
  },
  props: {
    attitude: {
      type: Number,
      required: true
    }
  },
  name: 'GiveLike',
  created () { },
  data () {
    return {
      // 控制加载时转圈
      isLoading: false
    }
  },
  methods: {
    // 组件传值 sync 实现点击点赞
    async onClick () {
      // Ajax请求之前
      this.isLoading = true
      // 如果已经点赞，则取消点赞
      const target = this.$route.params.articleId
      try {
        if (this.attitude === 1) {
          await delLike(target)
          this.$emit('input', 1)
          this.$toast.success('取消点赞')
        } else {
          await addLike(target)
          this.$emit('input', -1)
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        console.log(err)
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
