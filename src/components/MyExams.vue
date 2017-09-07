<template>
    <div class="my-exams">
        <v-layout row wrap>
            <v-flex xs12>
                <h3 class="my-exams-title text-xs-center ma-1 pt-4">Minhas Avaliações</h3>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="green darken-1 white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">{{this.exams.length}}</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3 ">Total de Avaliações</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="indigo lighten-1 white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">0</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3">Avaliações Realizadas</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="orange darken-1 white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">0</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3">Avaliações Pendentes</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs0 md12 class="mr-5 ml-5 pa-1">
                <v-data-table
                    v-bind:headers="headers"
                    :items="exams"
                    hide-actions
                    class="white elevation-1"
                >
                    <template slot="items" scope="props">
                        <td class="text-xs-center" >{{ props.item.name }}</td>
                        <td class="text-xs-center">{{ props.item.className }}</td>
                        <td class="text-xs-center">{{ props.item.teacherName }}</td>
                        <td class="text-xs-center">
                          <v-btn primary dark v-on:click="realizeExam(props.item.classTestId)">Realizar</v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import baseService from '../services/baseService'
import auth from '../auth'

export default {
  name: 'MyExams',
  data () {
    return {
      auth: auth,
      exams: [],
      headers: [
        {text: 'Título', value: 'Title', align: 'center'},
        {text: 'Turma', value: 'Class', align: 'center'},
        {text: 'Professor', value: 'Teacher', align: 'center'},
        {text: 'Ações', value: '', align: 'center'}
      ]
    }
  },
  mounted () {
    this.getExams()
  },
  methods: {
    getExams () {
      baseService.get(`/student/${auth.studentId()}/tests`).then(r => {
        console.log(r.data)
        if (r.status === 200) {
          this.exams = r.data
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro na obtenção das provas!'})
        }
      })
    },
    realizeExam (id) {
      let exam = {classTestsId: id, studentId: auth.studentId()}
      baseService.post(`/exam`, exam).then(r => {
        console.log(r.data)
        this.$router.push('/realizar/' + r.data.examId)
      })
    }
  }
}
</script>

<style lang="stylus">
.my-exams-title {
    color: #006
}
</style>
