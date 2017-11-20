<template lang="html">
  <div class="tests-dialog">
    <v-btn class="success" dark @click.stop="dialog = true">Provas</v-btn>
    <v-dialog v-model="dialog" scrollable lazy width="1200">
     <v-card class="ml-0 elevation-0">
      <v-card-title class="headline primary--text text-xs-center">Provas da Turma</v-card-title>
      <test-list v-if="currentClass.tests > 0" :tests="currentClass.tests"></test-list>
      <v-card-text v-else>Não existem provas associadas a essa turma</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="success--text" center flat @click.native="dialog = false">Fechar</v-btn>
      </v-card-actions>
     </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TestList from './TestList'
import classService from '../../services/classService'
import baseService from '../../services/baseService'

export default {
  name: 'TestsDialog',
  components: {
    TestList
  },
  data () {
    return {
      dialog: false,
      loading: false,
      currentClass: {}
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      let id = classService.getClass()
      baseService.get(`/class/${id}`).then((r) => {
        this.currentClass = r.data
      })
    }
  }
}
</script>

<style lang="css" scoped >

</style>
