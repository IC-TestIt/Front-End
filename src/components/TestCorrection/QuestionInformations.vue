<template lang="html">
  <v-layout row wrap class="ml-3">
    <v-flex xs12 class="mr-3">
      <grade-card :value="currentQuestion.grade" height="20vh" title="Nota da Questão"
                  titleSize="headline text-xs-center bold" valueSize="display-3 text-xs-center bold"></grade-card>
    </v-flex>
    <v-flex xs12 class="mt-2 py-2">
      <v-layout row wrap>
        <v-flex xs5>
          <v-checkbox v-if="currentQuestion.correctEssayAnswer !== null" @change="teacherAnswer()" color="indigo darken-4" :label="`Mostrar Reposta`" v-model="showAnswer" light></v-checkbox>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>

import GradeCard from './GradeCard'
export default {
  name: 'questionInformations',
  props: ['currentQuestion'],
  components: {
    GradeCard
  },
  data () {
    return {
      showAnswer: false
    }
  },
  methods: {
    teacherAnswer () {
      this.$emit('show-teacher-answer', this.showAnswer)
    }
  }
}
</script>

<style lang="css" scoped >

</style>
