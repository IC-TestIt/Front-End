<template>
  <div id="reviewTest">
    <v-card class="lighten-1 z-depth-1 mb-5 pa-5" height="200px">
      <v-layout align-center>
        <v-flex xs3 fill-height>
          <v-btn class="CreateTest-step-3-button green lighten-1 pa-5">Associar Prova</v-btn>
        </v-flex>
        <v-flex xs3 fill-height>
          <v-btn class="CreateTest-step-3-button indigo lighten-1 pa-5">Visualizar Prova</v-btn>
        </v-flex>
        <v-flex xs3 fill-height>
          <v-btn class="CreateTest-step-3-button red lighten-1 pa-5">Exportar Prova</v-btn>
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
