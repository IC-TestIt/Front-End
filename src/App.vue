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
    <VMenuBar></VMenuBar>
        
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
import VMenuBar from './components/MenuBar.vue'

export default {
  name: 'app-main',
  components: {
    VMenuBar
  },
  data () {
    return {
      drawer: false,
      auth: auth,
      items: [{
        action: 'create',
        title: 'PROVAS',
        items: [
          {
            title: 'Cadastrar'
          },
          {
            title: 'Minhas Provas'
          }
        ]
      },
      {
        action: 'people',
        title: 'TURMAS',
        active: false,
        items: [
          { title: 'Criar Turma' }
        ]
      }]
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
