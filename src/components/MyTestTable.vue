<template>
  <div class="my-test-table">
    <v-card :height="height" class="table-test">
      <v-card-title>
        <div class="text-xs-center">Lista de Alunos da Turma</div>
      </v-card-title>
      <v-data-table :headers="headers" :items="students" hide-actions class="elevation-1">
        <template slot="items" scope="props">
          <td class="text-xs-center">{{ props.item.studentIdentifier }}</td>
          <td class="text-xs-center">{{ props.item.studentName }}</td>
          <td class="text-xs-center">{{ statusStudent(props.item.status) }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { statusStudent } from '../utils/constants'
export default {
  name: 'my-test-table',
  props: ['students', 'room', 'height'],
  data: () => ({
    statusStudent: statusStudent,
    headers: [
      {text: 'ID', value: 'id', align: 'center'},
      {text: 'Nome', value: 'name', align: 'center'},
      {text: 'Status', value: '', align: 'center'}
    ]
  }),
  mounted () {
    this.getHeight()
  },
  methods: {
    getHeight () {
      if (this.height === undefined) {
        this.height = '35vh'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.table-test
  overflow-y scroll

</style>
