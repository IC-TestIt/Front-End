<template>
    <div class="correct-tests">      
       
       <div class="text-xs-left ml-5">       
       <h1 class="title text-xs-center">Corrigir Prova</h1> 
        <v-menu offset-y absolute class="ml-5">
           <v-btn class="light-green darken-3" dark slot="activator">QUESTÕES</v-btn>
           <v-list>
           <v-list-tile v-for="item in items" :key="item.title" @click="">
           <v-list-tile-title>{{ item.title }}</v-list-tile-title>
           </v-list-tile>
           </v-list>
        </v-menu>
       </div>
      <v-layout row>

        <v-flex d-flex xs5 class="ml-5 mt-3">
          <v-card class="ml-5" color="white" light height="350px">
           <v-card-title primary class="title">Resposta do aluno - Lorem ipsum dolor sit amet,
               consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
               labore et dolore magna aliqua. Ut enim ad minim veniam, 
               quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-title>
           <v-card-text>
            </v-card-text>
          </v-card>

        </v-flex>           

        <v-flex xs5 >
        <v-btn id="btn__hide" @click.native="hidden = !hidden" fab small absolute dark>
                   
                   <v-icon>add</v-icon>
              </v-btn>
          <v-layout column class="mt-3">
            <v-flex d-flex v-show="!hidden">
              <v-card light color="secondary" height="250px" width="200px">
              <v-card-text class="px-3 title red--text" >RESPOSTA DO PROFESSOR - Lorem ipsum dolor sit amet,
               consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
               labore et dolore magna aliqua. Ut enim ad minim veniam, 
               quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </v-card-text>              
              </v-card>
            </v-flex> 
            <v-layout class="mt-3" row>  
             <v-flex class="mt-2 ml-4" xs10>             
                <v-slider label="Nota" v-bind:max="100" v-model="number"></v-slider>             
             </v-flex>       
             <v-flex xs1>
                <v-text-field v-model="number" type="number">%</v-text-field>
             </v-flex>
            </v-layout>
          </v-layout>
       </v-flex>
      </v-layout>  
       <div>
          <v-layout row right class="mr-5">
               <v-dialog v-model="dialog" persistent>
                   <v-btn class="blue darken-4" dark slot="activator">Confirmar</v-btn>
                   <v-card>
                      <v-card-title class="headline">Deseja confirmar a questão?</v-card-title>        
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="green--text" flat @click.native="dialog = false">Não</v-btn>
                        <v-btn class="green--text" flat @click.native="dialog = false">Sim</v-btn>
                      </v-card-actions>
                   </v-card>
               </v-dialog>
         </v-layout>
       </div>
     
      
     
    </div>
 
</template>

<script>

export default {
  name: 'CorrectTests',
  data () {
    return {
      number: 0,
      dialog: false,
      hidden: false,
      items: [
        { title: 'Questão 1' },
        { title: 'Questão 2' },
        { title: 'Questão 3' },
        { title: 'Questão 4' }
      ]
    }
  }
}
</script>

<style lang="css">
.correct-tests{
  min-height: 100%;
  min-width: 100%; 
}

#btn__hide{
  background-color: #a20021;
  margin-left: 533px;
 
}


</style>
