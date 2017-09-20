<template>
    <div class="my-classes">
        <v-layout row wrap>
            <v-flex xs12>
                <h3 class="my-classes-title text-xs-center ma-1 pt-4">Minhas Avaliações</h3>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="green darken-1 white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">{{this.classes.length}}</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3 ">Total de Avaliações</div>
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
                            <div class="pt-3">Avaliações Realizadas</div>
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
                            <div class="pt-3">Avaliações Pendentes</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs0 md12 class="mr-5 ml-5 pa-1">
                <v-data-table
                    v-bind:headers="headers"
                    :items="classes"
                    hide-actions
                    class="white elevation-1"
                >
                    <template slot="items" scope="props">
                        <td class="text-xs-center">{{ props.item.description }}</td>
                        <td class="text-xs-center">{{ props.item.size }}</td>
                        <td class="text-xs-center">
                          <v-btn primary dark v-on:click="deleteClass(props.item.id)">Apagar</v-btn>
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
  name: 'Myclasses',
  data () {
    return {
      auth: auth,
      classes: [],
      headers: [
        {text: 'Descrição', value: 'Description', align: 'center'},
        {text: 'Número de Alunos', value: 'Size', align: 'center'},
        {text: 'Ações', value: '', align: 'center'}
      ]
    }
  },
  mounted () {
    this.getClasses()
  },
  methods: {
    getClasses () {
      baseService.get(`/teacher/${auth.teacherId()}/classes`).then(r => {
        if (r.status === 200) {
          this.classes = r.data
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro na obtenção das provas!'})
        }
      })
    },
    deleteClass (id) {
      baseService.delet(`/class/${id}`).then(r => {
        console.log(r.data)
      })
    }
  }
}
</script>

<style lang="stylus">
.my-classes-title {
    color: #006
}
</style>
