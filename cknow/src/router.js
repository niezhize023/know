import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Recommend from './views/Recommend.vue'
import Follow from './views/Follow.vue'
import Hot from './views/Hot.vue'
import Topicinfo from './views/Topicinfo.vue'
import Avatar from './views/Avatar.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: Avatar
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/follow',
      component: Follow
    },
    {
      path: '/topicinfo',
      component: Topicinfo
    },
    {
      path: '/hot',
      component: Hot
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
