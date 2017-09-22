<template>
<div class="createTest">
  <v-container fluid>
    <v-stepper non-linear class="white" v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1" editable :complete="step1Complete()">Informações Gerais</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :editable="step1Complete()">Adicionar Questões</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :editable="step1Complete()">Aplicar Prova</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <v-flex xs12 class="text-xs-right">
          <v-btn primary @click.native="step = 2" v-if="testId !== 0">Proximo</v-btn>
        </v-flex>
        <testInformations @get-test-id="getTestId"></testInformations>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-flex xs12 class="text-xs-right">
          <v-btn primary @click.native="step = 3">Proximo</v-btn>
          <v-btn flat @click.native="step = 1">Voltar</v-btn>
        </v-flex>
        <addQuestions :testId="testId"></addQuestions>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-flex xs12 class="text-xs-right">
          <v-btn primary @click.native="finish()">Finalizar</v-btn>
          <v-btn flat @click.native="step = 2">Voltar</v-btn>
        </v-flex>
        <reviewTest :testId="testId"></reviewTest>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</div>
</template>
<script>
import testInformations from './TestInformations'
import addQuestions from './AddQuestions'
import reviewTest from './ReviewTest'

export default {
  name: 'CreateTest',
  components: {
    testInformations,
    addQuestions,
    reviewTest
  },
  data () {
    return {
      step: 1,
      testId: 0
    }
  },
  methods: {
    getTestId: function (id) {
      this.testId = id
    },
    step1Complete: function () {
      return this.testId !== 0
    },
    finish () {
      this.$router.push('/provas')
    }
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
</style>
