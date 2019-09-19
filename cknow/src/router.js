import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Recommend from './views/Recommend.vue'
import Follow from './views/Follow.vue'
import Hot from './views/Hot.vue'
import Admin from './views/Admin.vue'
import Reg from './views/Reg.vue'
import Login from './views/Login.vue'
import Write from './views/Write.vue'
import Backstage from './views/Backstage.vue'



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
      path: '/admin',
      name:"admin",
      component: Admin
    },
    {
      path: '/backstage',
      name:"backstage",
      component: Backstage
    },
    {
      path: '/reg',
      name:"reg",
      component: Reg
    },
    {
      path: '/login',
      name:"login",
      component: Login
    },
    {
      path: '/write',
      name:"write",
      component: Write
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
