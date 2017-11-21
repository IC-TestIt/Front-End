import Vue from 'vue'
import auth from '../auth'
import Router from 'vue-router'
import Home from '@/components/Home'
import Main from '@/components/Main'
import MyTests from '@/components/MyTests'
import MyTest from '@/components/MyTest'
import MyClass from '@/components/MyClass/Main'
import CreateTest from '@/components/CreateTest/CreateTest'
import CreateClass from '@/components/CreateClass/Main'
import FinishSignUp from '@/components/FinishSignUp'
import ViewTest from '@/components/ViewTest'
import MyExams from '@/components/MyExams'
import RealizeExam from '@/components/RealizeExam'
import MyClasses from '@/components/MyClasses'
import CorrectTest from '@/components/CorrectTests'
import TestCorrection from '@/components/TestCorrection/Main'

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
    next('/home')
  } else {
    next()
  }
}

export default new Router({
  // mode: 'history',
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
    path: '/correcao',
    name: 'TestCorrection',
    component: TestCorrection,
    beforeEnter: onlyStudent
  },
  {
    path: '/minhaprova',
    name: 'MyTest',
    component: MyTest,
    beforeEnter: onlyTeacher
  },
  {
    path: '/minhaturma',
    name: 'MyClass',
    component: MyClass,
    beforeEnter: onlyTeacher
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
    path: '/corrigir',
    name: 'CorrectTests',
    component: CorrectTest,
    beforeEnter: onlyTeacher
  },
  {
    path: '/turmas',
    name: 'MyClasses',
    component: MyClasses,
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
