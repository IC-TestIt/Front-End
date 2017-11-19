<template lang="html">
  <div class="test-correction">
    <v-container fluid grid-list-md>
      <v-layout column justify-center class="ml-5">
        <v-layout row>
          <v-flex d-flex xs12>
            <h1 class="display-1 text-xs-center black--text">Correção da Prova</h1>
          </v-flex>
        </v-layout>
        <v-flex d-flex xs12 class="ml-5">
          <test-header :exam="exam" :questions="questions" :currentQuestion="currentQuestion" @get-current-question="getCurrentQuestion"></test-header>
        </v-flex>
        <v-flex d-flex xs12 class="ml-1">
          <v-card class="ml-5 card" height="50vh">
            <v-layout row>
              <v-flex xs8>
                <answers :currentQuestion="currentQuestion" :showAnswer="showAnswer"></answers>
              </v-flex>
              <v-flex xs5 class="ml-5 mt-3">
                <question-informations :currentQuestion="currentQuestion" @show-teacher-answer="showTeacherAnswer"></question-informations>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import baseService from '../../services/baseService'
// import examService from '../../services/examService'
import GradeCard from './GradeCard'
import TestHeader from './Header'
import Answers from './Answers'
import QuestionInformations from './QuestionInformations'

export default {
  name: 'TestCorrection',
  components: {
    GradeCard,
    TestHeader,
    Answers,
    QuestionInformations
  },
  data () {
    return {
      examId: 1,
      exam: {},
      questions: [],
      currentQuestion: {},
      showAnswer: false
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      // this.examId = examService.getExamId()
      baseService.get(`exam/${this.examId}/correction`).then((r) => {
        if (r.status === 200) {
          this.exam = r.data
          this.questions = this.exam.answers
          this.currentQuestion = this.questions[0]
        }
      })
    },
    getCurrentQuestion (question) {
      this.currentQuestion = question
    },
    showTeacherAnswer (show) {
      this.showAnswer = show
    }
  }
}
</script>

<style lang="stylus" scoped >

.test-correction
  min-height 100%
  min-width 100%
  margin-right 5vw

.arrow-button
  width: 10%;

.bold
  font-weight: bold;

.menu
  overflow hidden

.title
  color #000

.card
  overflow-y auto
  overflow-x hidden

.card2
  overflow hidden

</style>
