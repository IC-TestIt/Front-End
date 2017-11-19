<template>
  <v-card class="elevation-1 primary--border mr-5 mb-3">
    <v-list two-line>
      <div v-for="(item, index) in list" :key="item.classTestId">
        <template>
          <v-subheader v-if="item.header" v-text="item.header" class="primary--text bold"></v-subheader>
          <v-list-tile v-else>
            <v-list-tile-content class="test-item">
              <v-list-tile-title v-html="`Prova: ${item.testTitle} - Turma: ${item.className} -  Data Final: ${formatDate(item.endDate)}`" class="mt-4"></v-list-tile-title>
              <v-btn class="success mt-3 mr-5" :loading="loading" @click="getClassTest(item.classTestId, item.status)">Visualizar</v-btn>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="!item.header || list.lenght > index"></v-divider>
        </template>
      </div>
    </v-list>
    <p class="pl-1 pb-4 ml-3 item-title" v-if="list.length <= 1">Nenhuma prova neste grupo</p>
  </v-card>
</template>

<script>
import {formatDate} from '../../utils/date'
import baseService from '../../services/baseService'
import classTestService from '../../services/classTestService'

export default {
  name: 'testGroup',
  props: ['list'],
  data () {
    return {
      loading: false,
      formatDate: formatDate
    }
  },
  methods: {
    getClassTest (id, status) {
      if (status === 4) {
        baseService.get(`/classtests/${id}/correction`).then((r) => {
          this.saveClassTest(r, status)
        })
      } else if (status === 3) {
        baseService.get(`/classtests/${id}`).then((r) => {
          this.saveClassTest(r, status)
        })
      } else if (status === 2) {
        baseService.get(`/classtests/${id}`).then((r) => {
          this.saveClassTest(r, status)
        })
      }
    },
    saveClassTest (r, status) {
      if (r.status === 200) {
        classTestService.saveClassTest(r.data)
        classTestService.saveClassTestStatus(status)
      }
      this.$router.push('/minhaprova')
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
