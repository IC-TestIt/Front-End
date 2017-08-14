<template>
  <div class="main">   
     <main>
        <!--<v-container fluid>-->
          <!--<v-toolbar fluid class="grey lighten-2 mt-0">
            <v-toolbar-text class="title">Cadastrar Prova</v-toolbar-text>

          </v-toolbar>
           <div id="example-1">
            <v-layout row wrap>
              <v-flex xs3 v-for="i in 4" :key="i" class="menus">
                <v-card dark class="card-panel white elevation-1 mt-5">
                  <v-card-text class="black--text">3</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card dark class="card-panel white elevation-1  mt-5">
                  <v-card-text class="black--text">grafico</v-card-text>
                </v-card>
              </v-flex>
            </v-layout> 
            </div>
        </v-container>-->
      </main>  
    </div> 
</template>

<script>
import VMenu from './Menu.vue'

export default {
  name: 'main',
  components: {
    VMenu
  },
  data () {
    return {
      loggedIn: false
    }
  }
}
</script>

<style lang="css">

/*.main {
  display: flex;
  min-height: 80vh;
  min-width: 40vw;
  background-color: #ECECEC;
  height: 200px;
}*/
</style>
