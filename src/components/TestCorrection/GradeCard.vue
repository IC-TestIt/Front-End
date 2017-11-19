<template>
  <div class="grade-card">
    <v-card :class="cardColor(value * 10)" :height="height">
      <v-card-title primary-title>
        <v-flex xs9>
          <div :class="titleSize">{{title}}:</div>
        </v-flex>
        <v-flex xs2 class="mr-1">
          <div :class="valueSize">{{value}}</div>
        </v-flex>
      </v-card-title>
    </v-card>
  </div>
</template>
<script>
import {cardColor} from '../../utils/constants'
export default {
  name: 'grade-card',
  props: ['value', 'title', 'height', 'titleSize', 'valueSize'],
  data () {
    return {
      cardColor: cardColor
    }
  }
}
</script>
<style lang="stylus" scoped>
.value
  font-size 60px
</style>
