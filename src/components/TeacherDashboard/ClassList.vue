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
      <div class="class-list" v-if="classes.length > 0" v-for="c in classes" :key="c.id">
        <v-flex xs12 class="mb-3">
          <class-card :name="c.description" :grade="c.average" :current-class="c.id"></class-card>
        </v-flex>
      </div>
      <div v-if="classes.length === 0">
        <v-flex xs12 class="mb-3">
          <p class="pl-1 pb-4 item-title white--text">Nenhuma turma cadastrada</p>
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
      classes: []
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

.item-title {
  font-size: 18px;
}
</style>
