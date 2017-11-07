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
              <div>{{formatedDate(test.beginDate)}}</div>
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
              <div>{{formatedDate(test.endDate)}}</div>
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
              <div>{{test.title}} - {{test.className}}</div>
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

  }),
  methods: {
    formatedDate (date) {
      return new Date(date).toLocaleDateString('pt-br')
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
