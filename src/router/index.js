import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ConcludeSignUp from '@/components/ConcludeSignUp'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'ConcludeSignUp',
    component: ConcludeSignUp
  }]
})
