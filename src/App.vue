<template>
  <div>
    <VHeader></VHeader>
    <div id="app-container">
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

<style src="./assets/styles/main.css"></style>
