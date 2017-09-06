<template>
  <v-app toolbar footer>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      disable-route-watcher
      overflow
      v-if="auth.loggedIn()"
    >
    <VMenuStudent v-if="getStudent()"></VMenuStudent>
    <VMenuteacher v-if="getTeacher()"></VMenuteacher>
        
    </v-navigation-drawer>
    <v-toolbar class="indigo darken-4" dark>
      <v-toolbar-side-icon @click.stop="hide" v-show="auth.loggedIn()"></v-toolbar-side-icon>
      <v-toolbar-title>Test It</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <v-container fluid id="app-container" class="home">
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer>
      <span class="white--text">© 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import auth from './auth'
import VMenuStudent from './components/MenuStudent.vue'
import VMenuteacher from './components/Menuteacher.vue'

export default {
  name: 'app-main',
  components: {
    VMenuteacher,
    VMenuStudent
  },
  data () {
    return {
      drawer: false,
      auth: auth     
    }
  },
  methods: {
    hide () {
      this.drawer = !this.drawer
    },
    getTeacher () {
      this.status = auth.getTeacher()
    },
    getStudent () {
      this.status = auth.getStudent()
    }
  }
}
</script>

<style lang="stylus">
  @import './assets/styles/main'
</style>
