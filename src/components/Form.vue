<template lang="html">
  <div class="vform">
    <form novalidate v-on:submit="signUp($event)">
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-text-field label="Nome" v-model="user.name"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field label="Email" v-model="user.email"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field label="Senha" type="password" v-model="user.password"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field label="Confirmar Senha" type="password" v-model="rpassword"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <span v-if="!compare(user.password, rpassword)">*Senhas não coincidem</span>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field label="Data de Nascimento" type="date" v-model="user.birthday" class="input-group--focused"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field label="Telefone" v-model="user.phone"></v-text-field>
          </v-flex>
        </v-layout>
        <div class="text-xs-center">
          <v-btn primary dark>Cadastrar</v-btn>
        </div>
      </v-container>
    </form>
  </div>
</template>

<script>
export default {
  name: 'vform',
  data () {
    return {
      rpassword: ''
    }
  },
  mounted () {
  },
  props: ['user', 'handleSubmit'],
  methods: {
    compare: function (password, rpassword) {
      if (password === rpassword) {
        return true
      } else {
        return false
      }
    },
    signUp: function (e) {
      e.preventDefault()

      this.handleSubmit(this.user)
    }
  }
}
</script>

<style lang="css">
.vform span {
  color: #F00;
}

@media only screen
and (min-device-width : 320px)
and (max-device-width : 568px)
and (orientation: portrait) {

  .vform {
    width: 100%;
    min-width: 40vw;
  }

  .vform .input-group__details:before {
    background-color: #888;
  }



  /*.vform md-input-container {
    width: 100%;
    min-width: 40vw;
  }*/

}

</style>
