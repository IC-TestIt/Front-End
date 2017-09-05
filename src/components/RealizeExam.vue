<template>
  <div class="realizeExam text-xs-center">
    <h2 class="realizeExam-exam-title">{{ exam.title }}</h2>
    <DynamicList @get-current="getCurrentQuestion" :list="exam.questions" :current="currentQuestion"></DynamicList>
    <AnswerQuestion :question="currentQuestion" :realizedQuestion="currentRealizedQuestion"></AnswerQuestion>
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
        this.currentRealizedQuestion = { questionId: question.id, essayAnswer: '', alternativeId: '' }
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
  .menus{
    text-align: center;
  }

  .realizeExam-exam-title {
    color: #000;
    font-size: 35px;
  }
</style>
