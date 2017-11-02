<template>
  <div class="my-test-table">
    <v-card height="35vh">
      <v-card-title>
        <div>Tabela de Alunos</div>
      </v-card-title>
      <v-data-table :headers="headers" :items="students" hide-actions class="elevation-1">
        <template slot="items" scope="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.status }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'my-test-table',
  props: ['students'],
  data: () => ({
    headers: [
      {text: 'ID', value: 'id', align: 'center'},
      {text: 'Nome', value: 'name', align: 'center'},
      {text: 'Status', value: '', align: 'center'}
    ]
  })
}
</script>
<style lang="stylus" scoped>
</style>
