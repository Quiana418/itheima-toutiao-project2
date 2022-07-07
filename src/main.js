import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/styles/icon.less'
// import '@/styles/reset.less'
import '@/styles/index.less'

// 注册全局组件
import MyIcon from '@/components/MyIcon.vue'
// 引入外部的存放全局组件的文件
import '@/components/index'

// 定义全局的过滤器
import * as obj from '@/filter'
// Object.keys 是获取对象里的所有属性名，返回为一个数组
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

// 使用全局组件
Vue.component('MyIcon', MyIcon)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
