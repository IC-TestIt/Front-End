<template>
  <div class="createTest">
    <v-container fluid>
      <v-stepper non-linear>
        <v-stepper-header>
          <v-stepper-step step="1" editable>Informações Gerais</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" editable>Adicionar Questões</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" editable>Revisar Prova</v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="1">
          <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
          <v-btn primary @click.native="e1 = 2">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-stepper vertical non-linear>
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
export default {
  name: 'CreateTest',
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

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


</style>
