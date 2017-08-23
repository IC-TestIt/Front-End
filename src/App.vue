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
    <v-toolbar flat class="transparent">
           <v-list class="pa-0">
             <v-list-tile avatar tag="div" class="indigo darken-4 py-3">
               <v-list-tile-content>
                 <v-list-tile-title class="white--text">Bem-vindo</v-list-tile-title>
               </v-list-tile-content>
             </v-list-tile>
           </v-list>
         </v-toolbar>
         <v-list class="white my-4">
           <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
             <v-list-tile slot="item">
               <v-list-tile-action>
                 <v-icon class="world">{{ item.action }}</v-icon>
               </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title class="world">{{ item.title }}</v-list-tile-title>
               </v-list-tile-content>
               <v-list-tile-action>
                 <v-icon>keyboard_arrow_down</v-icon>
               </v-list-tile-action>
             </v-list-tile>
             <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" class="white">
               <v-list-tile-content>
                 <a>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                 </a>
               </v-list-tile-content>
               <v-list-tile-action>
                 <v-icon>{{ subItem.action }}</v-icon>
               </v-list-tile-action>
             </v-list-tile>
           </v-list-group>
         </v-list>
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

export default {
  name: 'app-main',
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
          { title: 'Item' },
          { title: 'Item' }
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
