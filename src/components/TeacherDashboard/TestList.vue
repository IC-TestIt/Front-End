<template>
  <v-card height="74vh">
    <v-flex xs8 class="primary--text display-1 pa-3">
      Provas não corrigidas
    </v-flex>
    <test-group v-if="todayTests.length" :list="todayTests"></test-group>
    <test-group v-if="yesterdayTests" :list="yesterdayTests"></test-group>
    <test-group v-if="thisWeekTests" :list="thisWeekTests"></test-group>
    <test-group v-if="olderTests" :list="olderTests"></test-group>
  </v-card>
</template>

<script>
import auth from '../../auth'
import testGroup from './TestGroup.vue'
import baseService from '../../services/baseService'
import {FluentFilterService} from '../../utils/filter'
import {isToday, isYesterday, isWithinAWeek, isTwoWeeksOrMore, momentDate} from '../../utils/date'

export default {
  name: 'testList',
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
      baseService.get(`/teacher/${auth.teacherId()}/dashboard/`).then(r => {
        new FluentFilterService(this, r.data.recentTests, momentDate, 'endDate')
          .addFilter('todayTests', isToday)
          .addFilter('yesterdayTests', isYesterday)
          .addFilter('thisWeekTests', isWithinAWeek)
          .addFilter('olderTests', isTwoWeeksOrMore)
          .filter()
      })
    }
  },
  mounted () {
    this.get()
  }
}
</script>

<style>
.test-list {
  overflow-y: scroll;
  height: 75vh;
  left: 10vw;
}
</style>
