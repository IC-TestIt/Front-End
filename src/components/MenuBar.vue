<template>

</template>
<script>
export default {
  name: "menuBar",
  data () {
    loggedIn: false

  },
  mounted () {
    this.loggedIn = localStorage.getItem('token') !== null
  },
  methods: {
    logOut: function () {
      localStorage.clear()
      this.loggedIn = false
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
