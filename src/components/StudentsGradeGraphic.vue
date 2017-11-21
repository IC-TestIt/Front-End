<template>
  <div class="students-grade-graphic">
    <bar-graphic :chart-data="studentsGrade" :height="height" :width="width"></bar-graphic>
  </div>
</template>
<script>
import BarGraphic from './BarGraphic'
import {compareString} from '../utils/filter'

export default {
  name: 'students-grade-graphic',
  components: {
    BarGraphic
  },
  props: ['students'],
  data: () => ({
    studentsGrade: {
      labels: [],
      datasets: []
    },
    height: '40',
    width: '400'
  }),
  beforeMount () {
    this.getStudentsGrade()
  },
  methods: {
    getStudentsGrade () {
      this.studentsGrade.labels = this.students.sort((a, b) => compareString(a.studentName, b.studentName)).map(r => r.studentName)
      this.studentsGrade.datasets.push({
        label: 'Nota',
        backgroundColor: '#000066',
        data: []
      })
      this.students.forEach((r) => {
        this.studentsGrade.datasets[0].data.push(r.grade)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
