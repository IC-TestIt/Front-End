<template>
  <div class="my-corrected-test">
    <v-container grid-list-md fluid>
      <MyTestHeader :test="test"></MyTestHeader>
      <v-layout row>
        <v-flex xs12>
          <v-card height="25vh" class="graphic-card">
            <v-card-title primary-title>
              <v-flex xs10>
                <div><students-grade-graphic :students="test.students"></students-grade-graphic></div>
              </v-flex>
              <v-flex xs2>
                <div>Notas dos Alunos</div>
              </v-flex>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6>
          <v-card height="35vh" class="graphic-card">
            <v-card-title primary-title>
              <v-flex xs10>
                <div><average-questions-graphic :questions="test.questions"></average-questions-graphic></div>
              </v-flex>
              <v-flex xs2>
                <div>Media Por Questões </div>
              </v-flex>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <MyTestTable :students="test.students" :room="test.className"></MyTestTable>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import MyTestHeader from './MyTestHeader'
import MyTestTable from './MyTestTable'
import StudentsGradeGraphic from './StudentsGradeGraphic'
import AverageQuestionsGraphic from './AverageQuestionsGraphic'
import ClassTestService from '../services/classTestService'

export default {
  name: 'my-corrected-test',
  components: {
    MyTestHeader,
    MyTestTable,
    StudentsGradeGraphic,
    AverageQuestionsGraphic
  },
  data: () => ({
    test: null
  }),
  mounted () {
    this.getClassTest()
    this.getStudentsGrade()
    this.getAverageQuestions()
  },
  methods: {
    getClassTest () {
      this.test = ClassTestService.getClassTest()
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-corrected-test
  width 95vw
  max-width 95vw

.graphic-card
  overflow-y hidden
  overflow-x scroll

</style>
