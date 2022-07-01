<template>
  <!-- 封装一个组件 简写icon样式  注册成全局组件-->
  <i class="toutiao" :class='"toutiao-" + name'></i>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
