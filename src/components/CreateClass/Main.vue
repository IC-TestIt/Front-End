<template lang="html">
  <div class="create-class">
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <class-form></class-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ClassForm from './ClassForm'

export default {
  name: 'create-class',
  components: {
    ClassForm
  }
}
</script>
