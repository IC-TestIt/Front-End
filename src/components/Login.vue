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

      <label class="label-error">{{msg}}</label>

    </form>
  </div>
</template>

<script>
import baseService from '../services/baseService'

export default {
  name: 'vlogin',
  data () {
    return {
      user: {
        email: null,
        password: null
      },
      msg: ''
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()

      baseService.login(this.user.email, this.user.password).then(response => {
        if (response.status === 200) {
          this.$toastr('info', {position: 'toast-top-right', msg: 'Usuário Logado com Sucesso'})
          localStorage.setItem('token', response.data.access_token)
          this.$router.push('/home')
        }
      }, error => {
        console.log(error)
        this.$toastr('error', {position: 'toast-top-right', msg: 'Email e/ou Senha inválido(s)!'})
      })
    }
  }
}
</script>

<style lang="css">

</style>
