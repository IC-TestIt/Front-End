<template> 
      <div class="main">
        <div >
           <VMenu></VMenu>               
        </div>
        <v-container fluid>         
            <v-layout row wrap  class="ml-5">
              <v-flex xs3 v-for="i in 4" :key="i" class="pt-3">
                <v-card dark class="card-panel white elevation-1 mt-3 mx-3">
                  <div class="py-5 px-5 text-xs-center">
                    <v-card-text class="black--text title my-3">1</v-card-text>                     
                  </div>
                </v-card>
              </v-flex>
              <v-flex xs12 class="mt-5">
                <v-card dark class="card-panel white elevation-1  mt-1 py-5">
                  <div class="my-5 px-5 text-xs-center">
                    <v-card-text class="black--text display-1">Grafico</v-card-text>
                  </div>
                </v-card>
              </v-flex>
            </v-layout>       
        </v-container>
      
      </div>
</template>

<script>

import VMenu from './MenuBar'

export default {
  name: 'main',
  components: {
    VMenu
  },
  data () {
    return {
      loggedIn: false
    }
  },
  mounted () {
    this.loggedIn = localStorage.getItem('token') !== null
  },
  methods: {
    logOut: function () {
      localStorage.clear()
      this.loggedIn = false
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .menus{
    text-align: center;
  }
</style>

