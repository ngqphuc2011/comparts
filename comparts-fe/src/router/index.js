import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Homepage
    },
    {
      path: '/cpu',
      component: Homepage
    },
    {
      path: '/mobo',
      component: Homepage
    },
    {
      path: '/ram',
      component: Homepage
    },
    {
      path: '/hdd',
      component: Homepage
    },
    {
      path: '/ssd',
      component: Homepage
    },
    {
      path: '/gpu',
      component: Homepage
    },
    {
      path: '/psu',
      component: Homepage
    },
    {
      path: '/case',
      component: Homepage
    },
    {
      path: '/pc-builder',
      component: Homepage
    }
  ]
})
