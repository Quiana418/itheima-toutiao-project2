// 全局组件 统一在这里注册
import Vue from 'vue'
import FollowUser from '@/components/FollowUser.vue'
import CollectArticle from '@/components/CollectArticle.vue'
import GiveLike from '@/components/GiveLike.vue'

Vue.component(FollowUser.name, FollowUser)
Vue.component(CollectArticle.name, CollectArticle)
Vue.component(GiveLike.name, GiveLike)
