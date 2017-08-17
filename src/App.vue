<template>
  <v-app>
      <VHeader></VHeader>
      <div id="app-container" class="home">
        <router-view></router-view>
      </div>
      <VFooter></VFooter>
  </v-app>
</template>

<script>
import VHeader from './components/Header'
import VFooter from './components/Footer'
import VMenu from './components/Menu'

export default {
  name: 'app-main',
  components: {
    VHeader,
    VFooter,
    VMenu
  }
}
</script>

<style lang="stylus">
  @import './assets/styles/main'
</style>
