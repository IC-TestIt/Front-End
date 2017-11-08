<template>
  <div class="average-questions-graphic">
    <bar-graphic :chart-data="averageQuestions" :height="height" :width="width"></bar-graphic>
  </div>
</template>
<script>
import BarGraphic from './BarGraphic'

export default {
  name: 'average-questions-graphic',
  components: {
    BarGraphic
  },
  props: ['questions'],
  data: () => ({
    averageQuestions: {
      labels: [],
      datasets: []
    },
    height: '190',
    width: '600'
  }),
  beforeMount () {
    this.getAverageQuestions()
  },
  methods: {
    getAverageQuestions () {
      this.averageQuestions.labels = this.questions.map(r => r.questionOrder)
      this.averageQuestions.datasets.push({
        label: 'Nota',
        backgroundColor: '#000066',
        data: []
      })
      this.questions.forEach((r) => {
        this.averageQuestions.datasets[0].data.push(r.classAverage)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
