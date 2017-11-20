<template>
  <div class="my-corrected-test">
    <v-container grid-list-md fluid>
      <v-layout row>
        <v-flex xs12>
          <div class="primary--text text-xs-center my-test-title">Minha Prova Corrigida</div>
        </v-flex>
      </v-layout>
      <MyTestHeader :test="test"></MyTestHeader>
      <v-layout row>
        <v-flex xs12>
          <v-card height="25vh" class="graphic-card">
            <v-card-title primary-title>
              <v-flex xs10>
                <div><students-grade-graphic :students="test.students"></students-grade-graphic></div>
              </v-flex>
              <v-flex xs2>
                <div>Notas dos Alunos</div>
              </v-flex>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6>
          <v-card height="35vh" class="graphic-card">
            <v-card-title primary-title>
              <v-flex xs10>
                <div><average-questions-graphic :questions="test.questions"></average-questions-graphic></div>
              </v-flex>
              <v-flex xs2>
                <div>Media Por Questões </div>
              </v-flex>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs5>
          <MyTestTable :students="test.students" :room="test.className" :height="'35vh'"></MyTestTable>
        </v-flex>
        <v-flex xs1>
          <v-layout column>
            <v-flex xs6>
              <v-btn class="primary" v-on:click="back()">Voltar</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn class="success" v-on:click="publish()" :loading="loading">Divulgar</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import MyTestHeader from './MyTestHeader'
import MyTestTable from './MyTestTable'
import StudentsGradeGraphic from './StudentsGradeGraphic'
import AverageQuestionsGraphic from './AverageQuestionsGraphic'
import ClassTestService from '../services/classTestService'
import baseService from '../services/baseService'

export default {
  name: 'my-corrected-test',
  components: {
    MyTestHeader,
    MyTestTable,
    StudentsGradeGraphic,
    AverageQuestionsGraphic
  },
  data: () => ({
    test: null,
    loading: false
  }),
  mounted () {
    this.getClassTest()
    this.getStudentsGrade()
    this.getAverageQuestions()
  },
  methods: {
    getClassTest () {
      this.test = ClassTestService.getClassTest()
    },
    back () {
      this.$router.push('/provas')
    },
    publish () {
      this.loading = true
      baseService.post(`/ClassTests/${ClassTestService.getClassTestId()}/publish`).then(r => {
        if (r.status === 200 && r.data !== 0) {
          this.$toastr('success', {position: 'toast-top-right', msg: 'Nota(s) divulgada(s) com sucesso'})
          this.loading = false
          this.$router.push('/provas')
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao divulgar a(s) nota(s)'})
          this.loading = false
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-corrected-test
  width 95vw
  max-width 95vw

.graphic-card
  overflow-y hidden
  overflow-x scroll

.my-test-title
  font-size 20px
  margin-top -10px

</style>
