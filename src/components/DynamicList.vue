<template>
  <div class="text-xs-center">
    <v-pagination v-bind:length.number="data.length" v-model="index" @next="change" @previous="change" @input="change"></v-pagination>
    <p>
        {{currentQuestion.description}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'dynamic-list',
  data () {
    return {
      index: 1,
      data: [{
        id: 1,
        description: '1 + 1?'
      }, {
        id: 2,
        description: '1 + 2?'
      }],
      currentQuestion: {
        id: 1,
        description: '1 + 1?'
      }
    }
  },
  props: ['list'],
  methods: {
    change () {
      this.currentQuestion = this.data[this.index - 1]
    }
  }
}
</script>
