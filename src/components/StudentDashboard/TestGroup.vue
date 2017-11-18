<template>
  <v-card class="elevation-4 primary--border ">
    <v-list two-line>
      <div v-for="(item, index) in list" :key="item.classTestId">
        <template>
          <v-subheader v-if="item.header" v-text="item.header" class="primary--text bold"></v-subheader>
          <v-list-tile v-else>
            <v-list-tile-content class="test-item">
              <v-list-tile-title v-html="`Prova: ${item.name} - Turma: ${item.className} -  Data Final: ${item.endDate}`" class="mt-4"></v-list-tile-title>
              <v-btn class="success mt-3" :loading="loading" @click="realizeExam(item.classTestId)">Realizar</v-btn>
            </v-list-tile-content>
          </v-list-tile>
          <p class="pl-1 pb-4 ml-3 item-title" v-if="item.name === undefined">Nenhuma prova neste período</p>
          <v-divider v-if="!item.header || list.lenght > index"></v-divider>
        </template>
      </div>
    </v-list>
  </v-card>
</template>

<script>
import baseService from '../../services/baseService'
import auth from '../../auth'

export default {
  name: 'testGroup',
  props: ['list'],
  data () {
    return {
      loading: false
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
