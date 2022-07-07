import request from '@/utils/request'

// 获取短信验证码的请求
// 返回一个promise
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

// 请求登录
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile, code
    }
  })
}

// 获取用户个人资料err
// 只有在vue文件中才能用this 在js中没有this 所以要用$store只能先导入store
// 这里放到请求拦截器里面
// headers: {
//   Authorization: 'Bearer ' + store.state.user.token
// }
export const getUserInfo = () => {
  return request({
    url: '/user'
  })
}

// 获取用户个人信息 简介
export const getUserProfile = () => {
  return request({
    url: '/user/profile'
  })
}

// 更新用户个人资料
// profile是用户个人资料---对象
export const updateUserProfile = profile => {
  return request({
    method: 'PATCH',
    url: 'user/profile',
    data: profile
  })
}

/**
 * @param {裁剪之后的头像数据对象} data
 * 更新头像的接口
 */

export const UpdateAvatar = (data) => {
  return request({
    method: 'PATCH',
    url: 'user/photo',
    data
  })
}
