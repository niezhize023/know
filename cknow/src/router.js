import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Recommend from './views/Recommend.vue'
import Follow from './views/Follow.vue'
import Hot from './views/Hot.vue'
import Topicinfo from './views/Topicinfo.vue'
import Avatar from './views/Avatar.vue'
import Admin from './views/Admin.vue'
import Reg from './views/Reg.vue'
import Login from './views/Login.vue'
import Write from './views/Write.vue'
import Backstage from './views/Backstage.vue'
import Personal from './views/Personal.vue'
import Edit from './views/Editinfo.vue'
import Backstageseach from './views/Backstageseach.vue'
import Newsearsh from './views/Newsearsh.vue'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: "admin",
      component: Admin
    },
    {
      path: '/editinfo',
      name: "editinfo",
      component: Edit
    },
    {
      path: '/avatar',
      name: "avatar",
      component: Avatar
    },
    {
      path: '/backstage',
      name: "backstage",
      component: Backstage
    },
    {
      path: '/reg',
      name: "reg",
      component: Reg
    },
    {
      path: '/personal',
      name: "personal",
      component: Personal
    },
    {
      path: '/login',
      name: "login",
      component: Login
    },
    {
      path: '/write',
      name: "write",
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
      path: '/topicinfo',
      component: Topicinfo
    },
    {
      path: '/hot',
      component: Hot
    },
    {
      path: '/backstageseach',
      name: "backstageseach",
      component: Backstageseach
    },
    
    {
      path: '/newsearsh',
      name: "newsearsh",
      component: Newsearsh
    },
    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" '.iews/About.vue')
    } */
  ]
})