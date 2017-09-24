<template>
  <div id="reviewTest">
    <v-card class="lighten-1 z-depth-1 mb-5 pa-5" height="150px">
      <v-layout align-center="true" justify-center="true">
        <v-flex xs3>
          <v-dialog v-model="dialog" persistent hide-overlay>
            <v-btn class="green darken-1 pa-2" slot="activator" dark>Associar Prova
              <v-icon right dark>compare_arrows</v-icon>
            </v-btn>
            <v-card>
              <v-card-title>Selecione a Turma</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 300px">
                <v-select v-bind:items="classes" v-model="test.classIds" label="Turma" multiple chips item-text="description" item-value="id" return-object></v-select>
                <v-text-field v-model="test.beginDate" label="Data de Inicio" type="date" class="input-group--focused"></v-text-field>
                <v-text-field v-model="test.endDate" label="Data Final" type="date" class="input-group--focused"></v-text-field>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn class="blue--text darken-1" flat @click="dialog = false">Fechar</v-btn>
                <v-btn class="blue--text darken-1" flat @click="save()" :loading="loading">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
        <v-flex xs3>
          <v-btn class="indigo darken-1 pa-2" dark v-on:click="viewTest()">Visualizar Prova
            <v-icon right dark>chrome_reader_mode</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn class="amber darken-1 pa-2" light v-on:click="exportPdf()">Exportar Prova
            <v-icon right dark>get_app</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import baseService from '../services/baseService'
import auth from '../auth'
import pdfService from '../services/pdfService'

export default {
  name: 'reviewTest',
  props: ['testId'],
  data: () => ({
    classes: [],
    dialog: false,
    loading: false,
    test: {
      classIds: [],
      beginDate: null,
      endDate: null
    }
  }),
  mounted () {
    this.getClasses()
  },
  methods: {
    exportPdf: function () {
      baseService.get(`/test/export/${this.testId}`).then(r => {
        let pdf = {'content': r.data}
        pdfService.post(`/pdf`, pdf).then(r => {
          if (r.status === 200) {
            window.open(pdfService.get(), '_blank')
          }
        })
      })
    },
    viewTest () {
      this.$router.push('/verprova/' + this.testId)
    },
    getClasses () {
      baseService.get(`/teacher/${auth.teacherId()}/classes/`).then(r => {
        this.classes = r.data.map(c => {
          return {
            description: c.description,
            id: c.id
          }
        })
      })
    },
    save () {
      let id = this.testId
      this.loading = true
      this.test.classIds = this.test.classIds.map(c => {
        return c.id
      })
      baseService.post(`/test/${id}/classes`, this.test).then(r => {
        if (r.status === 200) {
          this.dialog = false
          this.test = {
            classIds: [],
            beginDate: null,
            endDate: null
          }
          this.loading = false
        }
      })
    }
  }
}
</script>
