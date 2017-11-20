<template>
    <div class="my-classes">
        <v-layout row wrap>
           <v-flex md12>
                <h3 class="accent--text my-tests-title text-xs-center ma-1 pt-4">Minhas Turmas</h3>
            </v-flex>
            <v-flex  md4>
                <v-card class="success white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">{{bestClass}}</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3">Turma com a melhor média</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex  md4>
                <v-card class="primary white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">{{ classes.length }}</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3">Turma com a pior média</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex  md4>
                <v-card class="error darken-1 white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">{{worstClass}}</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3">Pior Turma</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card transparent>
                     <v-btn
                        absolute
                        dark
                        buttom
                        fab
                        small
                        top
                        right
                        class="success"
                        v-on:click="linkes"
                      >
              <v-icon>add</v-icon>
            </v-btn>
                </v-card>
            </v-flex>
            <v-flex md12 class="mr-5 ml-5 pa-1">
                <v-data-table
                    :headers="headers"
                    :items="classes"
                    :pagination.sync="pagination"
                    hide-actions
                    class="white elevation-1"
                >
                    <template slot="items" scope="props">
                        <td class="text-xs-center">{{ props.item.description }}</td>
                        <td class="text-xs-center">{{ props.item.size }}</td>
                        <td class="text-xs-center">{{ props.item.average }}</td>
                        <td class="text-xs-center">
                          <v-btn class="primary" v-on:click="myClass(props.item.id)">Detalhes</v-btn>
                          <v-btn class="error white--text darken-1" v-on:click="deleteClass(props.item.id)">Apagar</v-btn>
                        </td>
                    </template>
                </v-data-table>
                <div class="text-xs-center pt-2">
                    <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import baseService from '../services/baseService'
import classService from '../services/classService'
import auth from '../auth'

export default {
  name: 'myclasses',
  data () {
    return {
      pagination: {
        rowsPerPage: 5
      },
      headers: [
        {text: 'Descrição', value: 'description', align: 'center'},
        {text: 'Quantidade de alunos', value: 'size', align: 'center'},
        {text: 'Média Geral', value: 'average', align: 'center'},
        {text: 'Ações', value: '', align: 'center'}
      ],
      classes: [],
      bestClass: '',
      worstClass: ''
    }
  },
  mounted () {
    this.getClasses()
  },
  methods: {
    getClasses () {
      baseService.get(`/teacher/${auth.teacherId()}/classes`).then(r => {
        if (r.status === 200) {
          let filteredTests = r.data.classes.filter(item => Boolean(item.hasTests))
          if (filteredTests.length === 0) {
            this.bestClass = 'Ainda não é possível calcular'
            this.worstClass = 'Ainda não é possível calcular'
          } else {
            this.bestClass = filteredTests[0].description
            this.worstClass = filteredTests[ filteredTests.length - 1 ].description
          }
          this.classes = r.data.classes.map(item => {
            return {
              description: item.description,
              id: item.id,
              average: item.average,
              size: item.size
            }
          })
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro na obtenção de turmas!'})
        }
      })
    },
    deleteClass (id) {
      baseService.del(`/class/${id}`).then(r => {
        this.getClasses()
      })
    },
    myClass (c) {
      classService.saveClass(c)
      this.$router.push('/minhaturma')
    },
    linkes () {
      this.$router.push('/turma')
    }
  },
  computed: {
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.classes.length / this.pagination.rowsPerPage) : 0
    }
  }
}
</script>

<style>


.my-classes {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 102%;
}
</style>
