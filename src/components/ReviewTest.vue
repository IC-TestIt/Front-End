<template>
  <div id="reviewTest">
    <v-card class="lighten-1 z-depth-1 mb-5 pa-5" height="150px">
      <v-layout align-center="true" justify-center="true">
        <v-flex xs3>
          <v-btn class="green darken-1 pa-2" dark="true">Associar Prova<v-icon right dark>compare_arrows</v-icon></v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn class="indigo darken-1 pa-2" dark="true">Visualizar Prova<v-icon right dark>chrome_reader_mode</v-icon></v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn class="amber darken-1 pa-2" light>Exportar Prova<v-icon right dark>get_app</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    <v-btn primary @click.native="e1 = 1">Finalizar</v-btn>
    <v-btn flat @click.native="e1 = 2">Cancel</v-btn>
  </div>
</template>
<script>
export default {
  name: 'reviewTest'
}
</script>
<style lang="css" scoped>
</style>
