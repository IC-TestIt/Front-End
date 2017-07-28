<template>
  <div id="menuBar" class="has-ripple blue">
      <a v-on:click="logOut()">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </a>
    </div>
    <md-ink-ripple />
    <md-list class="list">
      <md-toolbar md-theme="white">
        <span class="md-title">Menu</span>
      </md-toolbar>
      <md-divider></md-divider>
      <md-list-item href="#/home">Minhas Provas</md-list-item>
      <md-list-item href="#/home">Minhas Turmas</md-list-item>
      <md-list-item href="#/home">Configurações</md-list-item>
    </md-list>
  </div>
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
