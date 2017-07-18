<template>
  <div class="home">
    <div class="text">
      <h1>Uma nova ferramenta de ensino</h1>
      <p>
        O Test It é uma ferramenta de ensino, com a proposta de trazer uma plataforma de aprendizado
        com maior suporte as necessidades do aluno, e um maior número de opções e recursos para o professor.
      </p>
    </div>
    <div class="form">
      <md-tabs class="md-transparent">

        <md-tab md-label="Login">

          <VLogin></VLogin>

        </md-tab>

        <md-tab md-label="Cadastre-se">

          <VForm :user="user" :handleSubmit="handleSubmit"></VForm>

        </md-tab>

      </md-tabs>

    </div>

  </div>
</template>

<script>
import VForm from './Form.vue'
import VLogin from './Login.vue'

export default {
  name: 'home',
  components: {
    VForm,
    VLogin
  },
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        phone: '',
        birthday: '',
        type: 1,
        organizationid: 7,
        Identifyer: 'Professor'
      }
    }
  },
  methods: {
    handleSubmit: function (user) {
      this.$http.post(`${process.env.API}/api/user`, user)
    }
  }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

.home {
  display: flex;
  justify-content: space-around;
  min-height: 80vh;
  min-width: 40vw;
  background-color: #ECECEC;
  height: 200px;
}

.text {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  width: 50vw;
  padding: 15px;
  margin-right: 10px;
}

.text h1 {
  margin-left: 3%;
}

.text p {
  padding: 20px;
  text-align: justify;
  font-size: 20px;
  line-height: 2em;
}

.form {
  margin-right: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 0;
  padding: 40px;
  width: 40vw;
  background: #FFF;
  height: 80%;
  overflow-x: hidden;
  overflow-y: scroll;
  /*box-shadow: 5px 5px 5px 5px grey;*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}

@media only screen
and (min-device-width : 768px)
and (max-device-width : 1024px)
and (orientation : landscape) {

  .form {
    max-height: 47vh;
    margin-top: 100px;
  }

  .text {
    margin-top: 100px;
  }

}

@media only screen
and (min-device-width : 320px)
and (max-device-width : 568px)
and (orientation: portrait) {
  
  .text {
    display: none;
  }

  .form {
    width: 100%;
    height: 80%;
    margin-left: 40px;
  }
}

</style>
