<template>
  <v-card class="elevation-4 primary--border">
    <v-list two-line>
      <div v-for="(item, index) in list" :key="item.classTestId">
        <template>
          <v-subheader v-if="item.header" v-text="item.header" class="primary--text bold"></v-subheader>
          <v-list-tile v-else>
            <v-list-tile-content class="test-item">
              <v-list-tile-title v-html="`${item.testTitle} - ${item.className}`" class="mt-4"></v-list-tile-title>
              <v-btn class="success mt-3" :loading="loading" v-on:click="correctExams(item.classTestId, item.testId)">Corrigir</v-btn>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="!item.header || list.lenght > index"></v-divider>
        </template>
      </div>
    </v-list>
  </v-card>
</template>

<script>
import examService from '../../services/examService'
import testService from '../../services/testService'
import baseService from '../../services/baseService'

export default {
  name: 'testGroup',
  props: ['list'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    correctExams (id, testId) {
      this.loading = true
      let ids = [id]
      baseService.post(`/test/${testId}/correction`, {ids: ids}).then(r => {
        if (r.status === 200) {
          examService.saveExams(r.data.correctedExams)
          testService.saveTest(r.data.test)
        }
        this.loading = false
        this.$router.push('/corrigir')
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
</style>
