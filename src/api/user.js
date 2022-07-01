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
