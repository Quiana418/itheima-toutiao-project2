<template>
  <div>
    <van-nav-bar title="登录">
      <!-- <van-icon name="cross" slot='left'/> -->
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机号不符合格式',
          },
        ]"
      >
        <!-- 图标插槽 -->
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          {
            pattern: /^\d{6}$/,
            message: '验证码长度必须为6位',
          },
        ]"
      >
        <!-- 图标插槽 -->
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <!-- 按钮插槽 -->
        <template #button>
          <!-- 验证码倒计时 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <!--  @finish="isCountDownShow = false"倒计时到点 隐藏起来 -->
          <van-button
            v-else
            class="yanzhengma"
            native-type="button"
            size="small"
            type="primary"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          class="login-btn"
          round
          block
          type="info"
          native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () {
  },
  data () {
    return {
      mobile: '13911111111',
      code: '246810',
      // 验证码倒计时时间
      time: 5 * 1000,
      // 控制是否显示倒计时
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      // 发送登录请求
      try {
        const res = await login(values)
        console.log(res)
        // 登录成功后 把用户登录信息通过vuex存储
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        console.log(err)
      }
    },
    // 获取短信验证码
    async onSendSms () {
      try {
        // 验证表单
        await this.$refs.form.validate('mobile')
        // console.log('校验通过')
        // 校验通过 显示倒计时效果
        this.isCountDownShow = true
        try {
          // 发请求拿验证码数据
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          this.$toast.fail('发送失败，请重试')
        }
      } catch (err) {
        this.$toast.fail('手机号格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
  margin-right: 20px;
}
.yanzhengma {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  border: none;
  .van-button__text {
    font-size: 22px;
    letter-spacing: 1px;
    color: #666666;
    zoom: 0.96;
  }
}
.van-field__control {
  margin-left: 40px;
  font-size: 26px;
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
.yanzhengma {
  position: fixed;
  right: 10px;
}
</style>
