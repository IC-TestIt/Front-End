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
import baseService from '../../services/baseService'
import auth from '../../auth'
import testGroup from './TestGroup.vue'
import {FluentFilterService} from '../../utils/filter'
import {isTodayOrBefore, isTomorrow, isInThisWeek, isInNextWeeks, momentDate} from '../../utils/date'

export default {
  name: 'testList',
  components: {
    testGroup
  },
  data () {
    return {
      tests: [],
      todayTests: [{header: 'Em Andamento'}],
      thisWeekTests: [{header: 'Esta Semana'}],
      tomorrowTests: [{header: 'Amanhã'}],
      nextTests: [{header: 'Próximas Semanas'}]
    }
  },
  methods: {
    get () {
      let id = auth.studentId()
      baseService.get(`/student/${id}/dashboard`).then((r) => {
        this.tests = r.data.tests
        new FluentFilterService(this, this.tests, momentDate, 'beginDate')
          .addFilter('todayTests', isTodayOrBefore)
          .addFilter('tomorrowTests', isTomorrow)
          .addFilter('thisWeekTests', isInThisWeek)
          .addFilter('nextTests', isInNextWeeks)
          .filter()
      })
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
