<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="showInput">
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="profile.photo"
        width="0.9rem"
        height="0.9rem"
      />
    </van-cell>
    <van-cell
      :value="profile.name"
      title="昵称"
      is-link
      @click="isNameShow = true"
    />
    <van-cell
      title="性别"
      :value="profile.gender === 1 ? '女' : '男'"
      is-link
    />
    <!-- 这里需要字符串 -->
    <van-cell
      :value="profile.birthday"
      title="生日"
      is-link
      @click="isBirthdayShow = true"
    />
    <van-popup position="bottom" v-model="isBirthdayShow"
      ><van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
    /></van-popup>

    <van-popup position="bottom" style="height: 100%" v-model="isNameShow">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onNameCancel"
        @click-right="onNameSave"
      ></van-nav-bar>
      <van-field
        @input="name = $event"
        :value="profile.name"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <input
      type="file"
      accept="image/jpg, image/png,image/jpeg,image/gif"
      style="display: none"
      ref="file"
      @change="onChange"
    />
    <van-popup v-model="isAvatarShow" position="bottom" style="height: 100%">
      <UpdateAvatar
        :img-src.sync="imgSrc"
        @close="isAvatarShow = false"
      ></UpdateAvatar>
    </van-popup>
  </div>
</template>

<script>
import UpdateAvatar from './components/UpdateAvatar.vue'
import { getUserProfile, updateUserProfile } from '@/api/user'
export default {
  name: 'User',
  async created () {
    try {
      const res = await getUserProfile()
      console.log(res)
      this.profile = res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  data () {
    return {
      // 存放用户简介数据
      profile: {},
      // 控制点击 昵称 弹出层是否出现
      isNameShow: false,
      // 用户修改的新名称
      name: '',
      // 控制是否弹出生日弹窗
      isBirthdayShow: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2025, 10, 1),
      // 用户修改选择后的生日 点击保存在赋值给profile对象里的birthday
      birthday1: '',
      // 控制是否弹出 修改头像弹窗
      isAvatarShow: false,
      imgSrc: ''
    }
  },
  methods: {
    onNameCancel () {
      this.isNameShow = false
    },
    // 点击确定 同步修改后的名称
    async onNameSave () {
      await this.save()
      this.isNameShow = false
      this.profile.name = this.name
    },
    async save () {
      try {
        await updateUserProfile(this.profile)
      } catch (err) {
        console.log(err)
      }
    },
    // 点击确定 同步修改后的生日日期
    onConfirm () {
      this.profile.birthday = this.birthday1
      this.save()
      this.isBirthdayShow = false
    },
    // 点击显示文件上传框
    showInput () {
      this.$refs.file.click()
    },
    onChange () {
      // console.log(this.$refs.file.files[0])
      const url = window.URL.createObjectURL(this.$refs.file.files[0])
      // console.log(url)
      this.imgSrc = url
      this.isAvatarShow = true
    }
  },
  computed: {
    currentDate: {
      get () {
        return new Date(this.profile.birthday)
      },
      set (newVal) {
        this.birthday1 = newVal.getFullYear() + '-' + (newVal.getMonth() + 1) + '-' + newVal.getDate()
      }
    }
  },
  watch: {},
  filters: {},
  components: { UpdateAvatar }
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__text {
  color: #fff !important;
}
</style>
