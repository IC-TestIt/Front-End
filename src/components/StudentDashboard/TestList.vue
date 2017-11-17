<template>
  <v-card height="74vh" class="test-list">
    <v-flex xs8 class="primary--text display-1 pa-3">
      Últimas provas
    </v-flex>
    <test-group v-if="todayTests.length" :list="todayTests"></test-group>
    <test-group v-if="yesterdayTests" :list="yesterdayTests"></test-group>
    <test-group v-if="thisWeekTests" :list="thisWeekTests"></test-group>
    <test-group v-if="olderTests" :list="olderTests"></test-group>
  </v-card>
</template>

<script>
import testGroup from './TestGroup.vue'
import {FluentFilterService} from '../../utils/filter'
import {isToday, isYesterday, isWithinAWeek, isTwoWeeksOrMore, momentDate} from '../../utils/date'

export default {
  name: 'testList',
  props: ['tests'],
  components: {
    testGroup
  },
  data () {
    return {
      todayTests: [{header: 'Hoje'}],
      thisWeekTests: [{header: 'Esta Semana'}],
      yesterdayTests: [{header: 'Ontem'}],
      olderTests: [{header: 'Mais antigas'}]
    }
  },
  methods: {
    get () {
      new FluentFilterService(this, this.tests, momentDate, 'endDate')
        .addFilter('todayTests', isToday)
        .addFilter('yesterdayTests', isYesterday)
        .addFilter('thisWeekTests', isWithinAWeek)
        .addFilter('olderTests', isTwoWeeksOrMore)
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
