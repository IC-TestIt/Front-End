<template>
  <div class="home">
    <div class="back-image">
        <v-parallax src="../static/back-image.jpg" height="1000"></v-parallax>
    </div>
    <div class="home-text">
      <h1>Uma nova ferramenta de ensino</h1>
      <p>
        O Test It é uma ferramenta de ensino, com a proposta de trazer uma plataforma de aprendizado
        com maior suporte as necessidades do aluno, e um maior número de opções e recursos para o professor.
      </p>
    </div> 
    
    <div class="home-form">
      <v-tabs dark fixed centered>
        <v-tabs-bar slot="activators" class="indigo darken-4">
          <v-tabs-slider class="secondary"></v-tabs-slider>
          <v-tabs-item href="#home-login" ripple>
            Login
          </v-tabs-item>
          <v-tabs-item href="#home-signup" ripple>
            Cadastre-se
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-content id="home-login">
          <v-card flat>
            <VLogin></VLogin>
          </v-card>
        </v-tabs-content>
        <v-tabs-content id="home-signup">
          <v-card flat>
            <VForm :user="user" :handleSubmit="handleSubmit" :loading="loading"></VForm>
          </v-card>
        </v-tabs-content>
      </v-tabs>
    </div>
    
  </div>
</template>

<script>
import VForm from './Form.vue'
import VLogin from './Login.vue'
import baseService from '../services/baseService'

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
        organizationid: 1,
        identifier: 'Professor'
      },
      loading: false
    }
  },
  methods: {
    handleSubmit: function (user) {
      this.loading = true
      baseService.post(`/user`, user).then(response => {
        if (response.status === 200) {
          this.$toastr('success', {position: 'toast-top-right', msg: 'Cadastro efetuado com sucesso!'})
        } else {
          this.$toastr('error', {position: 'toast-top-right', msg: 'Erro ao cadastrar!'})
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.$toastr('error', {position: 'toast-top-right', msg: 'Erro ao cadastrar!'})
      })
    }
  }
}
</script>

<style>

.home h1, h2 {
  font-weight: normal;
}

.home-text {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  width: 50vw;
  padding: 15px;
  margin-right: 10px;
  z-index: 0;
  filter: drop-shadow(-10px 0px 15px #000000);
  
}

.back-image{
  z-index: 0;
  opacity: 0.3;
  top: 0;
  left: 0;
  width: 100vw;
  position: absolute;
  filter: blur(4px); 
  
}

::-webkit-scrollbar {
    width: 8px;
    opacity: transparent;
}
 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2); 
    border-radius: 5px;
    background: rgba(220,220,220,0.4); 
}
 
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.7); 
    background: rgba(105,105,105,0.3); 
}



.home-text h1 {
  margin-left: 3%;
  font-size: 30px;
  color: #000;
}

.home a {
  color: #FFF;
}

.home-text p {
  padding: 20px;
  text-align: justify;
  font-size: 20px;
  line-height: 2em;
  font-size: 20px;
}

.home-form {
  margin-right: 30px;
  margin-top: 20px;
  margin-left: 0;
  width: 30vw;
  background: rgba(211,211,211);
  height: 60vh;
  overflow-x: hidden;
  overflow-y: scroll;  
  filter: drop-shadow(0px 0px 10px #000000);
  border-radius: 6px;  
}


@media only screen
and (min-device-width : 768px)
and (max-device-width : 1024px)
and (orientation : landscape) {

  .home-form {
    max-height: 47vh;
    margin-top: 100px;
  }

  .home-text {
    margin-top: 100px;
  }

}

@media only screen
and (min-device-width : 320px)
and (max-device-width : 568px)
and (orientation: portrait) {

  .home-text {
    display: none;
  }

  .home-form {
    width: 100%;
    height: 80%;
    margin-left: 40px;
  }
}

</style>
