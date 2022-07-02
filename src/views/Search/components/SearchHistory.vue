<template>
  <div class="search-history">
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistoryList"
      :key="index"
      @click="$emit('search', item)"
    >
      <!-- 点击删除按钮 显示全部删除 完成和× -->
      <!-- 点击完成 显示删除按钮 -->
      <template v-if="isDelete">
        <span @click="$store.commit('delAll')">全部删除</span> &nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </template>

      <van-icon name="delete" @click="isDelete = true" v-else />
      <van-icon
        name="close"
        v-if="isDelete"
        @click.stop="$store.commit('delHistory', index)"
      />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDelete: false
    }
  },
  computed: {
    ...mapState(['searchHistoryList'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
