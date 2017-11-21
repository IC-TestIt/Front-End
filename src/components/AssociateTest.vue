<template>
  <div class="associateTest">
    <v-dialog v-model="dialog" hide-overlay>
      <v-btn class="green darken-1 pa-2" slot="activator" dark>Aplicar Prova
        <v-icon right dark>compare_arrows</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>Selecione a Turma</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-select :items="classes" v-model="test.classIds" label="Turma" multiple chips item-text="description" item-value="id" return-object></v-select>
          <v-text-field v-model="test.beginDate" label="Data de Inicio" type="date" class="input-group--focused"></v-text-field>
          <v-text-field v-model="test.endDate" label="Data Final" type="date" class="input-group--focused"></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn class="red--text darken-1" flat @click="dialog = false">Fechar</v-btn>
          <v-btn class="success--text darken-1" flat @click="save()" :loading="loading">Aplicar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import auth from '../auth'
import baseService from '../services/baseService'

export default {
  name: 'associateTest',
  props: ['test', 'save'],
  data: () => ({
    dialog: false,
    loading: false,
    classes: []
  }),
  methods: {
    getClasses () {
      baseService.get(`/teacher/${auth.teacherId()}/classes/`).then(r => {
        this.classes = r.data.classes.map(c => {
          return {
            description: c.description,
            id: c.id
          }
        })
      })
    }
  },
  mounted () {
    this.getClasses()
  }
}
</script>
<style lang="scss" scoped>
</style>
