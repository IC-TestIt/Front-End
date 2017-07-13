<template lang="html">
  <div class="vlogin">
    <form novalidate @submit.stop.prevent="submit">

      <md-input-container>
        <label>Email</label>
        <md-input type="email"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Senha</label>
        <md-input type="password"></md-input>
      </md-input-container>

      <md-button class="md-raised md-primary">Login</md-button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'vlogin'
}
</script>

<style lang="css">
</style>
