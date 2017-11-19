<template>
  <v-card height="74vh" class="test-list">
    <v-flex xs8 class="primary--text display-1 pa-3">
      Próximas provas
    </v-flex>
    <test-group v-if="todayTests.length" :list="todayTests"></test-group>
    <test-group v-if="tomorrowTests" :list="tomorrowTests"></test-group>
    <test-group v-if="thisWeekTests" :list="thisWeekTests"></test-group>
    <test-group v-if="nextTests" :list="nextTests"></test-group>
  </v-card>
</template>

<script>
import testGroup from './TestGroup.vue'
import {FluentFilterService} from '../../utils/filter'
import {isToday, isTomorrow, isInThisWeek, isInNextWeeks, momentDate} from '../../utils/date'

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
      tomorrowTests: [{header: 'Amanhã'}],
      nextTests: [{header: 'Próximas Semanas'}]
    }
  },
  methods: {
    get () {
      new FluentFilterService(this, this.tests, momentDate, 'beginDate')
        .addFilter('todayTests', isToday)
        .addFilter('tomorrowTests', isTomorrow)
        .addFilter('thisWeekTests', isInThisWeek)
        .addFilter('nextTests', isInNextWeeks)
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
