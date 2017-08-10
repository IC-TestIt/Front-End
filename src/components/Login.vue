<template lang="html">
  <div class="vlogin">
    <form novalidate v-on:submit="handleSubmit($event)">
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-text-field label="Email" type="email" v-model="user.email"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field label="Senha" type="password" v-model="user.password"></v-text-field>
          </v-flex>
        </v-layout>
        <div class="text-xs-center">
          <v-btn primary type="submit">Login</v-btn>
        </div>
      </v-container>
      <label class="label-error">{{msg}}</label>
    </form>
  </div>
</template>

<script>
import auth from '../auth'

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

      auth.logIn(this.user.email, this.user.password).then((r) => {
        if (r === 200) {
          this.$toastr('info', {position: 'toast-top-right', msg: 'Usuário Logado com Sucesso'})
          this.$router.push('/home')
        }
      }).catch(e => {
        this.$toastr('error', {position: 'toast-top-right', msg: 'Email e/ou Senha inválido(s)!'})
      })
    }
  }
}
</script>

<style lang="css">

.vlogin {
  height: 52vh;
}

.vlogin .input-group__details:before {
  background-color: #888;
}
</style>
