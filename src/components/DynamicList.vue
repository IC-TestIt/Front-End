<template>
  <div class="dynamicList text-xs-center">
    <v-pagination light :length=list.length v-model="index" @next="change" @previous="change" @input="change"></v-pagination>
  </div>
</template>

<script>

export default {
  name: 'dynamicList',
  data () {
    return {
      index: 1,
      current: null,
      size: 0
    }
  },
  props: ['list'],
  methods: {
    change () {
      this.current = this.list[this.index - 1]
      this.$emit('get-current', this.current)
      this.$emit('get-index', this.index)
    }
  }
}
</script>
