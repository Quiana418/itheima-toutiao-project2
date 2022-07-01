import request from '@/utils/request'

// 我的频道数据的请求
export const getMyChannels = () => {
  return request({
    url: '/user/channels'
  })
}

// 请求文章列表数据
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    method: 'GET',
    url: '/articles',
    params: { channel_id, timestamp }
  })
}

// 获取所有频道的数据
export const getAllChannelsList = () => {
  return request({
    method: 'GET',
    url: '/channels'
  })
}

// 频道数据持久化的请求
export const saveChannels = (channels) => {
  return request({
    method: 'PUT',
    url: 'user/channels',
    data: {
      channels
    }
  })
}
