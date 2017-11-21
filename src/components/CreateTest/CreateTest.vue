<template>
<div class="createTest">
  <v-container fluid>
    <v-stepper non-linear class="grey lighten-4" v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1" editable>Informações Gerais</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" editable>Adicionar Questões</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable>Aplicar Prova</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <testInformations @get-test-id="getTestId"></testInformations>
      </v-stepper-content>
      <v-stepper-content step="2">
        <addQuestions @next-step="nextStep" @previous-step="previousStep"></addQuestions>
      </v-stepper-content>
      <v-stepper-content step="3">
        <reviewTest :testId="testId" @previous-step="previousStep"></reviewTest>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</div>
</template>
<script>
import testInformations from './TestInformations'
import addQuestions from './AddQuestions'
import reviewTest from './ReviewTest'
import testService from '../../services/testService'

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
    getTestId () {
      this.testId = testService.getTestId()
      this.nextStep()
    },
    nextStep () {
      if (this.step < 3) {
        this.step++
      }
    },
    previousStep () {
      if (this.step > 1) {
        this.step--
      }
    },
    finish () {
      this.$router.push('/provas')
    }
  }
}
</script>

<style>
.createTest {
  overflow: auto;
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
