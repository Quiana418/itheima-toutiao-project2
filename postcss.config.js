module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // 只有我们自己写的样式才除以75 因为设计稿是750 另外两个除以37.5
        return file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1 ? 37.5 : 75
      },
      // 不包括exclude
      propList: ['*']
    }
  }
}
