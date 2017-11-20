<template lang="html">
  <div class="my-class">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <class-header :currentClass="currentClass"></class-header>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <students-table height="55vh" :students="students"></students-table>
        </v-flex>
      </v-layout>
      <v-layout row justify-end>
        <v-flex xs1>
          <v-btn class="primary button-back" dark @click="back()">Voltar</v-btn>
        </v-flex>
        <v-flex xs1>
          <tests-dialog :currentClass="currentClass"></tests-dialog>
        </v-flex>
        <v-flex xs2>
          <student-form-dialog :classId="classId" :students="students"></student-form-dialog>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import StudentsTable from './StudentsTable'
import ClassHeader from './Header'
import StudentFormDialog from './StudentFormDialog'
import classService from '../../services/classService'
import baseService from '../../services/baseService'
import TestsDialog from './TestsDialog'
export default {
  name: 'MyClass',
  components: {
    StudentsTable,
    ClassHeader,
    TestsDialog,
    StudentFormDialog
  },
  data () {
    return {
      classId: 1,
      currentClass: {},
      students: []
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      this.classId = classService.getClass()
      baseService.get(`/class/${this.classId}`).then((r) => {
        this.currentClass = r.data
        this.students = r.data.students
      })
    },
    back () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-class
  height 100vh
  width 120vw;

</style>
