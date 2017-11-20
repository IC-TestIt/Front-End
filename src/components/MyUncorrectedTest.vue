<template>
  <div class="my-uncorrected-test">
    <v-container grid-list-md fluid>
      <my-test-header :test="test" class="mb-3"></my-test-header>
      <v-layout row>
        <v-flex xs12>
          <my-test-table :students="test.students" :room="test.className"></my-test-table>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs3 offset-xs9>
          <conclusion-card title="Total de Alunos Corrigidos" :value="test.students.length - test.uncorrectedExams" :total="test.students.length"></conclusion-card>
        </v-flex>
      </v-layout>
      <v-layout row justify-end>
        <v-flex xs1>
          <v-btn class="primary" dark @click="back()">Voltar</v-btn>
        </v-flex>
        <v-flex xs1>
          <v-btn class="success" dark @click="correctExams()">Corrigir</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import MyTestHeader from './MyTestHeader'
import ConclusionCard from './MyTestConclusionCard'
import MyTestTable from './MyTestTable'
import examService from '../services/examService'
import testService from '../services/testService'
import baseService from '../services/baseService'

export default {
  name: 'my-uncorrected-test',
  props: ['test', 'testId'],
  components: {
    MyTestHeader,
    ConclusionCard,
    MyTestTable
  },
  methods: {
    back () {
      this.$router.push('/provas')
    },
    correctExams () {
      let ids = []
      ids.push(this.test.classTestId)
      baseService.post(`/test/${this.testId}/correction`, {ids: ids}).then(r => {
        if (r.status === 200 && r.data !== 0) {
          examService.saveExams(r.data.correctedExams)
          testService.saveTest(r.data.test)
          this.$router.push('/corrigir')
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro, por favor tente mais tarde'})
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>

.my-uncorrected-test
  width 95vw
  max-width 95vw

.button-back
  margin-left 104px

</style>
