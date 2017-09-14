<template>
    <div>
        <v-layout row wrap>
           <v-flex md12>
                <h3 class="indigo lighten-2 my-tests-title text-xs-center ma-1 pt-4">Minhas Turmas</h3>
            </v-flex>
            <v-flex  md4>
                <v-card class="green darken-1 white--text ma-5 text-xs-center">
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
            <v-flex  md4>
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
            <v-flex  md4>
                <v-card class="orange darken-1 white--text ma-5 text-xs-center">
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
                        class="pink"
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
                    hide-actions
                    class="white elevation-1"
                >
                    <template slot="items" scope="props">                       
                        <td class="text-xs-center">{{ props.item.description }}</td>
                        <td class="text-xs-center">{{ props.item.size }}</td>
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
  name: 'myclasses',
  data () {
    return {
      headers: [
        {text: 'Descrição', value: 'description', align: 'center'},
        {text: 'Quantidade de alunos', value: 'size', align: 'center'}
      ],
      classes: []
    }
  },
  mounted () {
    this.getClasses()
  },
  methods: {
    getClasses () {
      baseService.get(`/teacher/${auth.teacherId()}/classes`).then(r => {
        if (r.status === 200) {
          console.log(r.data)
          this.classes = r.data.map(item => {
            return {
              description: item.description,
              id: item.id,
              size: item.size
            }
          })
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro na obtenção de turmas!'})
        }
      })
    },
    linkes () {
      this.$router.push('/turma')
    }
  }
}
</script>
