<template>
  <v-card height="74vh">
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
import baseService from '../../services/baseService'
import moment from 'moment'
import auth from '../../auth'
import {isToday, isYesterday, isWithinAWeek, isTwoWeeksOrMore} from '../../utils/date'

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
        this.todayTests = this.todayTests.concat(r.data.recentTests.filter((item) => {
          return isToday(moment(new Date(item.endDate)))
        }))
        this.yesterdayTests = this.yesterdayTests.concat(r.data.recentTests.filter(item => {
          return isYesterday(moment(new Date(item.endDate)))
        }))
        this.thisWeekTests = this.thisWeekTests.concat(r.data.recentTests.filter(item => {
          return isWithinAWeek(moment(new Date(item.endDate)))
        }))
        this.olderTests = this.olderTests.concat(r.data.recentTests.filter(item => {
          return isTwoWeeksOrMore(moment(new Date(item.endDate)))
        }))
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
