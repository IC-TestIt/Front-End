<template>
<v-container
        fluid
        grid-list-lg
      >
  <v-layout row wrap>
    <v-flex xs8 class="white--text display-1">
      Minhas Turmas
    </v-flex>
    <v-flex xs12>
      <div class="class-list" v-for="c in classes" :key="c.id">
        <v-flex xs12 class="mb-3">
          <class-card :name="c.description" :grade="c.average"></class-card>
        </v-flex>
      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import classCard from './ClassCard.vue'
import baseService from '../../services/baseService'
import auth from '../../auth'

export default {
  name: 'classList',
  components: {
    classCard
  },
  data () {
    return {
      classes: [
        {
          id: 1,
          name: 'Turma 1',
          grade: 100
        },
        {
          id: 2,
          name: 'Turma 2',
          grade: 50
        },
        {
          id: 3,
          name: 'Turma 3',
          grade: 10
        }
      ]
    }
  },
  methods: {
    get () {
      baseService.get(`/teacher/${auth.teacherId()}/dashboard/`).then(r => {
        this.classes = r.data.classes
      })
    }
  },
  mounted () {
    this.get()
  }
}
</script>

<style>
.class-list {
  overflow-y: auto;
}

.add-button {
  left: 6vw;
}
</style>
