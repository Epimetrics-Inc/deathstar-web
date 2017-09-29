import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Visualization from '@/pages/visualization'
import About from '@/pages/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/visualization',
      name: 'visualization',
      component: Visualization
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
