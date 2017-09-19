<template>
  <div class="addQuestion">
    <v-card class="white lighten-1 z-depth-1 mb-1">
      <v-layout column wrap>
        <form class="createTest-QuestionForm" v-on:submit="step2($event)">
          <div class="">
            <DynamicList @get-current='getCurrentQuestion' @get-index='getIndex' :list='questions' :current='currentQuestion'></DynamicList>
            <v-flex xs12 class="ma-3 pa-3">
              <h6>Questão {{index}}</h6>
            </v-flex>
            <v-flex xs12 class="ma-1 pa-2">
              <v-text-field label="Descrição da Questão" v-model="currentQuestion.description"></v-text-field>
            </v-flex>
            <v-flex xs12 class="ma-1 pa-2">
              <v-text-field label="Valor da Questão" v-model="currentQuestion.value"></v-text-field>
            </v-flex>
            <v-flex xs12 class="ma-1 pa-2">
              <v-layout row wrap class="dark--text">
                <v-flex xs12 sm6 class="py-2">
                  <p>Tipo de Questão</p>
                  <v-btn-toggle v-bind:items="typeQuestion" v-model="currentQuestion.isAlternative"></v-btn-toggle>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 v-if="!currentQuestion.isAlternative" class="ma-1 pa-2">
              <v-text-field label="Resposta da Questão" v-model="currentQuestion.answer"></v-text-field>
            </v-flex>
            <v-flex xs12 v-if="!currentQuestion.isAlternative" class="ma-1 pa-2">
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field label="Palavras chave" v-model="keyword"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-btn class="indigo" v-on:click="addKeyword()" v-if="!currentQuestion.isAlternative" dark>Adicionar Palavra-Chave</v-btn>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <div v-for="k in currentQuestion.keywords">
                  <v-flex xs12>
                    <v-chip class="indigo white--text" close @input="removeChip(k)">{{k}}</v-chip>
                  </v-flex>
                </div>
              </v-layout>
            </v-flex>
            <v-flex xs4 v-if="!currentQuestion.isAlternative" class="ma-1 pa-2">
            </v-flex>
            <div class="" v-for="(a, index) in currentQuestion.alternatives" :key="a.key">
              <v-layout row wrap>
                <v-flex class="ma-2 pa-2" xs5 v-if="currentQuestion.isAlternative">
                  <v-text-field label="Descrição da Alternativa" v-model="a.description"></v-text-field>
                  <v-radio color="primary" :tabindex="currentQuestion.index" v-model="a.isCorrect" label="Alternativa Correta" :value="true"></v-radio>
                </v-flex>
                <v-flex class="ma-2 pa-2" xs6 v-if="currentQuestion.isAlternative">
                  <small class="CreateTest-WarningText" v-if="!alternativeLimit(currentQuestion) && lastAlternative(currentQuestion, index)">O numero maximo de alternativas é 5</small>
                  <v-btn class="indigo" outline v-on:click="addAlternative(currentQuestion)" v-if="alternativeLimit(currentQuestion) && lastAlternative(currentQuestion, index)">Adicionar Alternativa</v-btn>
                  <v-btn class="red" outline v-on:click="removeAlternative(currentQuestion, index)">Remover Alternativa</v-btn>
                </v-flex>
              </v-layout>
            </div>
            <v-flex class="ma-1 pa-2" xs6>
              <v-btn class="green" v-on:click="addQuestion()" v-if="lastQuestion(index)">Adicionar Questão</v-btn>
              <v-btn class="red" v-on:click="removeQuestion()">Remover Questão</v-btn>
              <v-btn primary type="submit" v-if="lastQuestion(index)" :loading="loading">Salvar</v-btn>
            </v-flex>
          </div>
        </form>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
import baseService from '../services/baseService'
import DynamicList from './DynamicList'

export default {
  name: 'addQuestion',
  props: ['testId'],
  components: {
    DynamicList
  },
  data: () => ({
    keyword: '',
    questions: [
      {
        description: '',
        value: '',
        answer: '',
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
      this.questions.forEach(function (question) {
        question.testId = id
        if (!question.isAlternative) {
          question.keywords = question.keywords.reduce((total, k) => total + ', ' + k)
        }
      })
      console.log(this.questions[0].keywords)
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
    addQuestion: function () {
      this.questions.push({
        description: '',
        value: '',
        testId: this.testId,
        keywords: [],
        answer: '',
        isAlternative: false,
        alternatives: [{description: '', isCorrect: false}]
      })
    },
    removeQuestion: function () {
      let length = this.questions.length
      if (length > 1) {
        this.currentQuestion = this.questions[this.index]
        this.questions.splice(this.index, 1)
      }
    },
    lastQuestion: function () {
      let length = this.questions.length
      return length === (this.index)
    },
    addAlternative: function (question) {
      let length = question.alternatives.length
      if (length < 5) {
        question.alternatives.push({
          description: '',
          isCorrect: false
        })
      }
    },
    lastAlternative: function (question, index) {
      let length = question.alternatives.length
      return length === (index + 1)
    },
    removeAlternative: function (question, index) {
      let length = question.alternatives.length
      if (length > 1) {
        question.alternatives.splice(index, 1)
      }
    },
    alternativeLimit: function (question) {
      let length = question.alternatives.length
      return length < 5
    },
    addKeyword () {
      if (this.keyword !== '') {
        this.currentQuestion.keywords.push(this.keyword)
        this.keyword = ''
      }
    },
    removeChip (word) {
      let index = this.currentQuestion.keywords.findIndex(function (w) {
        return w === word
      })
      this.currentQuestion.keywords.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus">
.addQuestion
  h6
    color #000

</style>
