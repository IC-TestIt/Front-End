<template>
  <div class="my-test-header">
    <v-layout row wrap>
      <v-flex xs3>
        <v-card>
          <v-card-title primary-title>
            <v-flex xs6>
              <div>Data Inicio: </div>
            </v-flex>
            <v-flex xs6>
              <div>20/10/2017</div>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-title primary-title>
            <v-flex xs6>
              <div>Data Final: </div>
            </v-flex>
            <v-flex xs6>
              <div>30/10/2017</div>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-card-title primary-title>
            <v-flex xs6>
              <div>Titulo/Turma: </div>
            </v-flex>
            <v-flex xs6>
              <div>ALOG - ADS</div>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: 'my-test-header',
  props: ['test'],
  data: () => ({

  })
}
</script>
<style lang="stylus" scoped>
</style>
