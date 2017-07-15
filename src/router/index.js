import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FinishSignUp from '@/components/FinishSignUp'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'FinishSignUp',
    component: FinishSignUp
  }]
})
