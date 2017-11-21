<template>
  <div id="reviewTest">
    <div class="lighten-1 z-depth-1 mb-5 pa-5" height="150px">
      <v-layout row wrap align-center="true" justify-center="true">
        <v-flex xs3>
          <AssociateTest :test="test" :save="save"></AssociateTest>
        </v-flex>
        <v-flex xs3>
          <v-btn class="indigo darken-1 pa-2" dark @click="viewTest()">Visualizar Prova
            <v-icon right dark>chrome_reader_mode</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn class="amber darken-1 pa-2" light @click="exportPdf()">Exportar Prova
            <v-icon right dark>get_app</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 class="text-xs-center mt-5">
          <v-btn flat @click.native="previous()">Voltar</v-btn>
          <v-btn success @click.native="finish()">Minhas Provas</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import baseService from '../../services/baseService'
import pdfService from '../../services/pdfService'
import testService from '../../services/testService'
import questionService from '../../services/questionService'
import AssociateTest from '../AssociateTest'

export default {
  name: 'reviewTest',
  components: {
    AssociateTest
  },
  data: () => ({
    classes: [],
    test: {
      classIds: [],
      beginDate: null,
      endDate: null,
      testId: 0
    }
  }),
  mounted () {
    this.getClasses()
  },
  methods: {
    exportPdf () {
      this.testId = testService.getTestId()
      baseService.get(`/test/export/${this.testId}`).then(r => {
        let pdf = {'content': r.data}
        pdfService.post(`/pdf`, pdf).then(r => {
          if (r.status === 200) {
            window.open(pdfService.get(), '_blank')
          }
        })
      })
    },
    viewTest () {
      this.testId = testService.getTestId()
      this.$router.push('/verprova/' + this.testId)
    },
    previous () {
      this.$emit('previous-step')
    },
    save () {
      let id = testService.getTestId()
      this.loading = true
      this.test.classIds = this.test.classIds.map(c => {
        return c.id
      })
      baseService.post(`/test/${id}/classes`, this.test).then(r => {
        if (r.status === 200) {
          this.dialog = false
          this.test = {
            classIds: [],
            beginDate: null,
            endDate: null
          }
          this.loading = false
        }
      })
    },
    finish () {
      questionService.removeQuestions()
      testService.removeTestId()
      this.$router.push('/provas')
    }
  }
}
</script>
