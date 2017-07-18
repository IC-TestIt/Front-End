<template lang="html">
    <div class="main">  
   
        <div class="dash">
              <md-whiteframe class=" a dash-item form-one">
                                 
                 <form class="form-save-class">
                    
                    <md-input-container>
                       <label>Descrição da turma</label>
                       <md-input  v-model="room.description"></md-input>
                    </md-input-container>

                    

                     <md-button type="submit" class="md-raised md-primary">Salvar</md-button>
                 </form>
                
   
              </md-whiteframe>

              <md-whiteframe class=" b  dash-item form-two">
                  <form class="form-save-student">
                    
                    <md-input-container>
                       <label>Nome do aluno</label>
                       <md-input v-model="student.name"></md-input>
                    </md-input-container>

                     <md-input-container>
                       <label>Email</label>
                       <md-input  v-model="student.email"></md-input>
                     </md-input-container>

                     <md-input-container>
                       <label>Identificador (Ex: RA, CPF, RG)</label>
                       <md-input   v-model="student.identifyer"></md-input>
                     </md-input-container>
                    

                     <md-button type="submit" class="md-raised md-primary">Salvar</md-button>
                 </form>
    
              </md-whiteframe>         
              
       
       
               <md-table v-once class="c table-class">
  
                    <md-table-header>
                      <md-table-row>
                        <md-table-head>Aluno(ID)</md-table-head>
                        <md-table-head>Turma</md-table-head>
                        
                      </md-table-row>
                   </md-table-header>

                   <md-table-body>
                       <md-table-row v-for="(row, index) in 1" :key="index">
                         <md-table-cell>ID</md-table-cell>
                         <md-table-cell v-for="(col, index) in 1" :key="index">Descrição</md-table-cell>
                       </md-table-row>
                   </md-table-body>

                </md-table>
        
      </div>
  </div>
    
</template>

<script>
export default {
  name: 'vlogin',
  data () {
    return {
      room: {
        description: null
      },
      student: {
        email: null,
        name: null,
        identifyer: null
      }
    }
  }
}
</script>


<style lang="css">

.main {
  display: flex;
  min-height: 80vh;
  min-width: 40vw;
  background-color: #ECECEC;
  height: 300px;
}

.dash {
  display: grid;    
  margin: 0 0 0 110px;
  grid-gap: 50px;
  grid-template-columns: 1fr 15% 150px 1fr;
  grid-template-rows: 250px 250px;
  grid-template-areas: 
    "a b"
    "c c"    
    
  ;  
  
} 

.a {
  grid-columns: a;  
}

.b {
  grid-columns: b;
}

.c{
  grid-area: c;
}

.dash-item {
  display: flex;  
  /*justify-content: center;*/
  align-items: center;
  flex-direction: row;
  background-color: #FAFAFA;
}


.form-one {  
  margin-top: 30px;
  width: 40vw;  
  background: #FFF;  
  overflow-x: hidden;  
  /*box-shadow: 5px 5px 5px 5px grey;*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}

.form-two {   
  margin-top: 30px;
  width: 40vw;
  background: #FFF;  
  overflow-x: hidden;  
  /*box-shadow: 5px 5px 5px 5px grey;*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}

.table-class { 
   background: #FFF; 
  width: 83.5vw; 
  height: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.form-save-class{
  width: 450px;
  margin: 10px auto auto 50px;
  padding: 20px;
}

.form-save-student{
  width: 450px;
  margin: auto auto auto 50px;
  padding: 20px;
}

.md-raised {
  margin: 20px auto auto auto;
}



</style>
