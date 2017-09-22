<template>
  <v-layout row>
  <v-flex md2 v-if="!timeOut">
    <v-progress-circular
      v-bind:size="80"
      v-bind:width="10"
      v-bind:rotate="-90"
      v-bind:value="days.value"
      class="indigo--text"
    >
      {{ days.time }} Dias
    </v-progress-circular>
  </v-flex>
  <v-flex md2 v-if="!timeOut">
    <v-progress-circular
      v-bind:size="80"
      v-bind:width="10"
      v-bind:rotate="-90"
      v-bind:value="hours.value"
      class="green--text"
    >
        {{ hours.time }} Horas
    </v-progress-circular>
   </v-flex>
   <v-flex md2 v-if="!timeOut">
      <v-progress-circular
       v-bind:size="80"
       v-bind:width="10"
       v-bind:rotate="-90"
       v-bind:value="minutes.value"
       class="indigo--text"
      >
        {{ minutes.time }} Minutos
      </v-progress-circular>
    </v-flex>
    <v-flex md4 v-if="!timeOut">
    </v-flex>
    </v-layout>
</template>
<script>
import moment from 'moment'

export default {
  name: 'Timer',
  props: ['endTime'],
  data () {
    return {
      days: {
        time: 0,
        value: 0
      },
      hours: {
        time: 0,
        value: 0
      },
      minutes: {
        time: 0,
        value: 0
      },
      seconds: {
        time: 0,
        value: 0
      },
      interval: {},
      timeOut: false
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      var dif = moment.duration(moment(this.endTime) - moment())._data
      if (dif.seconds >= 0) {
        this.seconds.time = dif.seconds
        this.minutes.time = dif.minutes
        this.hours.time = dif.hours
        this.days.time = dif.days

        this.seconds.value = (100 * this.seconds.time) / 60
        this.minutes.value = (100 * this.minutes.time) / 60
        this.hours.value = (100 * this.hours.time) / 24
        this.days.value = (100 * this.days.time) / 10
      } else {
        this.timeOut = true
        this.$emit('time-out', this.timeOut)
      }
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
