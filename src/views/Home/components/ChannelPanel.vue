<template>
  <div>
    <div class="channel-container">
      <!-- 我的频道 -->
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          size="mini"
          round
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>

      <van-row>
        <van-col span="6" v-for="(item, index) in myChannels" :key="item.id">
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="onClick(index)"
          >
            {{ item.name }}

            <!-- 叉号 -->
            <!-- <van-badge>
              <div class="child" />
              <template #content>
                <van-icon name="cross" class="badge-icon" />
              </template>
            </van-badge> -->

            <!-- 叉号 -->
            <van-icon
              :style="{ color: active === index ? 'red' : '' }"
              name="close"
              v-show="isCloseShow"
              v-if="index !== 0"
            />
          </div>
        </van-col>
      </van-row>

      <!-- 推荐频道 -->
      <div class="title">
        <h3>推荐频道</h3>
      </div>

      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            <van-icon name="plus" size="small" />
            {{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
import { saveChannels, getAllChannelsList } from '@/api/home'
const CHANNELS = 'CHANNELS'

export default {
  name: 'ChannelPanel',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllChannelsList()
      // console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => {
        return this.myChannels.every(item1 => item1.id !== item.id)
      })
    } catch (err) {
      console.log('ChannelPanel', err)
    }
  },
  data () {
    return {
      // 推荐频道
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    // 点击添加我的频道
    add (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.myChannels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    // 点击我的频道 判断是删除 还是切换频道
    onClick (index) {
      if (this.isCloseShow) {
        // 如果点击推荐（索引为0）则不能删除
        if (index === 0) return
        // 删除
        const obj = this.myChannels[index]
        this.myChannels.splice(index, 1)
        this.recommendChannels.push(obj)
        // 如果删除的是当前选中的前面频道 则让index-1
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 子向父
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  // 做切换频道时的 数据持久化  如果登录了就用vuex+本地存储 把数据放在后台服务器中（发请求）  如果没登录就只需要本地存储
  // watch: {
  //   deep: true,
  //   channels: {
  //     async handler (newVal) {
  //       // console.log(newVal)
  //       if (this.$store.state.user && this.$store.state.user.token) {
  //         // 处理数据  需要传一个数组[{}]进去
  //         console.log(123)
  //         const arr = []
  //         newVal.forEach((item, index) => {
  //           arr.push({
  //             id: item.id, seq: index
  //           })
  //         })
  //         console.log('arr', arr)

  //         // 登陆过
  //         try {
  //           const res = await saveChannels(arr)
  //           console.log(res)
  //         } catch (err) {
  //           console.log(err)
  //         }
  //       } else {
  //         // 未登录
  //         setItem(CHANNELS, newVal)
  //       }
  //     }
  //   }
  // },

  watch: {
    myChannels: {
      async handler (newVal) {
        console.log(newVal)
        // console.log(newVal)
        if (this.$store.state.user && this.$store.state.user.token) {
          // 登录过
          // console.log(123)
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log('我是arr', arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          // 没有登录
          setItem(CHANNELS, newVal)
        }
      },
      deep: true // 深度监听
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  padding: 0px 25px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h3 {
    font-size: 32px;
    font-weight: normal;
    color: #333;
  }
  .van-button {
    width: 104px;
    height: 48px;
    border-radius: 20px;
  }
  .inner {
    width: 160px;
    height: 86px;
    background: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: normal;
    color: #222;
    text-align: center;
    line-height: 86px;
    margin-bottom: 20px;
    position: relative;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    .van-icon-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
    }
  }
  .van-row {
    margin-top: 20px;
  }
}
</style>
