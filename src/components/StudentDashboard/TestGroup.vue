<template>
  <v-card class="elevation-4 primary--border ">
    <v-list two-line>
      <div v-for="(item, index) in list" :key="item.classTestId">
        <template>
          <v-subheader v-if="item.header" v-text="item.header" class="primary--text bold"></v-subheader>
          <v-list-tile v-else>
            <v-list-tile-content class="test-item">
              <p class="mr-5 pr-5">Prova: {{item.name}} <br/> Turma: {{item.className}} <br/>  Data Final: {{formatDate(item.endDate)}}</p>
              <v-btn class="success mt-3" v-if="isTodayOrBefore(momentDate(item.beginDate))" :loading="loading" @click="realizeExam(item.classTestId)">Realizar</v-btn>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="!item.header || list.lenght > index"></v-divider>
        </template>
      </div>
      <p class="pl-1 pb-4 ml-3 item-title" v-if="list.length <= 1">Nenhuma prova neste período</p>
    </v-list>
  </v-card>
</template>

<script>
import baseService from '../../services/baseService'
import {formatDate, isTodayOrBefore, momentDate} from '../../utils/date'
import auth from '../../auth'

export default {
  name: 'testGroup',
  props: ['list'],
  data () {
    return {
      loading: false,
      formatDate: formatDate,
      isTodayOrBefore: isTodayOrBefore,
      momentDate: momentDate
    }
  },
  methods: {
    realizeExam (id) {
      let exam = {classTestsId: id, studentId: auth.studentId()}
      baseService.post(`/exam`, exam).then(r => {
        this.$router.push('/realizar/' + r.data.examId)
      })
    }
  }
}
</script>

<style>
.test-item {
  display: flex;
  flex-flow: row;
}

.bold {
  font-weight: bold;
}

.item-title {
  font-size: 18px;
}

</style>
