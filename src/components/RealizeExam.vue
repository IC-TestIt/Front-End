<template>
<div class='realizeExam text-xs-center'>
  <v-container fluid>
    <v-layout row-wrap>
      <v-flex xs6>
        <h2 class='realizeExam-exam-title'>{{ exam.title }}</h2>
      </v-flex>
      <v-flex xs6>
        <DynamicList @get-current='getCurrentQuestion' :list='exam.questions' :current='currentQuestion'></DynamicList>
      </v-flex>
    </v-layout>
    <v-layout row-wrap>
      <v-flex xs12>
        <AnswerQuestion :question='currentQuestion' :realizedQuestion='currentRealizedQuestion'></AnswerQuestion>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs2>
        <v-btn class="green">Salvar Prova</v-btn>
      </v-flex>
      <v-flex xs2>
        <v-btn class="yellow">Entregar Prova</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import baseService from '../services/baseService'
import DynamicList from './DynamicList'
import AnswerQuestion from './AnswerQuestion'

export default {
  name: 'realizeExam',
  components: {
    DynamicList,
    AnswerQuestion
  },
  props: ['examId'],
  data () {
    return {
      currentQuestion: '',
      realizedQuestions: [],
      currentRealizedQuestion: '',
      exam: ''
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
          alternativeId: ''
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
    }
  }
}
</script>

<style>
.menus {
  text-align: center;
}

.realizeExam {
  overflow-y: scroll;
}

.realizeExam-exam-title {
  color: #000;
  font-size: 35px;
}
</style>
