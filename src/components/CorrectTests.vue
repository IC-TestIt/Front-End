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
                <v-btn class="green darken-1" dark @click="correctExams()">Finalizar Correção</v-btn>
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
                        <p class="px-3 py-2 body-1 primary--text" box multi-line disabled label="" :value="currentQuestion.description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                         Excepteur sint occaecat cupidatat non proident, 
                        sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                  </v-flex>                               
                  <v-flex xs12>
                   <div height="165px"class="title px-2 my-3">
                     Resposta do Aluno
                     <p class="px-3 py-2 body-1 red--text" box multi-line disabled :value="currentAnsweredQuestion.studentAnswer">
                     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                     totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                     Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
                     sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                      qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
                     sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                    
                   </div>
                  </v-flex>
                  <v-flex xs12 v-if="showAnswer">
                    <div height="200px" class="title px-2 my-4" >
                        Resposta do Professor
                      <p  class="px-3 py-2 body-1" box multi-line disabled :value="currentQuestion.answer">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                     totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                     Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
                     sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                      qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
                     sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                     
                    </div>
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
                  <v-flex xs6 v-if="changeGrade">
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
                        <v-checkbox class="" v-bind:label="`Alterar Nota`" v-model="changeGrade" light></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 v-if="changeGrade">
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
      id: 1,
      changeGrade: false,
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
            grade: g
          }
        })
      })
      baseService.put(`exam/${this.id}/correction`, this.exams).then((res) => {
        console.log(res)
      })
    },
    getTest () {
      this.test = testService.getTest()
      this.questions = this.test.questions
    },
    changeQuestion (question) {
      this.currentQuestion = question
      this.currentAnsweredQuestion.changeGrade = this.changeGrade
      this.changeGrade = false
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
      this.currentExam = this.exams[0]
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

</style>
