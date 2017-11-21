<template>
  <div class="addQuestion">
    <div class="grey lighten-4 z-depth-1">
      <v-layout column wrap class="text-xs-center" align-center>
        <form class="createTest-QuestionForm">
          <v-flex xs12 class="ma-1 pa-2 text-xs-center" id="toggleQuestionType">
            <v-layout row wrap>
              <v-flex xs5>
                <DynamicList @get-current='getCurrentQuestion' @get-index='getIndex' :list='questions' :current='currentQuestion'></DynamicList>
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn @click="previous()" class="white" light flat>Voltar</v-btn>
                <v-btn primary @click.stop="dialog = true">Salvar Questões</v-btn>
                <v-dialog v-model="dialog" scrollable lazy width="600">
                 <v-card class="ma-2 elevation-0" height="300">
                  <v-card-title class="headline primary--text text-xs-center">Cadastrar Prova</v-card-title>
                  <v-card-text class="title text-xs-center pa-5">Cadastrar Prova ?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="red--text" flat @click.native="dialog = false">Cancelar</v-btn>
                    <v-btn class="success--text" flat @click="step2($event)" :loading="loading">Cadastrar</v-btn>
                  </v-card-actions>
                 </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-flex>
          <question-informations :currentQuestion="currentQuestion" :questions="questions"></question-informations>
          <v-flex xs12>
            <v-layout row justify-center>
              <v-flex xs3>
                <v-btn class="red" @click="questionModule.removeQuestion(questions, currentQuestion, index)" dark>Remover Questão</v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn class="success" @click="questionModule.addQuestion(questions, currentQuestion)" dark>Adicionar Questão</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </form>
      </v-layout>
    </div>
  </div>
</template>
<script>
import baseService from '../../services/baseService'
import testService from '../../services/testService'
import questionService from '../../services/questionService'
import DynamicList from '../DynamicList'
import QuestionInformations from './QuestionInformations'
import questionModule from '../../utils/questionModule'

export default {
  name: 'addQuestion',
  components: {
    DynamicList,
    QuestionInformations
  },
  data: () => ({
    testId: 0,
    questionModule: questionModule,
    questions: [
      {
        description: '',
        value: '',
        answer: '',
        order: '',
        keywords: [],
        isAlternative: false,
        testId: '',
        alternatives: [
          {
            description: '', isCorrect: false
          }
        ]
      }
    ],
    currentQuestion: {},
    dialog: false,
    test: {},
    index: 1,
    loading: false
  }),
  mounted () {
    this.test = testService.getTest()
    this.questions = questionService.getQuestions()
    if (this.questions === null) {
      this.questions = [
        {
          description: '',
          value: '',
          answer: '',
          order: '',
          keywords: [],
          isAlternative: false,
          testId: '',
          alternatives: [
            {
              description: '', isCorrect: false
            }
          ]
        }
      ]
    }
    this.currentQuestion = this.questions[0]
  },
  methods: {
    step2 (e) {
      e.preventDefault()
      let sucess = true
      this.loading = true
      baseService.post('test', this.test).then((r) => {
        let id = r.data.testId
        testService.saveTestId(id)
        this.questions.forEach(function (question, index) {
          question.testId = id
          question.order = index
          if (!question.isAlternative && Array.isArray(question.keywords) && question.keywords.length > 0) {
            question.keywords = question.keywords.reduce((total, k) => total + ',' + k)
          } else if (question.keywords.length === 0) {
            question.keywords = ''
          }
        })
        baseService.post(`/question`, this.questions).then(r => {
          if (r.status === 200) {
            sucess = true
            questionService.removeQuestions()
            testService.removeTest()
          } else {
            sucess = false
          }
        })
        if (sucess) {
          this.$toastr('info', {position: 'toast-top-right', msg: 'Questões Adicionadas com Sucesso'})
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao adicionar questões'})
        }
        this.loading = false
        this.dialog = false
        this.next()
      })
    },
    getCurrentQuestion (question) {
      this.currentQuestion = question
    },
    getIndex (index) {
      this.index = index
    },
    next () {
      this.$emit('next-step')
    },
    previous () {
      this.$emit('previous-step')
    }
  }
}
</script>

<style lang="stylus">
.addQuestion
  h6
    color #000

.createTest-QuestionForm
  max-width 70vw
  width 70vw

</style>
