<template>
  <div class="my-test-header">
    <v-layout row wrap>
      <v-flex xs3>
        <v-card class="primary white--text text-xs-center">
          <v-card-title primary-title>
            <v-flex xs6>
              <div>Data Inicio: </div>
            </v-flex>
            <v-flex xs6>
              <div>{{formateDate(test.beginDate)}}</div>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card class="success white--text text-xs-center">
          <v-card-title primary-title>
            <v-flex xs6>
              <div>Data Final: </div>
            </v-flex>
            <v-flex xs6>
              <div>{{formateDate(test.endDate)}}</div>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card class="warning white--text text-xs-center">
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
import { formateDate } from '../utils/date'
export default {
  name: 'my-test-header',
  props: ['test'],
  data: () => ({
    formateDate: formateDate
  })
}
</script>
<style lang="stylus" scoped>
</style>
