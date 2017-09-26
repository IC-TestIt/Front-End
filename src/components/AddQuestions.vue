<template>
  <div class="addQuestion">
    <div class="white lighten-1 z-depth-1">
      <v-layout column wrap>
        <form class="createTest-QuestionForm" @submit="step2($event)">
          <div class="">
            <v-flex xs12 class="ma-1 pa-2">
              <v-layout row wrap>
                <v-flex class="" xs5>
                  <DynamicList @get-current='getCurrentQuestion' @get-index='getIndex' :list='questions' :current='currentQuestion'></DynamicList>
                </v-flex>
                <v-flex class="" xs4>
                  <v-btn class="green" @click="questionModule.addQuestion(questions)" dark>Adicionar Questão</v-btn>
                  <v-btn class="red" @click="questionModule.removeQuestion(questions, currentQuestion, index)" dark>Remover Questão</v-btn>
                </v-flex>
                <v-flex xs3 class="text-xs-right">
                  <v-btn type="submit" primary :loading="loading" @click="next()">Proximo</v-btn>
                  <v-btn flat @click="previous()">Voltar</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs8 class="ma-1 pa-2">
              <v-layout row wrap class="dark--text">
                <v-flex xs3 class="py-2">
                  <p>Tipo de Questão</p>
                  <v-btn-toggle :items="typeQuestion" v-model="currentQuestion.isAlternative"></v-btn-toggle>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs5 class="ma-1 pa-2">
                  <v-text-field label="Descrição da Questão" v-model="currentQuestion.description" multi-line></v-text-field>
                </v-flex>
                <v-flex xs5 class="ma-1 pa-2">
                  <v-text-field label="Resposta da Questão" v-if="!currentQuestion.isAlternative" v-model="currentQuestion.answer" multi-line></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="ma-1 pa-2">
              <v-layout row wrap>
                <v-flex xs4 class="ma-1">
                  <v-text-field v-if="!currentQuestion.isAlternative" label="Palavras chave" v-model="keyword"></v-text-field>
                </v-flex>
                <v-flex xs1 class="ma-1">
                  <v-btn class="indigo" @click="addKeyword()" v-if="!currentQuestion.isAlternative" fab small dark><v-icon dark>add</v-icon></v-btn>
                </v-flex>
                <v-flex xs6 class="ma-1">
                  <v-layout row wrap>
                    <div v-for="k in currentQuestion.keywords">
                      <v-flex xs1>
                        <v-chip class="indigo white--text" close @input="removeChip()">{{k}}</v-chip>
                      </v-flex>
                    </div>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <div class="" v-for="(a, index) in currentQuestion.alternatives" :key="a.key" v-if="currentQuestion.isAlternative">
              <v-layout row wrap>
                <v-flex class="ma-1 ml-2 pa-1 pl-2" xs5>
                  <v-text-field label="Descrição da Alternativa" v-model="a.description"></v-text-field>
                </v-flex>
                <v-flex class="ma-1 ml-2 pa-1 pl-2" xs2>
                  <v-radio color="primary" :tabindex="currentQuestion.index" v-model="a.isCorrect" label="Alternativa Correta" :value="true"></v-radio>
                </v-flex>
                <v-flex class="ma-1 ml-2 pa-1 pl-2" xs3>
                  <span class="CreateTest-WarningText ma-1 mr-3" v-if="!questionModule.alternativeLimit(currentQuestion) && questionModule.lastAlternative(currentQuestion, index)">O numero maximo de alternativas é 5</span>
                  <v-btn class="indigo" @click="questionModule.addAlternative(currentQuestion)" v-if="questionModule.alternativeLimit(currentQuestion) && questionModule.lastAlternative(currentQuestion, index)" fab small dark><v-icon dark>add</v-icon></v-btn>
                  <v-btn class="red" @click="questionModule.removeAlternative(currentQuestion, index)" fab small dark><v-icon dark>remove</v-icon></v-btn>
                </v-flex>
              </v-layout>
            </div>
            <v-layout row wrap>
              <v-flex xs2 class="ml-3 pa-2">
                <v-text-field label="Valor da Questão" v-model="currentQuestion.value"></v-text-field>
              </v-flex>
            </v-layout>
          </div>
        </form>
      </v-layout>
    </div>
  </div>
</template>
<script>
import baseService from '../services/baseService'
import DynamicList from './DynamicList'
import questionModule from '../utils/questionModule'

export default {
  name: 'addQuestion',
  props: ['testId'],
  components: {
    DynamicList
  },
  data: () => ({
    questionModule: questionModule,
    keyword: '',
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
    typeQuestion: [{text: 'Alternativa', value: true}, {text: 'Dissertativa', value: false}],
    currentQuestion: {
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
    },
    index: 1,
    loading: false
  }),
  mounted () {
    this.currentQuestion = this.questions[0]
  },
  methods: {
    step2 (e) {
      e.preventDefault()
      let id = this.testId
      let sucess = true
      this.loading = true
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
    },
    getCurrentQuestion (question) {
      this.currentQuestion = question
    },
    getIndex (index) {
      this.index = index
    },
    addKeyword () {
      if (this.keyword !== '' && !(/\s|,|\./g.test(this.keyword))) {
        this.currentQuestion.keywords.push(this.keyword)
      } else {
        this.$toastr('error', {position: 'toast-top-right', msg: 'Palavra Chave Invalida!'})
      }
      this.keyword = ''
    },
    removeChip (word) {
      let index = this.currentQuestion.keywords.findIndex(function (w) {
        return w === word
      })
      this.currentQuestion.keywords.splice(index, 1)
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

</style>
