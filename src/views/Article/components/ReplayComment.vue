<template>
  <div>
    <!-- "
        comment.reply_count === 0 ? '暂无回复' : `${comment.reply_count}条回复`
      " -->
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$emit('close', false)"
      fixed
    >
      <template #left>
        <van-icon name="cross"></van-icon>
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复"></van-cell>
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="addCommentShow = true"
      >
        评论</van-button
      >
    </div>

    <!-- 底部弹出层 -->
    <van-popup v-model="addCommentShow" position="bottom">
      <!-- v-if="addCommentShow"保证每次关闭组件销毁 打开 组件重新生成 执行mounted 数据和光标都会重新生成 -->
      <AddComment
        v-if="addCommentShow"
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        @add-comment="
          list.unshift($event);
          addCommentShow = false;
          comment.reply_count++;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import { GetCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  name: 'ReplayComment',
  created () {
    // 请求回复评论的评论
    this.getCommentList()
  },
  data () {
    return {
      limit: 999999,
      offset: null,
      // 回复评论数据
      list: [],
      // 控制弹出层显示隐藏
      addCommentShow: false
    }
  },
  methods: {
    // 请求回复评论的评论
    async getCommentList () {
      try {
        const res = await GetCommentList({ type: 'c', source: this.comment.com_id, limit: this.limit, offset: this.offset })
        console.log(res)
        this.list = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 110px;
}
.bottom {
  position: fixed;

  width: 100%;
  bottom: 0;
  left: 0;
  padding: 10px 50px;
  box-sizing: border-box;
  background-color: rgb(251, 91, 179);
  .van-button {
    border: unset;
    color: #333;
  }
}
</style>
