<template>
    <div class="my-tests">
        <v-layout row wrap>
            <v-flex xs12>
                <h3 class="my-tests-title text-xs-center ma-1">Minhas Provas</h3>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="success white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">{{appliedTests}}</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3 ">Provas Em Andamento</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="primary white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">{{this.tests.length}}</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3">Total de Provas</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="warning white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">{{uncorrectedTests}}</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3">Provas Não Corrigidas</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>

            <v-flex xs0 md12 class="mr-5 ml-5 pa-1">
            <v-card class="pb-3 mb-4">
                <v-card-title>
                <v-select
                    :items="items"
                    v-model="search"
                    label="Filtro"
                    item-text="text"
                    item-value="value"
                    multiple
                    chips
                ></v-select>
                <v-spacer></v-spacer>
                </v-card-title>

                <v-data-table
                    :headers="headers"
                    :items="tests"
                    :pagination.sync="pagination"
                    :search="search"
                    :custom-filter="filterStatus"
                    hide-actions
                    class="white"
                >

                    <template slot="items" scope="props">
                        <td class="text-xs-center" >{{ props.item.testTitle }}</td>
                        <td class="text-xs-center">{{ props.item.className }}</td>
                        <td class="text-xs-center">{{ formatDate(props.item.endDate) }}</td>
                        <td class="text-xs-center">{{ findStatus(props.item.status) }}</td>
                        <td class="text-xs-center mytests-buttons" >
                            <v-btn id="aplic"  center  title="Aplicar" @click="applyTest(props.item.testId)" :disabled="props.item.status !== 1">
                              <v-icon :class="[{'white--text': props.item.status === 1 }]">timer</v-icon>
                            </v-btn>

                            <v-dialog v-model="dialog" persistent hide-overlay>

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
                                        <v-btn class="blue--text darken-1" flat @click.native="save(currentTestId)" :loading="loading">Salvar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-btn id="edit" title="Editar" :disabled="props.item.status !== 1">
                              <v-icon :class="[{'white--text': props.item.status === 1 }]">mode_edit</v-icon>
                            </v-btn>
                            <v-btn id="export" title="Exportar" :disabled="props.item.status !== 1">
                              <v-icon :class="[{'white--text': props.item.status === 1 }]">file_download</v-icon>
                            </v-btn>
                            <v-btn id="correct" title="Corrigir" :disabled="props.item.status !== 3" @click="dialog2 = true, filterClassTests(props.item.testId)">
                              <v-icon :class="[{'white--text': props.item.status === 3 }]">check</v-icon>
                            </v-btn>
                            <v-dialog v-model="dialog2" persistent hide-overlay>
                                <v-card>
                                    <v-card-title>Selecione a Turma</v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text style="height: 300px">
                                        <v-select
                                        :items="classTestsFiltered"
                                        v-model="classTestsCorrection"
                                        label="Turma"
                                        multiple
                                        chips
                                        item-text="className"
                                        item-value="classTestId"
                                        return-object
                                        ></v-select>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-btn class="blue--text darken-1" flat @click.native="dialog2 = false">Fechar</v-btn>

                                        <v-btn class="blue--text darken-1" flat :loading="loading" @click="correctExams()">Corrigir</v-btn>

                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <v-btn id="grade" title="Dashboard" :disabled="props.item.status === 1" @click="getClassTest(props.item.classTestId, props.item.status, props.item.testId)" >
                              <v-icon :class="[{'primary white--text': props.item.status !== 1 }]">grid_on</v-icon>
                            </v-btn>

                            <v-btn id="delete" title="Deletar" :disabled="props.item.status !== 1" slot="activator">
                              <v-icon :class="[{'white--text': props.item.status === 1 }]">delete_forever</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
                <div class="text-xs-center pt-2">
                    <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                </div>
            </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import baseService from '../services/baseService'
import auth from '../auth'
import examService from '../services/examService'
import testService from '../services/testService'
import classTestService from '../services/classTestService'
import { formatDate } from '../utils/date'

export default {
  name: 'CreateTest',
  data () {
    return {
      formatDate: formatDate,
      testsLength: 0,
      appliedTests: 0,
      uncorrectedTests: 0,
      classTestsFiltered: [],
      pagination: {
        rowsPerPage: 5
      },
      search: '',
      items: [
        {
          text: 'Não Aplicadas',
          value: 1
        },
        {
          text: 'Em Andamento',
          value: 2
        },
        {
          text: 'Não Corrigidas',
          value: 3
        },
        {
          text: 'Corrigidas',
          value: 4
        }
      ],
      dialog: false,
      dialog2: false,
      loading: false,
      tests: [],
      filteredClasses: [],
      classTestsCorrection: [],
      test: {
        classIds: [],
        beginDate: null,
        endDate: null
      },
      testId: 0,
      currentTestId: 0,
      menuBegin: false,
      menuEnd: false,
      classes: [],
      headers: [
        {text: 'Título', value: 'title', align: 'center'},
        {text: 'Turma', value: 'class', align: 'center'},
        {text: 'Data Final', value: 'endDate', align: 'center'},
        {text: 'Status', value: 'status', align: 'center'},
        {text: 'Ações', value: '', align: 'center'}
      ]
    }
  },
  mounted () {
    this.getTests()
    this.getClasses()
    this.testsLength = this.tests.length
  },
  methods: {
    saveClassTest (r, status) {
      if (r.status === 200) {
        classTestService.saveClassTest(r.data)
        classTestService.saveClassTestStatus(status)
      }
      this.$router.push('/minhaprova')
    },
    getClassTest (id, status, testId) {
      testService.saveTestId(testId)
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
      classTestService.saveClassTestId(id)
    },
    correctExams () {
      this.classTestsCorrection = this.classTestsCorrection.map((r) => r.classTestId)
      baseService.post(`/test/${this.testId}/correction`, {ids: this.classTestsCorrection}).then(r => {
        if (r.status === 200) {
          examService.saveExams(r.data.correctedExams)
          testService.saveTest(r.data.test)
        }
        this.$router.push('/corrigir')
      })
    },
    findStatus (status) {
      return this.items[status - 1].text
    },
    filterClassTests (id) {
      this.testId = id
      this.classTestsFiltered = this.tests.filter((item) => item.testId === id && item.status === 3)
    },
    filterStatus (items, search, filter) {
      search = search.toString().toLowerCase()
      let itemsFiltered = items.filter(row => {
        return search === '' ? true : search.includes(row['status'])
      })
      this.testsLength = itemsFiltered.length
      return itemsFiltered
    },
    getTests () {
      baseService.get(`/teacher/${auth.teacherId()}/tests`).then(r => {
        if (r.status === 200) {
          this.tests = r.data
          this.appliedTests = r.data.filter(x => x.status === 2).length
          this.uncorrectedTests = r.data.filter(x => x.status === 3).length
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro na obtenção das provas!'})
        }
      })
    },
    changeSelect (value) {
      this.search = value
    },
    getClasses () {
      baseService.get(`/teacher/${auth.teacherId()}/classes/`).then(r => {
        this.classes = r.data.classes.map(c => {
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
    },
    applyTest (id) {
      this.currentTestId = id
      this.dialog = true
    }
  },
  computed: {
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.testsLength / this.pagination.rowsPerPage) : 0
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
  overflow-y: scroll;
  overflow-x: hidden;
  height: 102%;
}

#edit{
  background-color: #eca400;
}

#export{
   background-color:#ddd78d;
}

#grade{
   background-color: #1a237e;
}

#correct{
  background-color: #679437;
}

#aplic{
   background-color: #1a237e;
}

#delete{
   background-color: #a20021;
}
</style>
