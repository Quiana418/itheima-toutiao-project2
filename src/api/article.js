import request from '@/utils/request'

// 请求文章数据 根据id查询文章
export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}

/**
 * 请求关注用户
 * @param {用户id} target
 * @returns
 */
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}

/**
 * 请求 取消关注 路径参数
 * @param {用户id}target
 */
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}

/**
 * 收藏文章
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`,
    data: {
      target
    }
  })
}

/**
 * 点赞文章
 */
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'article/likings',
    data: {
      target
    }
  })
}

/**
 * 取消点赞文章
 */
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `article/likings/${target}`
  })
}
