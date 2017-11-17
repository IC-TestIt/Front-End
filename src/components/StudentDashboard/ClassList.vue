<template lang="html">
  <v-container fluid grid-list-lg >
    <v-layout row wrap class="grades-list">
      <v-flex xs8 class="white--text display-1">
        Minhas Turmas
      </v-flex>
      <v-flex xs12>
        <div v-for="c in classes" :key="c.id" v-if="classes.length > 0">
          <v-flex xs12 class="mb-3">
            <class-card :room="c"></class-card>
          </v-flex>
        </div>
        <div v-if="classes.length === 0">
          <v-flex xs12 class="mb-3">
            <p class="pl-1 pb-4 item-title white--text">Nenhuma turma associada</p>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ClassCard from './ClassCard'
export default {
  name: 'classList',
  props: ['classes'],
  components: {
    ClassCard
  }
}
</script>

<style lang="stylus">

.grades-list
  overflow-y auto
  height 70vh

.item-title
  font-size 18px

</style>
