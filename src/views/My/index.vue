<template>
  <div>
    <!-- 登录状态 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            round
            cover
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>

      <ul class="list">
        <li>
          <p>{{userInfo.art_count}}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userInfo.fans_count}}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{userInfo.follow_count}}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{userInfo.like_count}}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>

    <!-- 未登录状态 判断是否有token 决定是否显示-->
    <div class="header header-notLogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>

    <!-- 宫格 -->
    <van-grid class="nav-grid" :column-num="2" clickable>
      <van-grid-item text="收藏">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item text="文字">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 消息通知 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>

    <!-- 退出登录 -->
    <van-button
      class="logout"
      type="default"
      block
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log('res', res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        // 确认退出之后 清清除token
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background: rgba(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 20px;
  }
  p {
    font-size: 28px;
    font-weight: normal;
    color: #fff;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 35px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 32px;
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        width: 155px;
        height: 29px;
        font-size: 30px;
        font-weight: normal;
        letter-spacing: 1px;
        color: #ffffff;
      }
    }
    .button {
      font-size: 20px;
      color: #666;
      width: 116px;
      height: 33px;
      line-height: 32px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 16px;
    }
  }
  /deep/.list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        font-weight: normal;
        color: #ffffff;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.nav-grid {
  background: #fff;
  .toutiao {
    font-size: 45px;
  }
  .toutiao-shoucang {
    color: #eb5253;
  }
  .toutiao-lishi {
    color: #ff9d1d;
  }
  .text {
    color: #000;
    margin-top: 8px;
    font-size: 28px;
  }
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
}
</style>
