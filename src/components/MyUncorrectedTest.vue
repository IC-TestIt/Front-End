<template>
  <div class="my-uncorrected-test">
    <v-container grid-list-md fluid>
      <my-test-header :test="test" class="mb-3"></my-test-header>
      <v-layout row>
        <v-flex xs12>
          <students-status-table></students-status-table>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs3 offset-xs9>
          <percent-card title="Conclusão"></percent-card>
        </v-flex>
      </v-layout>
      <v-layout row justify-end>
        <v-flex xs1>
          <v-btn class="primary" dark>Voltar</v-btn>
        </v-flex>
        <v-flex xs1>
          <v-btn class="success" dark>Corrigir</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import MyTestHeader from './MyTestHeader'
import PercentCard from './PercentCard'
import StudentsStatusTable from './StudentsStatusTable'

export default {
  name: 'my-uncorrected-test',
  props: ['test'],
  components: {
    MyTestHeader,
    PercentCard,
    StudentsStatusTable
  },
  data: () => ({

  }),
  methods: {
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
