<template lang="html">
  <div class="createClass">
    <v-container fluid>
      <v-layout row justify-space-around>
        <v-flex xs5 class="ma-3 pa-3 createClass-form">
          <div class="text-xs-center createClass-subtitle">
            <span>Cadastrar Turma</span>
          </div>
          <form class="createClass-class" v-on:submit="createClass()">
            <v-text-field label="Descrição da Turma" v-model="room.description"></v-text-field>
            <div class="text-xs-center">
              <v-btn primary dark type="submit" :loading="loading1">Cadastrar</v-btn>
            </div>
          </form>
        </v-flex>
        <v-flex xs7 class="ma-3 ml-1 pa-3 createClass-form">
          <div class="text-xs-center createClass-subtitle">
            <span>Adicionar Aluno</span>
          </div>
          <form class="createClass-AddStudent" v-on:submit="addStudent()">
            <v-text-field label="Nome" v-model="student.name"></v-text-field>
            <v-text-field label="Email" v-model="student.email"></v-text-field>
            <v-text-field label="Identificador (Ex: RA, CPF, RG)" v-model="student.identifier"></v-text-field>
            <div class="text-xs-center">
              <v-btn primary dark type="submit" :loading="loading2">Adicionar</v-btn>
            </div>
          </form>
        </v-flex>
      </v-layout>
      <v-layout justify-space-around class="">
        <v-flex xs12 class="ma-1 pa-1">
          <v-data-table v-bind:headers="headers" :items="students" hide-actions class="elevation-1 createClass-table">
            <template slot="students" scope="props">
              <td class="text-xs-left">{{ props.student.name }}</td>
              <td class="text-xs-right">{{ props.student.email }}</td>
              <td class="text-xs-right">{{ props.student.identifier }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import baseService from '../services/baseService'

export default {
  name: 'vclass',
  data () {
    return {
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
        organizationId: 7,
        phone: '12',
        birthday: '12/12/2010'
      },
      classId: null,
      students: [],
      routeId: this.$route.params.id,
      headers: [
        {text: 'Nome', value: 'name'},
        {text: 'Email', value: 'email'},
        {text: 'Identificador', value: 'identifier'}
      ],
      loading1: false,
      loading2: false
    }
  },
  mounted () {
    this.getStudents()
  },
  methods: {
    createClass: function (e) {
      this.loading1 = true
      this.room.teacherId = localStorage.getItem('teacherId')
      baseService.post(`/class`, this.room).then(r => {
        if (r.status === 200) {
          this.classId = r.data.classId
          this.$router.push(this.classId)
          this.$toastr('info', {position: 'toast-top-right', msg: 'Turma criada com Sucesso'})
        }
        this.loading1 = false
      }).catch(e => {
        this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao cadastrar a Turma'})
        this.loading1 = false
      })
    },
    addStudent: function (e) {
      this.loading2 = true
      baseService.get(`/student/exists/${this.student.email}`).then(r => {
        let newStudent = r.data
        if (newStudent === 0) {
          baseService.post(`/user`, this.student).then(r => {
            newStudent = r.data
            baseService.post(`/class/${this.routeId}/student/${newStudent.studentId}`)
            this.getStudents()
          }).catch(e => {
            console.log(e)
            this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao realizar o cadastro incial do aluno'})
          })
        } else {
          baseService.post(`/class/${this.routeId}/student/${newStudent}`).catch(e => {
            this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao associar o aluno a turma'})
          })
          this.getStudents()
        }
        this.$toastr('info', {position: 'toast-top-right', msg: 'Aluno adicionado a turma com Sucesso'})
        this.loading2 = false
      }).catch(e => {
        console.log(e)
        this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro, por favor tente mais tarde'})
        this.loading2 = false
      })
    },
    getStudents: function () {
      let id = this.$route.params.id
      baseService.get(`/class/${id}`).then(r => {
        this.students = r.data
      }).catch(e => {
        console.log(e)
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
  height: 30vh;
  overflow-y: scroll;
}

.createClass-form {
  background-color: #FAFAFA;
  padding: 20px;
  box-shadow: 1px 1px 1px #888888;
}

.createClass-table {
  background-color: #FAFAFA;
  overflow-y: scroll;
  height: 28vh;
  box-shadow: 1px 1px 1px #888888;
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


</style>
