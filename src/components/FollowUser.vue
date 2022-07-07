<template>
  <div>
    <van-button
      :disabled="isAjax"
      :loading="isAjax"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      :plain="value"
      :icon="value ? '' : 'plus'"
      @click="onClick"
      >{{ value ? "已关注" : "关注" }}</van-button
    >
    <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
  </div>
</template>

<script>
import { addUser, delUser } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    // 控制点击关注按钮的状态  false为未关注
    value: {
      type: Boolean,
      required: true
    },
    // 用户id
    target: {
      type: [String, Number],
      required: true
    }
  },
  created () { },
  data () {
    return {
      // 防止用户频繁点击 控制是否发送ajax请求
      isAjax: false
    }
  },
  methods: {
    async onClick () {
      // 防止用户频繁点击
      this.isAjax = true
      // 发起请求 实现点击关注 或者取消关注
      if (this.value) {
        // 如果点击了关注 说明当前已关注 调用取消关注的请求
        try {
          await delUser(this.target)
          // 点击按钮 改变按钮状态
          this.$emit('input', !this.value)
          this.$toast.success('操作成功')
        } catch (err) {
          console.log('followUser', err)
        }
      } else {
        // 否则就是未关注 点击调用关注用户的请求
        try {
          await addUser(this.target)
          // 点击按钮 改变按钮状态
          this.$emit('input', !this.value)
          this.$toast.success('操作成功')
        } catch (err) {
          console.log('followUser', err)
        }
      }
      this.isAjax = false
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
