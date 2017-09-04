<template>      
        <div class="testlist grey lighten-1" >
            <v-container                              
              class="px-5"            
             >  
                <div class="my-4" >[Numero das questoes]</div>
                 <v-layout row wrap xs4 >
                    <div>
                     <v-btn flat dark class="display-1"> < </v-btn>
                   </div>
                   <v-flex>
                    <v-card class="white elevation-1" height="166px" >                      
                        <v-card-text class="px-0 title" >[Enunciado da prova]</v-card-text>                      
                    </v-card>
                   </v-flex>
                   <v-flex xs5>                                            
                          <v-text-field
                            class="pa-2 white elevation-1 borda"              
                            textarea                                                      
                          ></v-text-field>                    
                   </v-flex>  
                    <div>
                     <v-btn flat dark class="display-1">></v-btn>
                   </div>      
                 </v-layout>                  
       
            </v-container>
                <v-layout row class="pt-4">
                   <v-flex xs12 offset-xs7>
                     <v-btn flat dark class="px-0 red lighten-2">Sair</v-btn>                  
                     <v-btn flat dark class="px-0 light-green lighten-1">Entregar</v-btn>
                   </v-flex>
                </v-layout>
      </div>
</template>

<style>
.testlist{
  height: 400px;
  width: 1000px; 
}

.input-group__details{
  display: none;  
}

.application--light .input-group.input-group--textarea:not(.input-group--full-width) textarea{
  border: 0;
}
</style>
