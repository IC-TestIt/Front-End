<template>      
        
        <v-container>         
            <v-layout class="text-xs-center mt-3">
               <v-flex xs5>
                 <v-card dark class="mx-2 green lighten-1" >
                   <v-card-text class="py-5">one</v-card-text>
                 </v-card>
               </v-flex>
               <v-flex xs5>
                 <v-card dark class="mx-2 deep-purple lighten-2">
                    <v-card-text class="py-5">two</v-card-text>
                  </v-card>
                </v-flex>
               <v-flex xs5>
                 <v-card dark class=" mx-2 orange darken-1">
                    <v-card-text class="py-5">three</v-card-text>
                 </v-card>
               </v-flex>
               <v-flex xs5>
                 <v-card dark class=" mx-2 red darken-1">
                    <v-card-text class="py-5">four</v-card-text>
                 </v-card>
               </v-flex>
             </v-layout>
             <v-layout class="">
               <v-flex xs12 class="mt-5 text-xs-center">
                <v-card dark class="card-panel white elevation-1 py-5 px-5">                  
                    <v-card-text class="black--text display-1 my-5">Grafico</v-card-text>                  
                </v-card>
              </v-flex>              
            </v-layout>     
        </v-container>
      
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

