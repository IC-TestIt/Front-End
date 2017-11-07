<template>
  <v-card :class="classObj(grade)">
    <v-container fluid grid-list-lg>
      <v-layout>
        <v-flex xs7 class="pb-0">
          <div class="headline pl-1 pb-4">
            {{ name }}
          </div>
          <v-btn class="white white--text" small outline flat>
            Mais
          </v-btn>
        </v-flex>
        <v-flex xs5 class="text-xs-center">
          <p class="display-1 pt-0">{{grade}}</p>
          <p class="pl-1 pt-2">Média (%)</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'classCard',
  props: ['name', 'grade'],
  data () {
    return {
      classObj: (grade) => {
        let cssClass = 'white--text'
        if (grade <= 40) {
          return `red ${cssClass}`
        } else if (grade <= 60) {
          return `orange ${cssClass}`
        } else {
          return `green darken-1 ${cssClass}`
        }
      }
    }
  }
}
</script>

<style>

</style>
