<template>
    <div class="my-exams">
        <v-layout row wrap>
            <v-flex xs12>
                <h3 class="my-exams-title text-xs-center ma-1 pt-4">Minhas Avaliações</h3>
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="green darken-1 white--text ma-5 text-xs-center">
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <div class="headline">0</div>
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
                    :items="exams"
                    hide-actions
                    class="white elevation-1"
                >
                    <template slot="items" scope="props">
                        <td class="text-xs-center" >{{ props.item.Title }}</td>
                        <td class="text-xs-center">{{ props.item.Description }}</td>
                        <td class="text-xs-center">
                          <v-btn primary dark>Realizar</v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

export default {
  name: 'MyExams',
  data () {
    return {
      exams: [{
        Title: 'Prova 1',
        Description: 'A primeira prova'
      }],
      headers: [
        {text: 'Título', value: 'Title', align: 'center'},
        {text: 'Descrição', value: 'Description', align: 'center'},
        {text: 'Ações', value: '', align: 'center'}
      ]
    }
  }
}
</script>

<style lang="stylus">
.my-exams-title {
    color: #006
}
</style>
