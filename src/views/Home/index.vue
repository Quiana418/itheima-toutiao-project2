<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button icon="search" type="info" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 频道导航条 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab
        :title="channels.name"
        v-for="channels in myChannels"
        :key="channels.id"
      >
        <ArticleList :id="channels.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="popShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>

    <!-- 弹出层 -->
    <van-cell is-link @click="popShow = true">展示弹出层</van-cell>
    <van-popup
      v-model="popShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%', paddingTop: '1rem' }"
    >
      <!-- 父传子 把我的频道和高亮传过去 -->
      <ChannelPanel
        :myChannels="myChannels"
        :active="active"
        @change-active="
          active = $event;
          popShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'

export default {
  name: 'Home',
  created () {
    this.getMyChannel()
  },
  data () {
    return {
      active: 0,
      // 存储我的频道
      myChannels: [],
      // 控制弹出层是否显示
      popShow: false
    }
  },
  methods: {
    // 1.没有登录第一次安装好app,第一次打开的时候只能去ajax中拿
    // 2.没有登录，但是第二次打开，有可能频道被用编辑或删除过, 这样的话，本地
    // 存储就有值, 从本地存储拿
    // 3.登录过直接从ajax拿
    // 先判断 token 如果有token 去ajax中拿然后再判断本地存储有没有channels数据，如果没有就从ajax中拿否则从本地存拿
    async getMyChannel () {
      const channels = getItem(CHANNELS)
      // console.log(channels)
      // 匹配未登录  本地存储中没有数据的情况
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.myChannels = channels
      } else {
        try {
          const res = await getMyChannels()
          console.log(res)
          this.myChannels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {

  },
  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  // max-width: 100%;
  max-width: unset;
}
/deep/.van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
}
/deep/.van-tabs__line {
  width: 41px;
  height: 6px;

  background-color: #3296fa;
}
.menu {
  min-width: 100px;
  // width: 66px;
  height: 88px;
  line-height: 75px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
}
.menu1 {
  min-width: 100px;
  // width: 66px;
  height: 88px;
  background: rgba(255, 255, 255, 0.9);
}
/* 解决切换频道 每个频道会互相影响 因为公用了一个滚动条；解决方法：每个页面在main区域使用自己的滚动条 */
/deep/ .van-list {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
