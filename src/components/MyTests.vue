<template>
    <div class="my-tests">
        <v-layout row wrap>
            <v-flex xs12>
                <h3 class="my-tests-title text-xs-center ma-1 pt-4">Minhas Provas</h3>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="green darken-1 white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">{{this.tests.length}}</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3 ">Total de Provas</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="indigo lighten-1 white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">0</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3">Provas Aplicadas</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="orange darken-1 white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">0</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3">Provas Pendentes</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>

            <v-flex xs0 md12 class="mr-5 ml-5 pa-1">
                  <v-btn
                    fab
                    small
                    class="red mr-3"
                    right
                    absolute
                    dark
                    @click="change(items.link)"
                  >
                    <v-icon>add</v-icon>
            </v-btn>
                <v-data-table
                    v-bind:headers="headers"
                    :items="tests"
                    hide-actions
                    class="white elevation-1"
                >

                    <template slot="items" scope="props">
                        <td class="text-xs-center" >{{ props.item.title }}</td>
                        <td class="text-xs-center">{{ props.item.description }}</td>
                        <td class="text-xs-center mytests-buttons" >
                            <v-dialog v-model="dialog" persistent hide-overlay>
                                <v-btn primary dark slot="activator" @click.native="dialog = true" v-if="props.item.status === 0">Aplicar</v-btn>

                                <v-card>
                                    <v-card-title>Selecione a Turma</v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text style="height: 300px">
                                        <v-select
                                        v-bind:items="classes"
                                        v-model="test.classIds"
                                        label="Turma"
                                        multiple
                                        chips
                                        item-text="description"
                                        item-value="id"
                                        return-object
                                        ></v-select>
                                        <v-text-field v-model="test.beginDate" label="Data de Inicio" type="date" class="input-group--focused"></v-text-field>
                                        <v-text-field v-model="test.endDate" label="Data Final" type="date" class="input-group--focused"></v-text-field>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Fechar</v-btn>
                                        <v-btn class="blue--text darken-1" flat @click.native="save(props.item.id)" :loading="loading">Salvar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-btn secondary v-if="props.item.status === 0">Editar</v-btn>
                            <v-btn secondary v-if="props.item.status === 0">Exportar</v-btn>
                            <v-btn secondary v-if="props.item.status === 2">Corrigir</v-btn>
                            <v-btn secondary v-if="props.item.status === 3">Notas</v-btn>
                            <v-btn secondary v-if="props.item.status === 0">Excluir</v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import baseService from '../services/baseService'
import auth from '../auth'

export default {
  name: 'CreateTest',
  data () {
    return {
      items: [
        {
          link: '/#/prova'
        }
      ],
      dialog: false,
      loading: false,
      tests: [],
      test: {
        classIds: [],
        beginDate: null,
        endDate: null
      },
      menuBegin: false,
      menuEnd: false,
      classes: [],
      headers: [
        {text: 'Título', value: 'title', align: 'center'},
        {text: 'Descrição', value: 'description', align: 'center'},
        {text: 'Ações', value: '', align: 'center'}
      ]
    }
  },
  mounted () {
    this.getTests()
    this.getClasses()
  },
  methods: {
    getTests () {
      console.log(auth.teacherId())
      baseService.get(`/teacher/${auth.teacherId()}/tests`).then(r => {
        if (r.status === 200) {
          console.log(r.data)
          this.tests = r.data
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro na obtenção das provas!'})
        }
      })
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
    save (id) {
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
    },
    change () {
      this.$router.push('/prova')
    }
  }
}
</script>

<style lang="css">
.my-tests-title {
  color: #006;
}

.mytests-buttons {
    display: flex;
    justify-content: space-around;
}

.my-tests {
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
