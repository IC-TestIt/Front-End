// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueToastr from '@deveodk/vue-toastr'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'

Vue.use(VueToastr)
Vue.use(VueResource)
Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.http.options.root = process.env.API

Vue.router = router

/* eslint-disable no-new */
new Vue({
  el: '#app-main',
  router,
  template: '<App/>',
  components: { App }
})
