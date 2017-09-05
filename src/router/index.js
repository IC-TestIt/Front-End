import Vue from 'vue'
import auth from '../auth'
import Router from 'vue-router'
import Home from '@/components/Home'
import Main from '@/components/Main'
import MyTests from '@/components/MyTests'
import CreateTest from '@/components/CreateTest'
import CreateClass from '@/components/CreateClass'
import FinishSignUp from '@/components/FinishSignUp'
import ViewTest from '@/components/ViewTest'
import MyExams from '@/components/MyExams'
import RealizeExam from '@/components/RealizeExam'

Vue.use(Router)

function onlyTeacher (t, f, next) {
  redirect(t, f, next, auth.isTeacher())
}

function onlyStudent (t, f, next) {
  redirect(t, f, next, auth.isStudent())
}

function onlyUser (t, f, next) {
  redirect(t, f, next, auth.loggedIn())
}

function redirect (to, from, next, condition) {
  if (!condition) {
    next('/')
  } else {
    next()
  }
}

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
    name: 'SignUp',
    component: FinishSignUp
  },
  {
    path: '/home/',
    name: 'Main',
    component: Main,
    beforeEnter: onlyUser
  },
  {
    path: '/turma/:id',
    name: 'CompleteClass',
    component: CreateClass,
    beforeEnter: onlyTeacher
  },
  {
    path: '/turma/',
    name: 'CreateClass',
    component: CreateClass,
    beforeEnter: onlyTeacher
  },
  {
    path: '/prova/',
    name: 'CreateTest',
    component: CreateTest,
    beforeEnter: onlyTeacher
  },
  {
    path: '/provas',
    name: 'MyTests',
    component: MyTests,
    beforeEnter: onlyTeacher
  },
  {
    path: '/avaliacoes',
    name: 'MyExams',
    component: MyExams,
    beforeEnter: onlyStudent
  },
  {
    path: '/realizar/:id',
    name: 'RealizeExam',
    component: RealizeExam,
    beforeEnter: onlyStudent
  },
  {
    path: '/verprova/:id',
    name: 'viewTest',
    component: ViewTest,
    beforeEnter: onlyTeacher
  },
  {
    path: '/logout',
    beforeEnter (to, from, next) {
      auth.logout()
      next('/')
    }
  }]
})
