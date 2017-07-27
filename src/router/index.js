import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FinishSignUp from '@/components/FinishSignUp'
import Main from '@/components/Main'
import CreateClass from '@/components/CreateClass'
import CreateTest from '@/components/CreateTest'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup/',
    name: 'FinishSignUp',
    component: FinishSignUp
  },
  {
    path: '/signup/:id',
    name: 'FinishSignUp',
    component: FinishSignUp
  },
  {
    path: '/home/',
    name: 'Main',
    component: Main
  },
  {
    path: '/turma/:id',
    nome: 'CreateClass',
    component: CreateClass
  },
  {
    path: '/turma/',
    nome: 'CreateClass',
    component: CreateClass
  },
  {
    path: '/prova/',
    nome: 'CreateTest',
    component: CreateTest
  }]
})
