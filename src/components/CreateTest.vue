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
        <testInformations @get-test-id="getTestId"></testInformations>
        <v-btn primary @click.native="step = 2" v-if="step1Complete()">Proximo</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <addQuestions :testId="testId"></addQuestions>
        <v-btn primary @click.native="step = 3">Proximo</v-btn>
        <v-btn flat @click.native="step = 1">Voltar</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <reviewTest></reviewTest>
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
  mounted () {

  },
  methods: {
    getTestId: function (id) {
      this.testId = id
    },
    step1Complete: function () {
      return this.testId !== 0
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

.create-test-step-3-button {
  color: #FFF;
  background-color: #FFF;
}
</style>
