<template lang="html">
  <v-card :class="cardColor(room.average * 10)">
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs5 class="pb-0">
          <div class="headline pl-1 pb-4">
            {{ room.description }}
          </div>
          <v-btn class="white white--text" small outline flat @click.native="show = !show">
            {{ show ? 'Menos' : 'Mais' }}
          </v-btn>
        </v-flex>
        <v-flex xs5 class="text-xs-center">
          <p class="display-1 pt-0">{{room.correctedStudentTests.length > 0 ? room.average : 0}}</p>
          <p class="pl-1 pt-2">Media de Notas</p>
        </v-flex>
        <v-flex xs12>
          <v-slide-y-transition>
            <v-card-text v-show="show">
              <p class="item-title">Lista de Provas dessa Turma</p>
              <v-divider class="mb-4"></v-divider>
              <div v-if="room.correctedStudentTests.length > 0" v-for="test in room.correctedStudentTests" :key="test">
                <p class="pl-1 pb-4 item-card">Prova: {{ test.description }} - Nota: {{test.grade}}</p>
              </div>
              <div v-if="room.correctedStudentTests.length === 0">
                <p class="pl-1 pb-4 item-title">Nenhuma prova realizada</p>
              </div>
            </v-card-text>
          </v-slide-y-transition>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { cardColor } from '../../utils/constants'
export default {
  name: 'currentClass',
  props: ['room'],
  data () {
    return {
      cardColor: cardColor,
      show: false
    }
  }
}
</script>

<style lang="stylus">
.item-card
  font-size 16px
  line-height 0.8
  white-space pre-wrap
  text-transform uppercase
  letter-spacing 1px
  word-spacing 10px

.item-title
  font-size 18px
</style>
