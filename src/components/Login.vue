<template lang="html">
  <div class="vlogin text-xs-center">
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
          <v-btn primary type="submit" :loading="loading">Login</v-btn>
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
      msg: '',
      loading: false
    }
  },
  beforeCreate () {
    auth.logout()
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.loading = true
      auth.logIn(this.user.email, this.user.password).then((r) => {
        this.$toastr('info', {position: 'toast-top-right', msg: 'Usuário Logado com Sucesso'})
        this.$router.push('/turma')
        this.loading = false
      }).catch(e => {
        this.$toastr('error', {position: 'toast-top-right', msg: 'Email e/ou Senha inválido(s)!'})
        auth.logout()
        this.loading = false
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
