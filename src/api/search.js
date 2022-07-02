import request from '@/utils/request'

// 请求搜索联想建议
export const getSuggestList = q => {
  return request({
    url: '/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索结果列表

// { page = 1, per_page, q }对象解构 可以直接拿到属性值
// eslint-disable-next-line camelcase
export const getSearchResultList = ({ page = 1, per_page, q }) => {
  return request({
    url: '/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
