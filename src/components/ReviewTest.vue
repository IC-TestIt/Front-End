<template>
  <div id="reviewTest">
    <v-card class="lighten-1 z-depth-1 mb-5 pa-5" height="200px">
      <v-layout align-center>
        <v-flex xs3 fill-height>
          <v-btn class="CreateTest-Step3Button green lighten-1 pa-5">Associar Prova</v-btn>
        </v-flex>
        <v-flex xs3 fill-height>
          <v-btn class="CreateTest-Step3Button indigo lighten-1 pa-5">Visualizar Prova</v-btn>
        </v-flex>
        <v-flex xs3 fill-height>
          <v-btn class="CreateTest-Step3Button red lighten-1 pa-5">Exportar Prova</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    <v-btn primary @click.native="e1 = 1">Finalizar</v-btn>
    <v-btn flat @click.native="e1 = 2">Cancel</v-btn>
  </div>
</template>
<script>
export default {
  name: 'reviewTest',
  data: () => ({
  })
}
</script>
<style lang="css" scoped>
</style>
