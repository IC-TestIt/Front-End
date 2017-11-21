<template>
  <div class="testInformations">
    <form @submit="step1($event)">
      <div class="grey lighten-4 z-depth-1 pa-3 ma-3">
        <v-layout row wrap>
          <v-flex xs12>
            <h5 class="display-1 success--text text-xs-center">Informações Gerais</h5>
          </v-flex>
          <v-flex xs8 offset-xs2>
            <v-text-field label="Titulo da Prova" type="text" v-model="test.title"></v-text-field>
          </v-flex>
          <v-flex xs8 offset-xs2>
            <v-text-field label="Descrição da Prova" v-model="test.description" multi-line></v-text-field>
          </v-flex>
          <v-flex xs12 class="text-xs-center">
            <v-btn primary type="submit" :loading="loading" :disabled="step1Complete()">Próximo</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </form>
  </div>
</template>

<script>
import authService from '../../auth'
import testService from '../../services/testService'

export default {
  name: 'testInformations',
  data () {
    return {
      test: {
        description: '',
        title: '',
        teacherId: null
      },
      testId: 0,
      loading: false
    }
  },
  mounted () {
    this.test.teacherId = authService.teacherId()
  },
  methods: {
    step1 (e) {
      e.preventDefault()
      testService.saveTest(this.test)
      this.$emit('get-test-id')
    },
    step1Complete () {
      return this.testId !== 0
    }
  }
}
</script>

<style lang="css">

</style>
