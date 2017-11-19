<template>
  <div class="students-table">
    <v-card :height="height" class="table-test">
      <v-card-title>
        <div class="ml-5 title text-xs-center">Lista de Alunos da Turma</div>
      </v-card-title>
      <v-data-table :headers="headers" :items="students" hide-actions class="elevation-1">
        <template slot="items" scope="props">
          <td class="text-xs-center">{{ props.item.studentIdentifier }}</td>
          <td class="text-xs-center">{{ props.item.studentName }}</td>
          <td class="text-xs-center">{{ props.item.grade}}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'students-table',
  props: ['students', 'height'],
  data: () => ({
    headers: [
      {text: 'Identificador', value: 'id', align: 'center'},
      {text: 'Nome', value: 'name', align: 'center'},
      {text: 'Média', value: 'average', align: 'center'}
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
