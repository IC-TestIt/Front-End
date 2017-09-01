<template>
  <div class="dynamicList text-xs-center">
    <v-pagination light v-bind:length.number="list.length" v-model="index" @next="change" @previous="change" @input="change"></v-pagination>
  </div>
</template>

<script>

export default {
  name: 'dynamicList',
  data () {
    return {
      index: 1
    }
  },
  props: ['list', 'current'],
  methods: {
    change () {
      this.current = this.list[this.index - 1]
      this.$emit('get-current', this.current)
    }
  }
}
</script>
<style lang="css">
</style>
