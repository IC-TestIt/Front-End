<template>
  <div class="testInformations">
    <form v-on:submit="step1($event)">
      <div class="white lighten-1 z-depth-1 pa-5 ma-3" height="350px">
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
        <v-btn primary type="submit" :loading="loading" :disabled="step1Complete()">Cadastrar</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import baseService from '../services/baseService'
import authService from '../auth'

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
      this.loading = true
      e.preventDefault()
      baseService.post('test', this.test).then((r) => {
        this.testId = r.data.testId
        this.$emit('get-test-id', r.data.testId)
        this.loading = false
      })
    },
    step1Complete: function () {
      return this.testId !== 0
    }
  }
}
</script>

<style lang="css">

</style>
