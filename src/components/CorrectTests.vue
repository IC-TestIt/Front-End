<template>
  <div class="correct-tests">
    <v-container fluid grid-list-md>
      <v-layout column justify-center class="ml-5">
        <v-flex d-flex xs12>
          <h1 class="title text-xs-center">Corrigir Prova</h1>
        </v-flex>
        <v-flex d-flex xs12 class="ml-5">
          <v-card height="60px" class="card2">
            <v-layout row>
              <v-flex d-flex xs2>
                <v-menu offset-y absolute class="ml-2 mt-1">
                   <v-btn class="indigo darken-4" dark slot="activator">QUESTÕES</v-btn>
                   <v-list>
                   <v-list-tile v-for="item in questions" :key="item.title">
                   <v-list-tile-title @click="changeQuestion(item)" :class="statusQuestion(item)">{{ item.description }}</v-list-tile-title>
                   </v-list-tile>
                   </v-list>
                </v-menu>
              </v-flex>
              <v-flex xs1 class="mt-2">
                <v-btn flat icon class="indigo darken-4"dark @click="previousStudent()">
                  <v-icon center dark>keyboard_arrow_left</v-icon>
                </v-btn>
              </v-flex>
              <v-flex d-flex xs4 class="">
                <v-text-field disabled label="Aluno" :value="currentStudent.name"></v-text-field>
              </v-flex>
              <v-flex xs1 class="mt-2">
                <v-btn flat icon class="indigo darken-4" dark @click="nextStudent()">
                  <v-icon center dark>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-flex>
              <v-flex d-flex xs2 class="ml-2 mt-4 mb-3">
                <p>Alunos Restantes: {{indexStudent + 1}} / {{students.length}}</p>
              </v-flex>
              <v-flex d-flex xs3 class="mt-2 mr-3 mb-2">
               <v-layout row justify-center>
                <v-btn class="green darken-1" dark @click.stop="dialog2 = true">Finalizar Correção</v-btn>
                <v-dialog v-model="dialog2" persistent max-width="290">
                    
                 <v-card>
                  <v-card-title class="headline red--text">Atenção</v-card-title>
                  <v-card-text v-show="!allCorrect()" class="subheading" >Você ainda não corrigiu a prova inteira! </v-card-text>
                  <v-card-text v-show="allCorrect()" class="subheading" >Você tem certeza que deseja finaliza a correção? </v-card-text>
                  <v-card-actions v-show="!allCorrect()">
                   <v-spacer></v-spacer>
                    <v-btn class="green--text" center flat @click="dialog2 = false">Cancelar</v-btn>
                  </v-card-actions>
                  <v-card-actions v-show="allCorrect()">
                    <v-spacer></v-spacer>
                      <v-btn class="green--text" flat @click.native="dialog2 = false">Não</v-btn>
                      <v-btn class="green--text" flat @click="correctExams()" :loading="finalizeLoading">Sim</v-btn>
                  </v-card-actions>
                 </v-card>
                </v-dialog>
               </v-layout>
              </v-flex>             
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 class="ml-1">
          <v-card class="ml-5 card" height="360px">
            <v-layout row>
              <v-flex xs6>
                <v-layout column class="ml-3">                
                  <v-flex xs12>

                    <div class="my-3 px-2 title" height="165px">Enunciado da Questão
                        <p class="px-3 py-2 body-1 primary--text" box multi-line disabled label="" >{{currentQuestion.description}}</p>
                    </div>
                  </v-flex>                               
                  <v-flex xs12>
                   <div height="165px"class="title px-2 my-3">
                     Resposta do Aluno
                     <p class="px-3 py-2 body-1 red--text" box multi-line disabled>
                     {{currentAnsweredQuestion.studentAnswer}}
                     </p>
                   </div>
                  </v-flex>
                  <v-flex xs12 v-if="showAnswer">
                    <div height="200px" class="title px-2 my-4" >
                        Resposta do Professor
                      <p  class="px-3 py-2 body-1" box multi-line disabled >{{currentQuestion.answer}}</p>                     
                    </div>                   
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs5 class="ml-5">
                <v-layout row wrap class="ml-3">
                  <v-flex xs6>
                    <PercentCard :value="currentAnsweredQuestion.percentCorrect * 100" title="Nota Estimada"></PercentCard>
                  </v-flex>
                  <v-flex xs6 v-if="changeGrade">
                    <PercentCard :value="realGrade" title="Nota Real"></PercentCard>
                  </v-flex>
                  <v-flex xs12 class="mt-2 py-2">
                    <v-layout row wrap>
                      <v-flex xs5>
                        <v-checkbox color="indigo darken-4" v-bind:label="`Mostrar Reposta`" v-model="showAnswer" light></v-checkbox>
                      </v-flex>
                      <v-flex xs5>
                        <v-checkbox color="indigo darken-4" class="" v-bind:label="`Alterar Nota`" v-model="changeGrade" light></v-checkbox>
                      </v-flex>
                      <v-flex xs3>
                        <v-switch @change="updateState()" label="Corrigida" v-model="corrected" color="indigo darken-4" hide-details></v-switch>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 v-if="changeGrade">
                    <v-layout row>
                      <v-flex xs9>
                        <v-slider label="%" :max="100" v-model="realGrade"></v-slider>
                      </v-flex>
                      <v-flex xs2>
                        <v-text-field v-model="realGrade" type="number"></v-text-field>
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
import PercentCard from './PercentCard'
import examService from '../services/examService'
import testService from '../services/testService'
import baseService from '../services/baseService'

