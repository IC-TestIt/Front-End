<template>      
        
        <v-container>         
            <v-layout class="text-xs-center mt-3">
               <v-flex xs5>
                 <v-card dark class="mx-2 green lighten-1" >
                   <v-card-text class="py-5">Estatistica 1</v-card-text>
                 </v-card>
               </v-flex>
               <v-flex xs5>
                 <v-card dark class="mx-2 deep-purple lighten-2">
                    <v-card-text class="py-5">Estatistica 2</v-card-text>
                  </v-card>
                </v-flex>
               <v-flex xs5>
                 <v-card dark class=" mx-2 orange darken-1">
                    <v-card-text class="py-5">Estatistica 3</v-card-text>
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
export default {
  name: 'main'
}
</script>

<style>
  .menus{
    text-align: center;
  }
</style>

