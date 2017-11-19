<template>
  <div class="alternativeQuestion">
    <div v-for="alternative in question.alternatives" :key="alternative.key">
      <v-radio class="alternativeQuestion-alternative" color="primary" @change="answerQuestion()" :label="alternative.description" v-model="realizeQuestion.alternativeId" :value="alternative.id"></v-radio>
    </div>
  </div>
</template>
<script>
export default {
  name: 'alternativeQuestion',
  props: ['question', 'realizeQuestion'],
  methods: {
    answerQuestion () {
      this.$emit('get-alternative', this.realizeQuestion)
    }
  }
}
</script>
