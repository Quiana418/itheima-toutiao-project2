import Vue from 'vue'
import VueRouter from 'vue-router'
// 父路由不用懒加载
import Layout from '@/views/Layout'

// 路由懒加载
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const My = () => import('@/views/My')
const Question = () => import('@/views/Question')
const Login = () => import('@/views/Login')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      { path: '/home', component: Home },
      { path: '/video', component: Video },
      { path: '/my', component: My },
      { path: '/question', component: Question }
    ]
  },
  { path: '/login', component: Login }

]

const router = new VueRouter({
  routes
})

export default router
