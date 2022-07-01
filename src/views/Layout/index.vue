<template>
  <div>
    <!-- 二级占位符 放在Layout/index.vue里 -->
    <!-- 用keep-alive做缓存 切换到其他页面 返回的时候还是显示之前的状态 只有Home才缓存 -->
    <keep-alive :include="['Home']">
      <router-view class="main" />
    </keep-alive>

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">
        首页
        <!-- 自定义插槽 放图标 写法1： -->
        <!-- <template #icon> <i class="toutiao toutiao-shouye"></i> </template> -->
        <!-- 写法2： -->
        <i class="toutiao toutiao-shouye" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="search">
        视频
        <i class="toutiao toutiao-shipin" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item replace to="/question" icon="search">
        问答
        <i class="toutiao toutiao-wenda" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="search">
        我的
        <i class="toutiao toutiao-wode" slot="icon"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},

  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
//设计稿是750的 所以模拟器里的数据*2 才能用，可以直接量设计稿的
.main {
  // padding-top: 180px;
  padding-bottom: 500px;
  background-color: #f5f7f9;
}
.toutiao {
  font-size: 40px;
}
/deep/.van-tabbar-item__text {
  font-size: 30px !important;
}
</style>
