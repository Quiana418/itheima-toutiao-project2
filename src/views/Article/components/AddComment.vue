<template>
  <!-- 在组件内加autofocus没用 因为还没有挂载到dom树上 可以在mounted -->
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    center
    ref="filed"
  >
    <template #extra>
      <!-- 输入框内容为空时 按钮禁用 -->
      <van-button
        @click="onClick"
        type="default"
        :disabled="message === ''"
        class="btn"
        >发布</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    // 文章或者id
    target: {
      type: [String, Number],
      required: true
    },
    // 不是必填项 对文章评论不用传
    art_id: {
      type: [String, Number]
    }
  },
  name: 'AddComment',
  created () {
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    // 文章评论
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        // console.log(res)
        // 子向父 把评论文章的内容传过去
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    // console.log(this.$refs.filed.$el)
    this.$refs.filed.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.van-button {
  border: none;
}
</style>
