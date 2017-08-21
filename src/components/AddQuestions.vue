<template>
  <div id="addQuestion">
    <v-card class="white lighten-1 z-depth-1 pa-5 mb-3">
      <v-layout column wrap>
        <form class="createTest-QuestionForm" v-on:submit="step2($event)">
          <div class="" v-for="(question, index) in questions" :key="question.key">
            <v-card class="ma-3 pa-4">
              <v-flex xs12>
                <span>Questão {{index + 1}}</span>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Descrição da Questão" v-model="question.description"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Valor da Questão" v-model="question.value"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-layout row wrap class="dark--text">
                  <v-flex xs12 sm6 class="py-2">
                    <p>Tipo de Questão</p>
                    <v-btn-toggle v-bind:items="typeQuestion" v-model="question.isAlternative"></v-btn-toggle>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 v-if="!question.isAlternative">
                <v-text-field label="Resposta da Questão" v-model="question.answer"></v-text-field>
              </v-flex>
              <v-flex class="mb-3" xs12 v-if="question.isAlternative">
                <div class="" v-for="(a, index) in question.alternatives" :key="a.key">
                  <v-text-field label="Descrição da Alternativa" v-model="a.description"></v-text-field>
                  <v-radio color="primary" tabindex="question.index" v-model="a.isCorrect" label="Alternativa Correta" input-value="true"></v-radio>
                  <small class="CreateTest-WarningText" v-if="!alternativeLimit(question) && lastAlternative(question, index)">O numero maximo de alternativas é 5</small>
                  <v-btn class="green" v-on:click="addAlternative(question)" v-if="lastAlternative(question, index)">Adicionar Alternativa</v-btn>
                  <v-btn class="red" v-on:click="removeAlternative(question, index)">Remover Alternativa</v-btn>
                </div>
              </v-flex>
              <v-flex class="mb-5" xs6>
                <v-btn class="green" v-on:click="addQuestion()" v-if="lastQuestion(index)">Adicionar Questão</v-btn>
                <v-btn class="red" v-on:click="removeQuestion(index)">Remover Questão</v-btn>
              </v-flex>
              <v-flex>
                <v-btn primary type="submit" v-if="lastQuestion(index)">Finalizar</v-btn>
              </v-flex>
            </v-card>
          </div>
        </form>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
import baseService from '../services/baseService'

export default {
  name: 'addQuestion',
  props: ['testId'],
  data: () => ({
    questions: [
      {
        description: '',
        value: '',
        testId: this.testId,
        answer: '',
        isAlternative: false,
        alternatives: [
          {
            description: '', isCorrect: false
          }
        ]
      }
    ],
    typeQuestion: [{text: 'Alternativa', value: true}, {text: 'Dissertativa', value: false}]
  }),
  methods: {
    step2 (e) {
      e.preventDefault()
      this.questions.forEach(function (question) {
        question.testId = this.testId
        if (question.isAlternative === true) {
          baseService.post('question/alternative', question)
        } else {
          baseService.post('question/essay', question)
        }
      })
    },
    addQuestion: function () {
      console.log(this.testId)
      this.questions.push({
        description: '',
        value: '',
        testId: this.testId,
        answer: '',
        isAlternative: false,
        alternatives: [{description: '', isCorrect: false}]
      })
    },
    removeQuestion: function (index) {
      let length = this.questions.length
      if (length > 1) {
        this.questions.splice(index, 1)
      }
    },
    lastQuestion: function (index) {
      let length = this.questions.length
      return length === (index + 1)
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
    }
  }
}
</script>
<style lang="css">
</style>
