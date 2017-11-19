<template lang="html">
  <v-card class="success white--text text-xs-center">
    <v-card-title primary-title>
      <v-flex xs6>
        <div>Nome da Turma: </div>
      </v-flex>
      <v-flex xs6>
        <div>{{currentClass.name}}</div>
      </v-flex>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'header',
  props: ['currentClass']
}
</script>
