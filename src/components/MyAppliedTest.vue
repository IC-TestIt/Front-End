<template>
  <div class="my-applied-test">
    <v-container grid-list-md fluid>
      <my-test-header :test="test" class="mb-3"></my-test-header>
      <v-layout row>
        <v-flex xs12>
          <my-test-table :students="test.students" :room="test.className" height="55vh"></my-test-table>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs1>
          <v-btn class="primary button-back" dark @click="back()">Voltar</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MyTestHeader from './MyTestHeader'
import ConclusionCard from './MyTestConclusionCard'
import MyTestTable from './MyTestTable'
import Timer from './Timer'

export default {
  name: 'my-applied-test',
  props: ['test'],
  components: {
    MyTestHeader,
    ConclusionCard,
    MyTestTable,
    Timer
  },
  methods: {
    back () {
      this.$router.push('/provas')
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-applied-test
  width 95vw
  max-width 95vw

.button-back
  margin-left 0px

</style>
