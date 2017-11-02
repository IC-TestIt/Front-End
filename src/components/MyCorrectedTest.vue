<template>
  <div class="my-corrected-test">
    <v-container grid-list-md fluid>
      <MyTestHeader :test="test"></MyTestHeader>
      <v-layout row>
        <v-flex xs12>
          <v-card height="25vh">
            <v-card-title primary-title>
              <v-flex xs6>
                <div>Grafico: </div>
              </v-flex>
              <v-flex xs6>
                <div>Notas dos Alunos</div>
              </v-flex>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6>
          <v-card height="35vh">
            <v-card-title primary-title>
              <v-flex xs6>
                <div>Grafico: </div>
              </v-flex>
              <v-flex xs6>
                <div>Media de Questões</div>
              </v-flex>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <MyTestTable></MyTestTable>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import MyTestHeader from './MyTestHeader'
import MyTestTable from './MyTestTable'

export default {
  name: 'my-corrected-test',
  components: {
    MyTestHeader,
    MyTestTable
  },
  props: ['test'],
  data: () => ({
  }),
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.my-corrected-test
  width 95vw
  max-width 95vw

</style>
