<template lang="html">
  <div class="test-correction">
    <v-container fluid grid-list-md>
      <v-layout column justify-center class="ml-5">
        <v-layout row>
          <v-flex d-flex xs9>
            <h1 class="title text-xs-center">Correção da Prova</h1>
          </v-flex>
          <v-flex d-flex xs3>
            <grade-card :value="exam.grade" title="Nota da Prova"></grade-card>
          </v-flex>
        </v-layout>
        <v-flex d-flex xs12 class="ml-5">
          <v-card height="60px" class="card2">
            <v-layout row>
              <v-flex xs1 class="mt-2">
                <v-btn flat icon class="indigo darken-4"dark @click="previousQuestion()">
                  <v-icon center dark>keyboard_arrow_left</v-icon>
                </v-btn>
              </v-flex>
              <v-flex d-flex xs4 class="">
                <v-text-field disabled label="Questão" :value="currentQuestion.description"></v-text-field>
              </v-flex>
              <v-flex xs1 class="mt-2">
                <v-btn flat icon class="indigo darken-4" dark @click="nextQuestion()">
                  <v-icon center dark>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 class="ml-1">
          <v-card class="ml-5 card" height="350px">
            <v-layout row>
              <v-flex xs8>
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
                      <p  v-if="currentQuestion.correctEssayAnswer !== null" class="px-3 py-2 body-1 green--text" box multi-line disabled>{{currentQuestion.correctEssayAnswer}}</p>
                      <div v-if="currentQuestion.correctEssayAnswer === null" v-for="alternative in currentQuestion.alternatives" :key="alternative.key">
                        <span>
                          <v-icon class="pa-2" v-if="!alternative.isCorrect">
                            panorama_fish_eye
                          </v-icon>
                          <v-icon class="pa-2" v-if="alternative.isCorrect">
                            highlight_off
                          </v-icon>
                          <span class="px-3 py-2 body-1">{{alternative.description}}</span>
                        </span>
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs5 class="ml-5 mt-3">
                <v-layout row wrap class="ml-3">
                  <v-flex xs6>
                    <grade-card :value="currentQuestion.grade" title="Nota da Questão"></grade-card>
                  </v-flex>
                  <v-flex xs12 class="mt-2 py-2">
                    <v-layout row wrap>
                      <v-flex xs5>
                        <v-checkbox color="indigo darken-4" :label="`Mostrar Reposta`" v-model="showAnswer" light></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import baseService from '../../services/baseService'
import examService from '../../services/examService'
import GradeCard from './GradeCard'
export default {
  name: 'TestCorrection',
  components: {
    GradeCard
  },
  data () {
    return {
      examId: 0,
      exam: {},
      questions: [],
      currentQuestion: {},
      questionIndex: 0,
      showAnswer: false
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      this.examId = examService.getExamId()
      baseService.get(`exam/${this.examId}/correction`).then((r) => {
        if (r.status === 200) {
          this.exam = r.data
          this.questions = this.exam.answers
          this.currentQuestion = this.questions[0]
        }
      })
    },
    nextQuestion () {
      if ((this.questionIndex + 1) < this.questions.length) {
        this.questionIndex++
      }
      this.currentQuestion = this.questions[this.questionIndex]
    },
    previousQuestion () {
      if (this.questionIndex > 0) {
        this.questionIndex--
      }
      this.currentQuestion = this.questions[this.questionIndex]
    },
    isCorrect (alternative, answer) {
      let base = 'px-3 py-2 body-1'
      if (alternative.isCorrect && alternative.id === answer) {
        return `${base} green--text`
      } else if (alternative.isCorrect) {
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

.card
  overflow-y auto
  overflow-x hidden

.card2
  overflow hidden

</style>
