<template lang="html">
  <div class="createClass">
    <v-container fluid>
      <v-layout row justify-space-around>
        <v-flex xs6 class="mt-1 createClass-form">
          <div class="text-xs-center">
            <span>Cadastrar Turma</span>
          </div>
          <form class="" v-on:submit="createClass()">
            <v-text-field label="Descrição da Turma" v-model="room.description" class="input-group--focused"></v-text-field>
            <div class="text-xs-center">
              <v-btn round primary dark>Cadastrar</v-btn>
            </div>
          </form>
        </v-flex>
        <v-flex xs6 class="mt-1 createClass-form">
          <div class="text-xs-center">
            <span>Adicionar Aluno</span>
          </div>
          <form class="createClass-AddStudent" v-on:submit="addStudent()">
            <v-text-field label="Nome" v-model="student.name" class="input-group--focused"></v-text-field>
            <v-text-field label="Email" v-model="student.email" class="input-group--focused"></v-text-field>
            <v-text-field label="Identificador (Ex: RA, CPF, RG)" v-model="student.identifyer" class="input-group--focused"></v-text-field>
            <div class="text-xs-center">
              <v-btn round primary dark>Adicionar</v-btn>
            </div>
          </form>
        </v-flex>
      </v-layout>
      <v-layout justify-space-around class="createClass-table">
        <v-flex xs12>
          <v-data-table v-bind:headers="headers" :items="students" hide-actions class="elevation-1">
            <template slot="students" scope="props">
              <td class="text-xs-left">{{ props.student.name }}</td>
              <td class="text-xs-right">{{ props.student.email }}</td>
              <td class="text-xs-right">{{ props.student.identifyer }}</td>
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
        identifyer: null,
        type: 2,
        password: 'senha@123',
        organizationId: 7,
        phone: '12',
        birthday: '12/12/2010'
      },
      classId: null,
      students: this.getStudents(),
      routeId: this.$route.params.id,
      headers: [
        {text: 'Nome', value: 'name'},
        {text: 'Email', value: 'email'},
        {text: 'Identificador', value: 'identifyer'}
      ]
    }
  },
  mounted () {
    this.getStudents()
  },
  methods: {
    createClass: function (e) {
      this.room.teacherId = localStorage.getItem('teacherId')
      baseService.post(`/class`, this.room).then(r => {
        if (r.status === 200) {
          this.classId = r.data.classId
          this.$router.push(this.classId)
        }
      })
    },
    addStudent: function (e) {
      baseService.get(`/student/exists/${this.student.email}`).then(r => {
        let newStudent = r.data
        console.log(newStudent)
        if (newStudent === 0) {
          baseService.post(`/user`, this.student).then(r => {
            newStudent = r.data
            baseService.post(`/class/${this.routeId}/student/${newStudent.studentId}`)
            this.getStudents()
          })
        } else {
          baseService.post(`/class/${this.routeId}/student/${newStudent}`)
          this.getStudents()
        }
      })
    },
    getStudents: function () {
      let id = this.$route.params.id
      baseService.get(`/class/${id}`).then(r => {
        this.students = r.data
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
  overflow-y: scroll;
}

.createClass .container {
  width: 75vw;
}

.createClass-AddStudent {
  height: 40vh;
  overflow-y: scroll;
}

.createClass-form {
  margin: 30px;
  background-color: #FAFAFA;
  border: 1px solid #000;
  padding: 20px;
}

.createClass-table {
  margin-left: 40px;
  background-color: #FAFAFA;
}


</style>
