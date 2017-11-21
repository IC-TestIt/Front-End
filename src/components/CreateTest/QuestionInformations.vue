<template lang="html">
  <div class="">
    <v-flex xs12 class="mt-5 mb-5 text-xs-center">
      <p class="body-2">Tipo de Questão</p>
      <v-btn-toggle :items="typeQuestion" v-model="currentQuestion.isAlternative" light></v-btn-toggle>
    </v-flex>
    <v-flex xs12 class="ma-1 pa-2 text-xs-center">
      <v-text-field label="Enunciado da Questão" v-model="currentQuestion.description" multi-line></v-text-field>
    </v-flex>
    <v-flex xs12 class="ma-1 pa-2 text-xs-center">
      <v-text-field label="Resposta da Questão" v-if="!currentQuestion.isAlternative" v-model="currentQuestion.answer" multi-line></v-text-field>
    </v-flex>
    <v-flex xs12 v-if="!currentQuestion.isAlternative">
      <v-layout row>
        <v-flex xs11 class="ma-1 pa-2">
          <v-text-field label="Palavras chave" v-model="keyword"></v-text-field>
        </v-flex>
        <v-flex xs1 class="ma-1 pa-2">
          <v-btn class="indigo" @click="addKeyword()" fab small dark><v-icon dark>add</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 class="ma-1 pa-2" v-if="!currentQuestion.isAlternative">
      <v-layout row wrap>
        <div v-for="k in currentQuestion.keywords">
          <v-flex xs1>
            <v-chip class="indigo white--text" close @input="removeChip()">{{k}}</v-chip>
          </v-flex>
        </div>
      </v-layout>
    </v-flex>
    <v-flex xs12 class="ma-1 pa-2">
      <div class="" v-for="(a, index) in currentQuestion.alternatives" :key="a.key" v-if="currentQuestion.isAlternative">
        <v-layout row>
          <v-flex xs7>
            <v-text-field label="Descrição da Alternativa" v-model="a.description"></v-text-field>
          </v-flex>
          <v-flex xs2 class="ml-5 mt-3">
            <v-radio color="primary" :tabindex="currentQuestion.index" v-model="a.isCorrect" label="Correta" :value="true"></v-radio>
          </v-flex>
          <v-flex xs3 class="ml-5 mt-2">
            <span class="CreateTest-WarningText" v-if="!questionModule.alternativeLimit(currentQuestion) && questionModule.lastAlternative(currentQuestion, index)">Maximo de 5 alternativas</span>
            <v-btn class="primary" @click="questionModule.addAlternative(currentQuestion)" v-if="questionModule.alternativeLimit(currentQuestion) && questionModule.lastAlternative(currentQuestion, index)" fab small dark><v-icon dark>add</v-icon></v-btn>
            <v-btn class="red" @click="questionModule.removeAlternative(currentQuestion, index)" fab small dark><v-icon dark>remove</v-icon></v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
    <v-flex xs12 class="ma-1 pa-2 text-xs-center">
      <v-text-field label="Valor da Questão" v-model="currentQuestion.value" type="number"></v-text-field>
    </v-flex>
  </div>
</template>

<script>
import questionModule from '../../utils/questionModule'

export default {
  name: 'question-informations',
  props: ['currentQuestion', 'questions'],
  data () {
    return {
      questionModule: questionModule,
      keyword: '',
      typeQuestion: [{text: 'Alternativa', value: true}, {text: 'Dissertativa', value: false}]
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="css" scoped >

</style>
