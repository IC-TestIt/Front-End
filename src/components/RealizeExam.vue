<template>
<div class='realizeExam text-xs-center'>
  <v-container fluid>
    <v-layout row-wrap>
      <v-flex xs6>
        <h2 class='realizeExam-exam-title'>{{ exam.title }}</h2>
      </v-flex>
      <v-flex xs6>
        <DynamicList @get-current='getCurrentQuestion' @get-index='getIndex' :list='exam.questions' :current='currentQuestion'></DynamicList>
      </v-flex>
    </v-layout>
    <v-layout row-wrap>
      <v-flex xs12>
        <AnswerQuestion :question='currentQuestion' :realizedQuestion='currentRealizedQuestion' :index='index'></AnswerQuestion>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex v-if="timeOut">
        <v-alert error value="true" md12>
          Tempo para realização expirado
        </v-alert>
      </v-flex>
      <v-flex md8 v-if="!timeOut">
        <Timer :endTime="exam.endDate" @time-out="getTimeOut"></Timer>
      </v-flex>
      <v-flex md2 v-if="!timeOut">
        <v-btn class="indigo darken-4" dark v-on:click="saveExam()">Salvar Prova</v-btn>
      </v-flex>
      <v-flex md2 v-if="!timeOut">
        <v-btn class="green" dark v-on:click="endExam()">Entregar Prova</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import baseService from '../services/baseService'
import DynamicList from './DynamicList'
import AnswerQuestion from './AnswerQuestion'
import Timer from './Timer'

export default {
  name: 'realizeExam',
  components: {
    DynamicList,
    AnswerQuestion,
    Timer
  },
  data () {
    return {
      currentQuestion: '',
      realizedQuestions: [],
      currentRealizedQuestion: '',
      exam: '',
      index: 1,
      timeOut: false
    }
  },
  beforeMount () {
    this.getExam()
  },
  methods: {
    getExam: function () {
      let id = this.$route.params.id
      baseService.get(`/exam/${id}`).then(response => {
        console.log(response.data)
        if (response.status === 200) {
          this.exam = response.data
          this.currentQuestion = this.exam.questions[0]
          this.realizedQuestions = this.exam.answeredQuestions
          this.findAnswer(this.currentQuestion)
        }
      })
    },
    getCurrentQuestion (question) {
      this.saveAnswer(this.currentRealizedQuestion)
      this.findAnswer(question)
      this.currentQuestion = question
    },
    findAnswer (question) {
      let index = this.findQuestion(question)
      if (index !== -1) {
        this.currentRealizedQuestion = this.realizedQuestions[index]
      } else {
        this.currentRealizedQuestion = {
          questionId: question.id,
          essayAnswer: '',
          alternativeId: '',
          examId: this.exam.id
        }
        this.realizedQuestions.push(this.currentRealizedQuestion)
      }
    },
    findQuestion (question) {
      let index = this.realizedQuestions.findIndex(function (q) {
        return q.questionId === question.id
      })
      return index
    },
    saveAnswer (question) {
      let index = this.findQuestion(question)
      if (index !== -1) {
        this.realizedQuestions[index] = question
      }
    },
    saveExam () {
      let id = this.$route.params.id
      let exam = {answeredQuestions: this.realizedQuestions}
      baseService.put(`/exam/save/${id}`, exam).then(r => {
        console.log(r.data)
      })
    },
    endExam () {
      let id = this.$route.params.id
      let exam = {answeredQuestions: this.realizedQuestions}
      baseService.put(`/exam/${id}`, exam).then(r => {
        console.log(r.data)
      })
    },
    getIndex (index) {
      this.index = index
    },
    getTimeOut (bool) {
      this.timeOut = bool
    }
  }
}
</script>

<style>
.menus {
  text-align: center;
}

.realizeExam-exam-title {
  color: #000;
  font-size: 35px;
}
</style>
