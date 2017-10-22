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
                   <v-list-tile-title @click="changeQuestion(item)">{{ item.description }}</v-list-tile-title>
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
                <v-btn class="indigo darken-4" dark @click="correctExams()">Corrigir</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 class="ml-1">
          <v-card class="ml-5 card" height="350px">
            <v-layout row>
              <v-flex xs6>
                <v-layout column class="ml-3">
                  <v-flex xs12>
                    <v-text-field box multi-line disabled label="Enunciado da Questão" :value="currentQuestion.description"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field box multi-line disabled label="Resposta do Aluno" :value="currentAnsweredQuestion.studentAnswer"></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-if="showAnswer">
                    <v-text-field box multi-line disabled label="Resposta do Professor" :value="currentQuestion.answer"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs5 class="ml-5">
                <v-layout row wrap class="ml-3">
                  <v-flex xs6>
                    <v-card :class="classObj(currentAnsweredQuestion.percentCorrect)">
                      <v-card-title primary-title>
                        <v-flex xs6>
                          <div class="headline bold">{{ currentAnsweredQuestion.percentCorrect * 100 }}%</div>
                        </v-flex>
                        <v-flex xs6>
                          <div class="bold">Nota Estimada</div>
                        </v-flex>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                  <v-flex xs6 v-if="currentAnsweredQuestion.changeGrade">
                    <v-card :class="classObj(currentAnsweredQuestion.realGrade)">
                      <v-card-title primary-title>
                        <v-flex xs6>
                          <div class="headline bold">{{currentAnsweredQuestion.realGrade}}%</div>
                        </v-flex>
                        <v-flex xs6>
                          <div class="bold">Nota Real</div>
                        </v-flex>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 class="mt-2 py-2">
                    <v-layout row wrap>
                      <v-flex xs5>
                        <v-checkbox v-bind:label="`Mostrar Reposta`" v-model="showAnswer" light></v-checkbox>
                      </v-flex>
                      <v-flex xs5>
                        <v-checkbox v-bind:label="`Alterar Nota`" v-model="currentAnsweredQuestion.changeGrade" light></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 v-if="currentAnsweredQuestion.changeGrade">
                    <v-layout row>
                      <v-flex xs9>
                        <v-slider label="%" :max="100" v-model="currentAnsweredQuestion.realGrade"></v-slider>
                      </v-flex>
                      <v-flex xs2>
                        <v-text-field v-model="currentAnsweredQuestion.realGrade" type="number"></v-text-field>
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
import examService from '../services/examService'
import testService from '../services/testService'
import baseService from '../services/baseService'

export default {
  name: 'CorrectTests',
  data () {
    return {
      indexStudent: 0,
      exams: [],
      test: {},
      currentQuestion: {},
      currentAnsweredQuestion: {},
      currentStudent: {},
      currentExam: {},
      students: [],
      answeredQuestions: [],
      dialog: false,
      hidden: false,
      showAnswer: false,
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
      this.exams = this.exams.map((r) => {
        return {
          id: r.examId,
          answeredQuestions: r.answeredQuestions.map((r) => {
            let g = 0
            if (r.changeGrade) {
              g = r.realGrade / 100
            } else {
              g = r.percentCorrect
            }
            return {
              id: r.id,
              grade: g
            }
          })
        }
      })
      baseService.put(`exam/correction`, this.exams).then((r) => {
        console.log(r)
      })
    },
    getTest () {
      this.test = testService.getTest()
      this.questions = this.test.questions
    },
    changeQuestion (question) {
      this.currentQuestion = question
      this.currentAnsweredQuestion = this.currentExam.answeredQuestions.find((r) => r.questionId === this.currentQuestion.id)
    },
    nextStudent () {
      if (this.indexStudent < (this.students.length - 1)) {
        this.indexStudent++
      }
      this.currentStudent = this.students[this.indexStudent]
      this.currentExam = this.exams.find((r) => r.studentId === this.currentStudent.id)
      this.currentAnsweredQuestion = this.currentExam.answeredQuestions.find((r) => r.questionId === this.currentQuestion.id)
    },
    previousStudent () {
      if (this.indexStudent > 0) {
        this.indexStudent--
      }
      this.currentStudent = this.students[this.indexStudent]
      this.currentExam = this.exams.find((r) => r.studentId === this.currentStudent.id)
      this.currentAnsweredQuestion = this.currentExam.answeredQuestions.find((r) => r.questionId === this.currentQuestion.id)
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
      console.log(answered)
      answered.forEach((r) => {
        r.realGrade = 0
        r.changeGrade = false
      })
      this.answeredQuestions = answered
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


</style>
