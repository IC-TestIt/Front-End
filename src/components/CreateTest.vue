<template>
  <div class="createTest">
    <v-container fluid>
      <v-stepper non-linear class="white" v-model="e1">
        <v-stepper-header>
          <v-stepper-step step="1" editable>Informações Gerais</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" editable>Adicionar Questões</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" editable>Revisar Prova</v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="1">
          <form v-on:submit="step1($event)">
            <v-card class="white lighten-1 z-depth-1 mb-5" height="200px">
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
            <v-btn primary type="submit">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-stepper vertical non-linear v-model="e6">
            <v-stepper-step step="1">
              Select an app
              <small>Summarize if needed</small>
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
              <v-btn primary @click.native="e6 = 2">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-step step="2" v-bind:complete="e6 > 2">Configure analytics for this app</v-stepper-step>
            <v-stepper-content step="2">
              <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
              <v-btn primary @click.native="e6 = 3">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
          <v-btn primary @click.native="e1 = 1">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
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
        teacherId: ''
      },
      e1: 1,
      e6: 1
    }
  },
  mounted () {
    this.teacherId = localStorage.getItem('teacherId')
  },
  methods: {
    step1 (e) {
      e.preventDefault()
      this.e1 = '2'
      baseService.post('test', this.test)
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
  height: 50vh;
}

.createTest .input-group__details:before {
  background-color: #888;
}

.step-title {
  text-align: center;
}

</style>
