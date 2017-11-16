<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs6 class="primary main-list elevation-1">
        <class-list></class-list>
      </v-flex>
      <v-flex xs6 class="main-list pl-5">
        <test-list></test-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import classList from './ClassList.vue'
import testList from './TestList.vue'

export default {
  name: 'teacherDashboard',
  components: {
    classList,
    testList
  }
}
</script>

<style>
.main-list {
  overflow-y: scroll;
  height: 75vh;
  left: 10vw;
}
</style>
