<template>
  <div class="students-status-table">
    <v-card height="40vh">
      <v-card-title>
        <div>Turma - {{room}}</div>
      </v-card-title>
      <v-data-table :headers="headers" :items="students" hide-actions>
        <template slot="items" scope="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.conclusion }}</td>
          <td class="text-xs-right">{{ props.item.status }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'students-status-table',
  props: ['students', 'room'],
  data: () => ({
    headers: [
      {text: 'ID', value: 'id', align: 'center'},
      {text: 'Nome', value: 'name', align: 'center'},
      {text: 'Conclusão', value: 'conclusion', align: 'center'},
      {text: 'Status', value: '', align: 'center'}
    ]
  })
}
</script>
<style lang="stylus" scoped>
</style>
