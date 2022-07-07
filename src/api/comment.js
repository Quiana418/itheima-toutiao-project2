import request from '@/utils/request'

/**
 *
 * @param 获取评论列表
 * @returns
 */
export const GetCommentList = ({ type, source, offset, limit }) => {
    return request({
        url: 'comments',
        params: {
            type,
            source,
            offset,
            limit
        }
    })
}

/**
 * 点赞
 */
export const addLike = (target) => {
    return request({
        method: 'POST',
        url: 'comment/likings',
        data: {
            target
        }
    })
}

/**
 * 点赞
 */
export const delLike = (target) => {
    return request({
        method: 'DELETE',
        url: `comment/likings/${target}`
    })
}

/**
 * target 文章或评论的id
 * content 内容
 * art_id 文章id  文章评论时 不需要
 * 文章评论
 */
/* export const addComment = ({ target, content,art_id }) => {
    return request({
        method: 'POST',
        url: 'comments',
        data: {
            target,
            content,
            art_id
        }
    })
} */

export const addComment = (data) => {
    return request({
        method: 'POST',
        url: 'comments',
        data
    })
}
