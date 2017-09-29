<template>
<div class='realizeExam text-xs-center'>
    <v-container fluid>
      <div>
        <v-layout row-wrap>
          <v-flex xs6 >
            <h2 class='realizeExam-exam-title'>{{ exam.title + ' - ' + exam.description}}</h2>
          </v-flex>
          <v-flex xs3 v-if="!timeOut && exam.status !== 2">
            <v-btn class="indigo darken-4" dark v-on:click="saveExam()">Salvar Prova</v-btn>
          </v-flex>
          <v-flex xs1 v-if="!timeOut && exam.status !== 2">
            <v-dialog v-model="dialog" persistent fullscreen>
                <v-btn class="green" dark v-on:click="endExam()" slot="activator">Finalizar Prova</v-btn>
                <v-container fluid style="min-height: 0" grid-list-lg>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-card class="indigo darken-4 white--text" height="500px">
                        <v-card-title primary-title>
                          <div class="realizeExam-modal">Parabéns, você terminou a prova :)</div>
                        </v-card-title>
                        <v-card-actions>
                          <v-flex justify-center>
                            <v-btn class="mt-5" @click="goMyTests()">Minhas Provas</v-btn>
                            <v-btn class="mt-5" @click="goHome()">Pagina Inicial</v-btn> 
                          </v-flex>                       
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-layout row-wrap>
          <v-flex xs12>
            <AnswerQuestion :status='exam.status' :question='currentQuestion' :realizedQuestion='currentRealizedQuestion' :index='index'></AnswerQuestion>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex v-if="timeOut || exam.status === 2">
            <v-alert error value="true" md12 v-if="exam.status !== 2">
              Tempo para realização expirado
            </v-alert>
            <v-alert error value="true" md12 v-else>
              A Prova já foi entregue
            </v-alert>
          </v-flex>
          <v-flex md8 v-if="!timeOut && exam.status !== 2">
            <Timer :endTime="exam.endDate" @time-out="getTimeOut"></Timer>
          </v-flex>
          <v-flex xs6>
            <DynamicList v-show="exam.status !== 2" @get-current='getCurrentQuestion' @get-index='getIndex' :list='exam.questions' :current='currentQuestion'></DynamicList>
          </v-flex>
        </v-layout>
      </div>
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
      dialog: false,
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
          if (this.exam.status !== 2) {
            this.currentQuestion = this.exam.questions[0]
            this.realizedQuestions = this.exam.answeredQuestions
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
        if (r.status === 200) {
          this.$toastr('info', {position: 'toast-top-right', msg: 'Prova salva com sucesso'})
        }
      }).catch(e => {
        this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao salvar a prova'})
      })
    },
    endExam () {
      let id = this.$route.params.id
      let exam = {answeredQuestions: this.realizedQuestions}
      baseService.put(`/exam/${id}`, exam).then(r => {
        console.log(r.data)
      })
    },
    goMyTests () {
      this.$router.push('/avaliacoes')
    },
    goHome () {
      this.$router.push('/home')
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

.realizeExam-modal {
  font-size: 90px;
  text-align: center;
}

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
