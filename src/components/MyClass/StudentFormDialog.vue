<template lang="html">
  <div class="student-form-dialog">
    <v-btn class="warning" dark @click.stop="dialog = true">Adicionar Alunos</v-btn>
    <v-dialog v-model="dialog" scrollable lazy width="600">
     <v-card class="ma-2 elevation-0" height="300">
      <v-card-title class="headline primary--text text-xs-center">Adicionar Aluno a Turma</v-card-title>
      <form @submit="addStudent($event)" class="ma-5">
        <v-text-field label="Nome" v-model="student.name"></v-text-field>
        <v-text-field label="Email" v-model="student.email"></v-text-field>
        <v-text-field label="Identificador (Ex: RA, CPF, RG)" v-model="student.identifier"></v-text-field>
        <div class="text-xs-center">
          <v-btn primary dark type="submit" :loading="loading">Adicionar</v-btn>
        </div>
      </form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="success--text" flat @click.native="dialog = false">Fechar</v-btn>
      </v-card-actions>
     </v-card>
    </v-dialog>
  </div>
</template>

<script>
import baseService from '../../services/baseService'
export default {
  name: 'student-form-dialog',
  props: ['classId', 'students'],
  data () {
    return {
      loading: false,
      dialog: false,
      student: {
        email: null,
        name: null,
        identifier: null,
        type: 2,
        password: 'senha@123',
        organizationId: 1,
        phone: '12',
        birthday: '12/12/2010'
      }
    }
  },
  methods: {
    resetForm () {
      this.student = {
        email: null,
        name: null,
        identifier: null,
        type: 2,
        password: 'senha@123',
        organizationId: 1,
        phone: '12',
        birthday: '12/12/2010'
      }
    },
    addStudent (e) {
      e.preventDefault()
      this.loading = true
      baseService.get(`/student/exists/${this.student.email}`).then(r => {
        let newStudent = r.data
        if (newStudent !== -1) {
          baseService.post(`/class/${this.classId}/student/${newStudent}`).catch(e => {
            this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao associar o aluno a turma'})
          })
          this.students.push({studentName: this.student.name, studentIdentifier: this.student.identifier, grade: 0})
          this.$toastr('info', {position: 'toast-top-right', msg: 'Aluno adicionado a turma com Sucesso'})
          this.loading = false
          this.resetForm()
        } else {
          baseService.post(`/user`, this.student).then(r => {
            let newStudent = r.data
            baseService.post(`/class/${this.classId}/student/${newStudent.studentId}`).then((r) => {
              this.students.push({studentName: this.student.name, studentIdentifier: this.student.identifier, grade: 0})
              this.resetForm()
            })
            this.loading = false
            this.$toastr('info', {position: 'toast-top-right', msg: 'Aluno adicionado a turma com Sucesso'})
          }).catch(e => {
            this.loading = false
            this.resetForm()
            this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao realizar o cadastro incial do aluno'})
          })
        }
      }).catch(e => {
        this.loading = false
        this.resetForm()
        this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro, por favor tente mais tarde'})
      })
    }
  }
}
</script>

<style lang="stylus" scoped >

</style>
