<template>
<div class='realizeExam text-xs-center'>
    <v-container fluid>
      <div>
        <v-layout row-wrap>
          <v-flex xs12 >
            <h2 class='realizeExam-exam-title'>{{ exam.title + ' - ' + exam.description}}</h2>
          </v-flex>

        </v-layout>
        <v-layout row-wrap>
          <v-flex xs12>
            <AnswerQuestion :status='exam.status' :question='currentQuestion' :realizedQuestion='currentRealizedQuestion' :index='index'></AnswerQuestion>
          </v-flex>
        </v-layout>
        <v-layout row class="mt-3">
          <v-flex xs12 v-if="timeOut || exam.status === 2">
            <v-alert error value="true" md12 v-if="exam.status !== 2">
              Tempo para realização expirado
            </v-alert>
            <v-alert error value="true" md12 v-else>
              A Prova já foi entregue
            </v-alert>
          </v-flex>
          <v-flex xs5 v-if="!timeOut && exam.status !== 2">
            <Timer :endTime="exam.endDate" @time-out="getTimeOut"></Timer>
          </v-flex>
          <v-flex xs3>
            <DynamicList v-show="exam.status !== 2" @get-current='getCurrentQuestion' @get-index='getIndex' :list='exam.questions' :current='currentQuestion'></DynamicList>
          </v-flex>
          <v-flex xs2 v-if="!timeOut && exam.status !== 2">
            <v-btn class="primary" dark v-on:click="saveExam()" :loading="saveLoading">Salvar Prova</v-btn>
          </v-flex>
          <v-flex xs2 v-if="!timeOut && exam.status !== 2">
            <v-btn class="success" dark v-on:click="endExam()" :loading="finalizeLoading">Entregar Prova</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
</div>
</template>

<script>
import baseService from '../services/baseService'
import questionService from '../services/questionService'
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
      timeOut: false,
      saveLoading: false,
      finalizeLoading: false
    }
  },
  beforeMount () {
    this.getExam()
  },
  methods: {
    getExam: function () {
      let id = this.$route.params.id
      baseService.get(`/exam/${id}`).then(response => {
        if (response.status === 200) {
          this.exam = response.data
          if (this.exam.status !== 2) {
            let realized = questionService.getRealizedQuestions()
            this.currentQuestion = this.exam.questions[0]
            if (this.exam.answeredQuestions.length < realized.length) {
              this.realizedQuestions = realized
            } else {
              this.realizedQuestions = this.exam.answeredQuestions
            }
            this.findAnswer(this.currentQuestion)
          } else {
            this.currentQuestion = 0
            this.realizedQuestions = 0
          }
        }
      })
    },
    getCurrentQuestion (question) {
      this.saveAnswer(this.currentRealizedQuestion)
      this.findAnswer(question)
      this.currentQuestion = question
      questionService.saveRealizedQuestions(this.realizedQuestions)
    },
    findAnswer (question) {
      let index = this.findQuestion(question)
      if (index !== -1) {
        this.currentRealizedQuestion = this.realizedQuestions[index]
        questionService.saveRealizedQuestions(this.realizedQuestions)
      } else {
        this.currentRealizedQuestion = {
          questionId: question.id,
          essayAnswer: '',
          alternativeId: '',
          examId: this.exam.id
        }
        this.realizedQuestions.push(this.currentRealizedQuestion)
        questionService.saveRealizedQuestions(this.realizedQuestions)
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
        questionService.saveRealizedQuestions(this.realizedQuestions)
      }
    },
    saveExam () {
      this.saveLoading = true
      let id = this.$route.params.id
      let exam = {answeredQuestions: this.realizedQuestions}
      baseService.put(`/exam/${id}/saved`, exam).then(r => {
        if (r.status === 200) {
          this.$toastr('success', {position: 'toast-top-right', msg: 'Prova salva com sucesso'})
        }
        this.saveLoading = false
      }).catch(e => {
        this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao salvar a prova'})
        this.saveLoading = false
      })
    },
    endExam () {
      this.finalizeLoading = true
      let id = this.$route.params.id
      let exam = {answeredQuestions: this.realizedQuestions}
      baseService.put(`/exam/${id}`, exam).then(r => {
        if (r.status === 200 && r.data !== 0) {
          this.$toastr('success', {position: 'toast-top-right', msg: 'Prova entregue com sucesso'})
          baseService.post(`exam/${id}/correct`).then(r => {
            this.timeOut = true
            this.finalizeLoading = false
          })
          .catch(e => {
            this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao entregar a prova'})
            this.finalizeLoading = false
          })
        }
      }).catch(e => {
        this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao entregar a prova'})
        this.finalizeLoading = false
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

.realizeExam-error {
  font-size: 20px;
}
</style>
