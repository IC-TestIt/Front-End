<template lang="html">
  <v-layout column class="ml-3">
    <v-flex xs12>
      <div class="my-3 px-2 title" height="165px">Enunciado da Questão
        <p class="px-3 py-2 body-1 primary--text" box multi-line disabled>{{currentQuestion.description}}</p>
      </div>
    </v-flex>
    <v-flex xs12>
     <div height="165px"class="title px-2 my-3">
       Resposta do Aluno
       <p v-if="currentQuestion.correctEssayAnswer !== null" class="px-3 py-2 body-1" box multi-line disabled>{{currentQuestion.studentAnswer}}</p>
       <div v-if="currentQuestion.correctEssayAnswer === null" v-for="alternative in currentQuestion.alternatives" :key="alternative.key">
         <span>
           <v-icon class="pa-2" v-if="alternative.id !== currentQuestion.studentAlternative">
             panorama_fish_eye
           </v-icon>
           <v-icon class="pa-2" v-if="alternative.id === currentQuestion.studentAlternative">
             highlight_off
           </v-icon>
           <span :class="isCorrect(alternative, currentQuestion.studentAlternative)">{{alternative.description}}</span>
         </span>
       </div>
     </div>
    </v-flex>
    <v-flex xs12 v-if="showAnswer">
      <div height="200px" class="title px-2 my-4" >
          Resposta do Professor
        <p  v-if="currentQuestion.correctEssayAnswer !== null" class="px-3 py-2 body-1 green-text" box multi-line disabled>{{currentQuestion.correctEssayAnswer}}</p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Answers',
  props: ['currentQuestion', 'showAnswer'],
  methods: {
    isCorrect (alternative, answer) {
      let base = 'px-3 py-2 body-1'
      if (alternative.isCorrect) {
        return `${base} green--text`
      } else if (!alternative.isCorrect && alternative.id === answer) {
        return `${base} red--text`
      } else {
        return `${base}`
      }
    }
  }
}
</script>

<style lang="stylus" scoped >
.test-correction
  min-height 100%
  min-width 100%
  margin-right 5vw

.arrow-button
  width: 10%;

.bold
  font-weight: bold;

.menu
  overflow hidden

.title
  color #000


.card2
  overflow hidden

</style>
