<template lang='html'>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs6 class='primary'>
        <class-list :classes='classes'></class-list>
      </v-flex>
      <v-flex xs6>
        <test-list :tests='tests'></test-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ClassList from './ClassList'
import TestList from './TestList'
import baseService from '../../services/baseService'
import auth from '../../auth'
export default {
  name: 'studentDashboard',
  components: {
    ClassList,
    TestList
  },
  data () {
    return {
      classes: [],
      tests: []
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      let id = auth.studentId()
      baseService.get(`/student/${id}/dashboard`).then((r) => {
        if (r.status === 200) {
          this.classes = r.data.classes
          this.tests = r.data.tests
          this.classes.forEach((c) => {
            if (c.correctedStudentTests.length > 0) {
              c.average = c.correctedStudentTests.map((t) => t.grade)
                                                 .reduce((total, g) => (total += g)) / c.correctedStudentTests.length
            }
          })
        }
      })
    }
  }
}
</script>
