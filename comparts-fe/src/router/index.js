import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/cpu',
      name: 'Cpu',
      component: Homepage
    },
    {
      path: '/mb',
      name: 'Mainboard',
      component: Homepage
    }
  ]
})
