<template>
  <div class="percent-card">
    <v-card :class="classObj(data)">
      <v-card-title primary-title>
        <v-flex xs6>
          <div class="headline bold">{{data}}%</div>
        </v-flex>
        <v-flex xs6>
          <div class="bold">{{title}}</div>
        </v-flex>
      </v-card-title>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'percent-card',
  props: ['value', 'title'],
  mounted () {
    this.data = this.value
  },
  data () {
    return {
      data: 0,
      classObj: (grade) => {
        let cssClass = 'white--text mt-3 text-xs-center'
        if (grade <= 40) {
          return `red ${cssClass}`
        } else if (grade <= 60) {
          return `orange ${cssClass}`
        } else {
          return `green darken-1 ${cssClass}`
        }
      }
    }
  },
  watch: {
    value: function valueWatcher (newVal) {
      this.data = newVal
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
