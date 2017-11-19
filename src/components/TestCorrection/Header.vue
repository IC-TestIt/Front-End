<template lang="html">
  <v-card height="12vh" justify-center align-center class="card2">
    <v-layout row>
      <v-flex xs1 class="mt-3">
        <v-btn flat icon class="indigo darken-4"dark @click="previousQuestion()">
          <v-icon center dark>keyboard_arrow_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex d-flex xs5 class="mt-2">
        <v-text-field disabled label="Questão" :value="currentQuestion.order + 1"></v-text-field>
      </v-flex>
      <v-flex xs1 class="mt-3">
        <v-btn flat icon class="indigo darken-4" dark @click="nextQuestion()">
          <v-icon center dark>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-flex>
      <v-flex offset-xs4 d-flex xs2>
        <grade-card class="mt-1 mr-2" :value="exam.grade" title="Nota da Prova" titleSize="body-2 text-xs-center" valueSize="title text-xs-center" height="10vh"></grade-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import GradeCard from './GradeCard'
export default {
  name: 'Header',
  props: ['questions', 'currentQuestion', 'exam'],
  components: {
    GradeCard
  },
  data () {
    return {
      questionIndex: 0
    }
  },
  methods: {
    nextQuestion () {
      if ((this.questionIndex + 1) < this.questions.length) {
        this.questionIndex++
      }
      this.$emit('get-current-question', this.questions[this.questionIndex])
    },
    previousQuestion () {
      if (this.questionIndex > 0) {
        this.questionIndex--
      }
      this.$emit('get-current-question', this.questions[this.questionIndex])
    }
  }
}
</script>

<style lang="css" scoped >

</style>
