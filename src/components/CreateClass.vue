<template lang="html">
  <div class="createClass">
    <v-container fluid>
      <v-layout left  class="">
        <v-flex  class="pl-1 ">
          <v-data-table v-bind:headers="headers" :items="students" hide-actions class="elevation-1 createClass-table">
            <template slot="items" scope="props">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.email }}</td>
              <td class="text-xs-center">{{ props.item.identifier }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      
      <v-layout  class="createClass-layout-form" right>
      
        <v-flex v-show="!hidden" class="pa-3 createClass-form ">
          <div class="text-xs-center createClass-subtitle">
            <span>Cadastrar Turma</span>
          </div>
          <form class="createClass-class" v-on:submit="createClass($event)">
            <v-text-field label="Descrição da Turma" v-model="room.description"></v-text-field>
            <div class="text-xs-center">
              <v-btn  primary @click="hidden = !hidden" dark type="submit" :loading="loading1">
                    {{ hidden ? 'Cadastrar' : 'Cadastrar' }}
              </v-btn>
            </div>
          </form>
        </v-flex>        
      </v-layout>
      
      <v-layout right class=" createClass-layout-form2">
        <v-flex  class=" pa-3 createClass-form2 " v-show="hidden">
          <div class="text-xs-center createClass-subtitle">
            <span>Adicionar Aluno</span>
          </div>
          <form class="createClass-AddStudent" v-on:submit="addStudent($event)">
            <v-text-field label="Nome" v-model="student.name"></v-text-field>
            <v-text-field label="Email" v-model="student.email"></v-text-field>
            <v-text-field label="Identificador (Ex: RA, CPF, RG)" v-model="student.identifier"></v-text-field>
            <div class="text-xs-center">
              <v-btn primary dark type="submit" :loading="loading2">Adicionar</v-btn>
            </div>
          </form>
        </v-flex>
      </v-layout>
     
    </v-container>
  </div>
</template>

<script>
import baseService from '../services/baseService'
import authService from '../auth'

export default {
  name: 'vclass',
  data () {
    return {
      hidden: false,
      room: {

        description: null,
        teacherId: null
      },
      student: {
        email: null,
        name: null,
        identifier: null,
        type: 2,
        password: 'senha@123',
        organizationId: 1,
        phone: '12',
        birthday: '12/12/2010'
      },
      classId: this.$route.params.id,
      students: [],
      headers: [
        {text: 'Nome', value: 'name', align: 'left'},
        {text: 'Email', value: 'email', align: 'center'},
        {text: 'Identificador', value: 'identifier', align: 'center'}
      ],
      loading1: false,
      loading2: false
    }
  },
  mounted () {
    this.getStudents(this.classId)
  },
  methods: {
    createClass: function (e) {
      e.preventDefault()
      this.loading1 = true
      this.room.teacherId = authService.teacherId()
      baseService.post(`/class`, this.room).then(r => {
        if (r.status === 200) {
          this.classId = r.data.classId
          /* window.location.href += '/' + this.classId */
          this.$toastr('info', {position: 'toast-top-right', msg: 'Turma criada com Sucesso'})
        }
        this.loading1 = false
      }).catch(e => {
        this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao cadastrar a Turma'})
        this.loading1 = false
        this.hidden = !this.hidden
      })
    },
    addStudent: function (e) {
      e.preventDefault()
      this.loading2 = true
      baseService.get(`/student/exists/${this.student.email}`).then(r => {
        let newStudent = r.data
        if (newStudent !== -1) {
          baseService.post(`/class/${this.classId}/student/${newStudent}`).catch(e => {
            this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao associar o aluno a turma'})
          })
          this.getStudents(this.classId)
          this.$toastr('info', {position: 'toast-top-right', msg: 'Aluno adicionado a turma com Sucesso'})
          this.loading2 = false
        } else {
          baseService.post(`/user`, this.student).then(r => {
            let newStudent = r.data
            baseService.post(`/class/${this.classId}/student/${newStudent.studentId}`)
            this.getStudents(this.classId)
            this.loading2 = false
          }).catch(e => {
            this.getStudents(this.classId)
            this.loading2 = false
            this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao realizar o cadastro incial do aluno'})
          })
          this.getStudents(this.classId)
        }
      }).catch(e => {
        this.loading2 = false
        this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro, por favor tente mais tarde'})
      })
      this.getStudents(this.classId)
    },
    getStudents: function (id) {
      baseService.get(`/class/${id}`).then(r => {
        this.students = r.data
      }).catch(e => {
        this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao obter os alunos'})
      })
    }
  }
}
</script>


<style lang="css">
.createClass {
  display: flex;
  min-height: 80vh;
  background-color: #ECECEC;
  height: 300px;
}

.createClass .input-group__details:before {
  background-color: #888;
}

.createClass .container {
  width: 75vw;
}

.createClass-AddStudent {
  height: 50vh;
  overflow-y: scroll;
}

.createClass-form {
  background-color: #FAFAFA;
  padding: 20px;
  box-shadow: 1px 1px 1px #888888;
  margin-top: 13vh;
  margin-left: 15vh;
}

.createClass-form2 {
  background-color: #FAFAFA;
  padding: 20px;
  box-shadow: 1px 1px 1px #888888;

}

.createClass-table {
  background-color: #FAFAFA;
  overflow-y: scroll;
  height: 68vh;
  box-shadow: 1px 1px 1px #888888;
  width: 70vh;
  
}

.createClass-subtitle {
  text-transform: full-width;
  text-align: center;
  color: #444;
  letter-spacing: 1px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  margin-bottom: 5px;
}

.createClass-layout-form{
  width: 80vh;    
}

.createClass-layout-form2{
  width: 70vh;
  height: 60vh;
  margin-left: 5vh;

}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