export default {
  name: 'CorrectTests',
  components: {
    PercentCard
  },
  data () {
    return {
      dialog2: false,
      indexStudent: 0,
      id: 1,
      changeGrade: false,
      realGrade: 0,
      exams: [],
      test: {},
      finalizeLoading: false,
      currentQuestion: {},
      currentAnsweredQuestion: {},
      currentStudent: {},
      currentExam: {},
      students: [],
      answeredQuestions: [],
      dialog: false,
      hidden: false,
      showAnswer: false,
      corrected: false,
      questions: [],
      classObj: (grade) => {
        let cssClass = 'white--text mt-3 text-xs-center'
        if (grade <= 40) {
          return `red ${cssClass}`
        } else if (grade <= 60) {
          return `orange ${cssClass}`
        } else {
          return `green darken-1 ${cssClass}`
        }
      }
    }
  },
  mounted () {
    this.getExams()
    this.getTest()
    this.currentStudent = this.students[0]
    this.currentQuestion = this.questions[0]
    this.currentAnsweredQuestion = this.answeredQuestions[0]
  },
  methods: {
    correctExams () {
      this.finalizeLoading = true
      this.exams = this.exams.map((r) => {
        return {
          id: r.examId,
          answeredQuestions: r.answeredQuestions
        }
      })
      this.exams.forEach((r) => {
        r.answeredQuestions = r.answeredQuestions.map((a) => {
          let g = 0.0
          if (a.changeGrade) {
            g = a.realGrade / 100.0
          } else {
            g = a.percentCorrect
          }
          return {
            id: a.id,
            grade: g,
            corrected: a.corrected
          }
        })
      })
      let correction = {
        corrections: this.exams
      }
      baseService.put(`exam/correction`, correction).then((res) => {
        if (res.status === 200 && res.data !== 0) {
          this.$toastr('success', {position: 'toast-top-right', msg: 'Correção finalizada com sucesso'})
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao finalizar a correção'})
        }
        this.finalizeLoading = false
      })
    },
    getTest () {
      this.test = testService.getTest()
      this.questions = this.test.questions
    },
    isQuestionCorrected (item) {
      let answered = []
      this.exams.forEach((elem) => {
        answered.push(elem.answeredQuestions.find((r) => r.questionId === item.id))
      })
      return answered.every((r) => r.corrected)
    },
    statusQuestion (item) {
      if (this.isQuestionCorrected(item)) {
        return `question-corrected`
      } else {
        return ``
      }
    },
    changeQuestion (question) {
      this.currentQuestion = question
      this.updateState()
    },
    nextStudent () {
      if (this.indexStudent < (this.students.length - 1)) {
        this.indexStudent++
      }
      this.currentStudent = this.students[this.indexStudent]
      this.updateState()
    },
    previousStudent () {
      if (this.indexStudent > 0) {
        this.indexStudent--
      }
      this.currentStudent = this.students[this.indexStudent]
      this.updateState()
    },
    getExams () {
      let answered = []
      this.exams = examService.getExams()
      this.students = this.exams.map((r) => {
        return {
          name: r.studentName,
          id: r.studentId
        }
      })
      this.exams.forEach((r) => {
        answered = answered.concat(r.answeredQuestions)
      })
      answered.forEach((r) => {
        r.realGrade = 0
        r.changeGrade = false
      })
      this.answeredQuestions = answered
      this.currentExam = this.exams[0]
    },
    updateState () {
      this.currentAnsweredQuestion.corrected = this.corrected
      this.currentAnsweredQuestion.changeGrade = this.changeGrade
      this.currentAnsweredQuestion.realGrade = this.realGrade
      this.currentExam = this.exams.find((r) => r.studentId === this.currentStudent.id)
      this.currentAnsweredQuestion = this.currentExam.answeredQuestions.find((r) => r.questionId === this.currentQuestion.id)
      this.corrected = this.currentAnsweredQuestion.corrected
      this.changeGrade = this.currentAnsweredQuestion.changeGrade
      this.realGrade = this.currentAnsweredQuestion.realGrade
    },
    allCorrect () {
      return this.exams.every((exam) => {
        return exam.answeredQuestions.every((item) => item.corrected)
      })
    }
  }
}
</script>

<style lang="css">
.correct-tests{
  min-height: 100%;
  min-width: 100%;
}

.arrow-button {
  width: 10%;
}

.bold {
  font-weight: bold;
}

.menu {
  overflow: hidden;
}

.title {
  color: #000;
}

.card {
  overflow-y: auto;
  overflow-x: hidden;
}

.card2 {
  overflow: hidden;
}

#btn__hide{
  background-color: #a20021;
  margin-left: 533px;
}


p{
  height: 90px;
  font-style: sans-serif;
  text-align: justify;

}

.question-corrected {
  text-decoration: line-through;
}



</style>
