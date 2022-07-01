// 处理时间
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 处理时间的过滤器
export const dateFormate = (time) => {
  return dayjs(time).fromNow()
}
