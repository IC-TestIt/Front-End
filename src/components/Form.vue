<template lang="html">
  <div class="vform">
    <form novalidate @submit.stop.prevent="submit">

      <md-input-container>
        <label>Nome</label>
        <md-input required v-model="user.name"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Email</label>
        <md-input type="email" required v-model="user.email"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Senha</label>
        <md-input type="password" required v-model="user.pwd"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Confirme a Senha</label>
        <md-input type="password" required v-model="rpwd"></md-input>
      </md-input-container>

      <span v-if="compare(user.pwd, rpwd) == false">*Senhas não coincidem</span>

      <md-input-container>
        <label>Data de Nascimento</label>
        <md-input type="date" v-model="user.date"></md-input>
      </md-input-container>

      <md-button class="md-raised md-primary">Cadastrar</md-button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'vform',
  data () {
    return {
      // user: {
      //   name: '',
      //   email: '',
      //   pwd: '',
      //   date: ''
      // },
      rpwd: ''
    }
  },
  mounted () {
    this.getDate()
  },
  props: ['user'],
  methods: {
    compare: function (pwd, rpwd) {
      if (pwd === rpwd) {
        return true
      } else {
        // console.log('senha errada')
        return false
      }
    },
    getDate: function () {
      // this.user.name = 'Medson'
      // this.user.email = 'medson@gmail.com'
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

  .vform md-input-container {
    width: 100%;
    min-width: 40vw;
  }

}

</style>
