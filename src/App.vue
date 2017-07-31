<template>
  <div>
    <VHeader></VHeader>
    <div id="app-container" class="home">
      <router-view></router-view>
    </div>
    <VFooter></VFooter>
  </div>
</template>

<script>
import VHeader from './components/Header'
import VFooter from './components/Footer'

export default {
  name: 'app-main',
  components: {
    VHeader,
    VFooter
  }
}
</script>

<style lang="stylus">
  @import './assets/styles/main'
</style>
