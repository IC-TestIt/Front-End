<template>
<div class="createTest">
  <v-container fluid>
    <v-stepper non-linear class="white" v-model="e1">
      <v-stepper-header>
        <v-stepper-step step="1" editable>Informações Gerais</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" editable>Adicionar Questões</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable>Aplicar Prova</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <form v-on:submit="step1($event)">
          <v-card class="white lighten-1 z-depth-1 pa-5 ma-3" height="300px">
            <v-layout row wrap>
              <v-flex xs12>
                <h5 class="step-title">Informações Gerais</h5>
              </v-flex>
              <v-flex xs3>
              </v-flex>
              <v-flex xs6>
                <v-text-field label="Titulo da Prova" type="text" v-model="test.title"></v-text-field>
              </v-flex>
              <v-flex xs3>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Descrição da Prova" v-model="test.description"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card>
          <v-btn primary type="submit" @click.native="e1 = 2">Proximo</v-btn>
          <v-btn flat>Cancelar</v-btn>
        </form>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="white lighten-1 z-depth-1 pa-5 mb-3">
          <v-layout column wrap>
            <form class="createTest-QuestionForm" v-on:submit="step2($event)">
              <div class="" v-for="(question, index) in test.questions" :key="question.key">
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
                  <v-flex xs12 v-if="question.isAlternative === false">
                    <v-text-field label="Resposta da Questão" v-model="question.asnwer"></v-text-field>
                  </v-flex>
                  <v-flex class="mb-3" xs12 v-if="question.isAlternative === true">
                    <div class="" v-for="(a, index) in question.alternatives" :key="a.key">
                      <v-text-field label="Descrição da Alternativa" v-model="a.description"></v-text-field>
                      <v-radio color="primary" tabindex="question.index" v-model="a.isCorrect" label="Alternativa Correta" input-value="true"></v-radio>
                      <small class="CreateTest-WarningText" v-if="alternativeLimit(question)">O numero maximo de alternativas é 5</small>
                      <v-btn class="green" v-on:click="addAlternative(question)" v-if="lastAlternative(question, index)">Adicionar Alternativa</v-btn>
                      <v-btn class="red" v-on:click="removeAlternative(question, index)">Remover Alternativa</v-btn>
                    </div>
                  </v-flex>
                  <v-flex class="mb-3">
                    <v-btn class="green" v-on:click="addQuestion()" v-if="lastQuestion(index)">Adicionar Questão</v-btn>
                    <v-btn class="red" v-on:click="removeQuestion(index)">Remover Questão</v-btn>
                  </v-flex>
                  <v-flex>
                    <v-btn primary type="submit" @click.native="e1 = 3" v-if="lastQuestion(index)">Proximo</v-btn>
                    <v-btn flat @click.native="e1 = 1" v-if="lastQuestion(index)">Voltar</v-btn>
                  </v-flex>
                </v-card>
              </div>
            </form>
          </v-layout>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card class="lighten-1 z-depth-1 mb-5 pa-5" height="200px">
          <v-layout align-center>
            <v-flex xs3 fill-height>
              <v-btn class="CreateTest-Step3Button green lighten-1 pa-5">Associar Prova</v-btn>
            </v-flex xs1 fill-height>
            <v-flex>
              <v-btn class="CreateTest-Step3Button red lighten-1 pa-5">Exportar Prova</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
        <v-btn primary @click.native="e1 = 1">Finalizar</v-btn>
        <v-btn flat @click.native="e1 = 2">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</div>
</template>
<script>
import baseService from '../services/baseService'

export default {
  name: 'CreateTest',
  data () {
    return {
      test: {
        description: '',
        title: '',
        teacherId: '',
        questions: [{
          description: '',
          value: '',
          testId: this.testId,
          answer: '',
          isAlternative: false,
          alternatives: [
            {description: '', isCorrect: false}
          ]

        }]
      },
      e1: 1,
      typeQuestion: [{text: 'Alternativa', value: true}, {text: 'Dissertativa', value: false}],
      pagination: {},
      testId: 0
    }
  },
  mounted () {
    this.teacherId = localStorage.getItem('teacherId')
    console.log(this.pagination)
  },
  methods: {
    step1 (e) {
      e.preventDefault()
      this.e1 = '2'
      baseService.post('test', this.test).then((r) => {
        console.log(r)
        this.testId = r.data.testId
      })
    },
    step2 (e) {
      e.preventDefault()
      this.test.questions.forEach(function (question) {
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
      this.test.questions.push({
        description: '',
        value: '',
        testId: this.testId,
        answer: '',
        isAlternative: false,
        alternatives: [{description: '', isCorrect: false}]
      })
    },
    removeQuestion: function (index) {
      let length = this.test.questions.length
      if (length > 1) {
        this.test.questions.splice(index, 1)
      }
    },
    lastQuestion: function (index) {
      let length = this.test.questions.length
      if (length === (index + 1)) {
        return true
      } else {
        return false
      }
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
      if (length === (index + 1)) {
        return true
      } else {
        return false
      }
    },
    removeAlternative: function (question, index) {
      let length = question.alternatives.length
      if (length > 1) {
        question.alternatives.splice(index, 1)
      }
    },
    alternativeLimit: function (question) {
      let length = question.alternatives.length
      if (length < 5) {
        return false
      } else {
        return true
      }
    }
  },
  computed: {

  }
}
</script>
<style>
.createTest {
  overflow: scroll;
}

.createTest .container {
  width: 100vw;
  height: 100vh;
}

.createTest .input-group__details:before {
  background-color: #888;
}

.step-title {
  text-align: center;
  color: #000;
}

.CreateTest-WarningText {
  color: #F00;
}

.CreateTest-Step3Button {
  color: #FFF;
  background-color: #FFF;
}
</style>
