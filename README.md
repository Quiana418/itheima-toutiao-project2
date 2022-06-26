# vue-demo1-toutiao-project

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目操作步骤

1.项目初始化
1.1 在 vue.config.js 里配置浏览器标题---找到 vue-cli 网站配置教程
1.2 yarn add vant@latest-v2
1.3 在 main.js 里面 导入所有 vant 组件
1.4 移动适配 vant
+postcss-pxtorem 是一款 PostCSS 插件，用于将 px 单位转化为 rem 单位----yarn add postcss-pxtorem -D
+lib-flexible 用于设置 rem 基准值-----yarn add amfe-flexible

2.发请求 获取短信验证码
