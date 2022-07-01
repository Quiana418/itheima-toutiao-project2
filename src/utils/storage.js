// 对数据进行 本地存储中的 获取 存储 删除 清空
// 获取数据
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    // 不能解析 就原样返回
    return res
  }
}

// 存储数据
export function setItem (key, value) {
  if (typeof value === 'object') {
    // 复合数据类型
    window.localStorage.setItem(key, JSON.stringify(value)
    )
  } else {
    window.localStorage.setItem(key, value)
  }
}

// 删除数据
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

// 清除所有数据
export function clearItem () {
  window.localStorage.removeItem()
}
