<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!--   <van-cell v-for="(item, index) in commentList" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | dateFormate
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->
      <!-- 把每条评论列表封装成组件 -->
      <!-- @reply-show="$emit('replay-show', $event)" 子向父传给 INDEX.VUE -->
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { GetCommentList } from '@/api/comment'
export default {
  props: {
    // 评论类型 a评论文章 c评论回复
    type: {
      type: String,
      required: true,
      validator (value) {
        // 只能是a或者c
        return ['a', 'c'].includes(value)
      }
    },
    // 文章id
    source: {
      type: [String, Number],
      required: true
    },
    // 文章列表
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    // 调用 请求评论数据
    this.getCommentList()
  },
  data () {
    return {
      // 请求评论数据 需要传的参数
      paramsObj: {
        type: this.type,
        source: this.source,
        limit: 5,
        offset: null
      },

      loading: false,
      finished: false

    }
  },
  methods: {
    // 请求评论数据
    async getCommentList () {
      try {
        const res = await GetCommentList(this.paramsObj)
        // console.log(res)
        // 如果数据全部加载完毕 把finished改为true
        // 如果不结束 数据会一直重复加载
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        // 子传父 把评论数量传过去
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)
        // 把当前数据的最后一条评论的id值 作为请求下一页的offset的参数 若无该数据 则为null
        this.paramsObj.offset = res.data.data.last_id
        // 数据更新完毕后，将 loading 设置成 false 即可
        this.loading = false
      } catch (err) {
        console.log('comment', err)
      }
    },
    // 分页效果
    onLoad () {
      this.getCommentList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
