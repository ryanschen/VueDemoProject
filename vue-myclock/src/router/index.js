import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Clocklist from '@/components/Clocklist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/clocklist',
      component: Clocklist
    },
  ]
})
