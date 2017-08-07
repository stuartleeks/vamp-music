import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import AppContainer from '@/components/AppContainer'
import Dashboard from '@/components/Dashboard'
import Browse from '@/components/Browse'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/app',
      component: AppContainer,
      props: true,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'browse',
          name: 'browse',
          component: Browse
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
