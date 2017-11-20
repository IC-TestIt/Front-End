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
          <td class="text-xs-center" >
            <v-btn :loading="loading" class="red white--text" title="Deletar" @click="removeStudent(props.item.studentId)">
              Remover
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import baseService from '../../services/baseService'
import classService from '../../services/classService'
export default {
  name: 'students-table',
  props: ['height', 'students'],
  data: () => ({
    headers: [
      {text: 'Identificador', value: 'id', align: 'center'},
      {text: 'Nome', value: 'name', align: 'center'},
      {text: 'Média', value: 'average', align: 'center'},
      {text: 'Ações', value: 'delete', align: 'center'}
    ],
    loading: false
  }),
  mounted () {
    this.getHeight()
  },
  methods: {
    getHeight () {
      if (this.height === undefined) {
        this.height = '35vh'
      }
    },
    removeStudent (id) {
      let classId = classService.getClass()
      this.loading = true
      baseService.del(`/class/${classId}/student/${id}`).then((r) => {
        this.loading = false
        this.$toastr('info', {position: 'toast-top-right', msg: 'Aluno removido da turma com Sucesso'})
      })
      let index = this.students.findIndex((e) => e.studentId === id)
      this.students.splice(index, 1)
    }
  }
}
</script>
<style lang="stylus" scoped>
.table-test
  overflow-y scroll

</style>
