<template>
  <v-card height="74vh" class="test-list elevation-0">
    <test-group v-if="appliedTests" :list="appliedTests"></test-group>
    <test-group v-if="uncorrectedTests" :list="uncorrectedTests"></test-group>
    <test-group v-if="correctedTests" :list="correctedTests"></test-group>
  </v-card>
</template>

<script>
import testGroup from './TestGroup.vue'
import {FluentFilterService} from '../../utils/filter'
import {isApplied, isUncorrected, isCorrected} from '../../utils/testStatus'

export default {
  name: 'testList',
  props: ['tests'],
  components: {
    testGroup
  },
  data () {
    return {
      appliedTests: [{header: 'Aplicadas'}],
      uncorrectedTests: [{header: 'Não Corrigidas'}],
      correctedTests: [{header: 'Corrigidas'}]
    }
  },
  methods: {
    get () {
      new FluentFilterService(this, this.tests, parseInt, 'status')
        .addFilter('appliedTests', isApplied)
        .addFilter('uncorrectedTests', isUncorrected)
        .addFilter('correctedTests', isCorrected)
        .filter()
    }
  },
  mounted () {
    this.get()
  }
}
</script>

<style lang="stylus">
.test-list
  left 2vw
  overflow-y auto

</style>
