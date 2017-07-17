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

      const loginData = `email=${this.user.email}&password=${this.user.password}`

      this.$http.post(`${process.env.API}/token`, loginData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        if (response.status === 200) {
          console.log('Usuário logado com sucesso.')
          this.$router.push('/home')
        }
      }, error => {
        console.log(error)
        console.log('Usuário e/ou senha inválidos.')
        this.msg = 'Usuário e/ou senha inválidos.'
      })
    }
  }
}
</script>

<style lang="css">

</style>
