<template>
  <div class="grade-card">
    <v-card :class="cardColor(value * 10)">
      <v-card-title primary-title>
        <v-flex xs6>
          <div class="headline bold">{{value}}</div>
        </v-flex>
        <v-flex xs6>
          <div class="bold">{{title}}</div>
        </v-flex>
      </v-card-title>
    </v-card>
  </div>
</template>
<script>
import {cardColor} from '../../utils/constants'
export default {
  name: 'grade-card',
  props: ['value', 'title'],
  data () {
    return {
      cardColor: cardColor
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
