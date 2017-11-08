<template>
  <div class="my-test-table">
    <v-card height="35vh">
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
export default {
  name: 'my-test-table',
  props: ['students', 'room'],
  data: () => ({
    headers: [
      {text: 'ID', value: 'id', align: 'center'},
      {text: 'Nome', value: 'name', align: 'center'},
      {text: 'Status', value: '', align: 'center'}
    ]
  }),
  methods: {
    statusStudent (status) {
      if (status === 0) {
        return 'Ausente'
      } else if (status === 1) {
        return 'Em Progresso'
      } else if (status === 2) {
        return 'Não Corrigido'
      } else if (status === 3) {
        return 'Corrigido'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-test-table
  overflow-y scroll

</style>
