<template>
    <div class="my-tests">
        <v-layout row wrap>
            <v-flex xs12>
                <h3 class="my-tests-title text-xs-center ma-1 pa-3">Minhas Provas</h3>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="orange darken-1 white--text ma-5">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">0</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3 ">Total de Provas</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="indigo lighten-1 white--text ma-5">
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
                <v-card class="green darken-1 white--text ma-5">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">0</div>
                        </v-flex>
                        <v-flex xs12>
                            <div class="pt-3">Alguma Coisa</div>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs0 md12 class="ma-5 pa-1">
                <v-data-table 
                    v-bind:headers="headers" 
                    :items="tests" 
                    hide-actions 
                    class="white elevation-1"
                >
                    <template slot="items" scope="props">
                        <td class="text-xs-center" >{{ props.item.Title }}</td>
                        <td class="text-xs-center">{{ props.item.Description }}</td>
                        <td class="text-xs-center">
                            <v-dialog v-model="dialog" scrollable>
                                <v-btn primary dark slot="activator" @click.native="dialog = true">Open Dialog</v-btn>
                                <v-card>
                                    <v-card-title>Selecione a Turma</v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text style="height: 300px">
                                        <v-radio label="Turma 1" v-model="dialogm1" value="1"></v-radio>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Fechar</v-btn>
                                        <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Salvar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
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
      dialogm1: '',
      dialog: false,
      tests: [{
        Title: 'Prova 1',
        Description: 'A primeira prova'
      }],
      headers: [
        {text: 'Título', value: 'Title', align: 'center'},
        {text: 'Descrição', value: 'Description', align: 'center'},
        {text: 'Ações', value: '', align: 'center'}
      ]
    }
  },
  methods: {
    getTests () {
      baseService.get(`/teacher/${auth.teacherId()}/tests`).then(r => {
        if (r.status === 200) {
          console.log(r.data)
          this.tests = r.data
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro na obtenção das provas!'})
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.my-tests-title {
    color: #006
}
</style>
