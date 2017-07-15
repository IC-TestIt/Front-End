// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueMaterial)
Vue.config.productionTip = false

Vue.http.options.root = process.env.API

Vue.router = router

Vue.material.registerTheme('default', {
  primary: {
    color: 'indigo',
    hue: 900
  },
  accent: 'blue',
  warn: 'black',
  background: 'grey'
})

/* eslint-disable no-new */
new Vue({
  el: '#app-main',
  router,
  template: '<App/>',
  components: { App }
})
