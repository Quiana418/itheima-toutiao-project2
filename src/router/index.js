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
const Search = () => import('@/views/Search')
const Article = () => import('@/views/Article')
const User = () => import('@/views/User')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      { path: '/home', component: Home },
      { path: '/video', component: Video },
      { path: '/my', component: My, name: 'my' },
      { path: '/question', component: Question }
    ]
  },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/article/:article_id', component: Article, name: 'article', props: true },
  { path: '/user', component: User }

]
// props: true 路由解耦

const router = new VueRouter({
  routes
})

export default router
