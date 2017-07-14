<template lang="html">
  <div class="vlogin">
    <form novalidate v-on:submit="handleSubmit($event)">

      <md-input-container>
        <label>Email</label>
        <md-input type="email" v-model="user.email"></md-input>
      </md-input-container>

      <md-input-container md-has-password>
        <label>Senha</label>
        <md-input type="password" v-model="user.password"></md-input>
      </md-input-container>

      <md-button type="submit" class="md-raised md-primary">Login</md-button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'vlogin',
  data () {
    return {
      user: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      // Auth
      this.$auth.login({
        params: {auth: this.user},
        success: function () {
          console.log('Usuário logado com sucesso.')
        },
        error: function () {
          console.log('Usuário e/ou senha inválidos.')
        },
        rememberMe: true
      })
    }
  }
}
</script>

<style lang="css">


</style>
