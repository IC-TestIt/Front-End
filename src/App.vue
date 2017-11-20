<template>
  <v-app toolbar footer class="flex-app">
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      disable-route-watcher
      overflow
      v-if="auth.loggedIn()"
    >
    
    <v-menu-student v-if="auth.isStudent()"></v-menu-student>
    <v-menu-teacher v-if="auth.isTeacher()"></v-menu-teacher>

    </v-navigation-drawer>
    <v-toolbar class="primary" dark>
      <v-toolbar-side-icon @click.native.stop="hide" v-show="auth.loggedIn()"></v-toolbar-side-icon>
      <v-toolbar-title>Test It</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="auth.loggedIn()" class="logout">
        <a v-on:click="logout()">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
        </a>
      </div>
    </v-toolbar>
    <main>
      <v-container fluid grid-list-md id="app-container" class="home">
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer class="primary">
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
      drawer: false,
      auth: auth
    }
  },
  methods: {
    hide () {
      this.drawer = !this.drawer
    },
    logout () {
      this.$router.push('/logout')
    },
    getStudent () {
      this.status = auth.isStudent()
    },
    getTeacher () {
      this.status = auth.isTeacher()
    }
  }
}
</script>

<style lang="stylus">
  @import './assets/styles/main'

  .logout i
    font-size: 5vh

  .flex-app
    display flex
    flex-direction column

  .fa-sign-out:before
    color: white;

</style>
