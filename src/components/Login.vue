<template lang="html">
  <div class="vlogin">
    <form novalidate v-on:submit="handleSubmit($event)">
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-text-field label="Email" type="email" v-model="user.email" class="input-group--focused"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field label="Senha" type="password" v-model="user.password" class="input-group--focused"></v-text-field>
          </v-flex>
        </v-layout>
        <div class="text-xs-center">
          <v-btn round primary>Login</v-btn>
        </div>
      </v-container>
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
          localStorage.setItem('userId', response.data.userId)
          localStorage.setItem('teacherId', response.data.teacherId)
          localStorage.setItem('studentId', response.data.studentId)
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

.vlogin {
  height: 52vh;
}
</style>
