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
    <VMenuStudent v-if="auth.isStudent()"></VMenuStudent>
    <VMenuTeacher v-if="auth.isTeacher()"></VMenuTeacher>

    </v-navigation-drawer>
    <v-toolbar class="indigo darken-4" dark>
      <v-toolbar-side-icon @click.native.stop="hide" v-show="auth.loggedIn()"></v-toolbar-side-icon>
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
import VMenuStudent from './components/MenuStudent'
import VMenuTeacher from './components/MenuTeacher'

export default {
  name: 'app-main',
  components: {
    VMenuTeacher,
    VMenuStudent
  },
  data () {
    return {
      drawer: true,
      auth: auth
    }
  },
  methods: {
    hide () {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style lang="stylus">
  @import './assets/styles/main'
</style>
