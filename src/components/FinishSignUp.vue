<template lang="html">
  <div class="signUp">
    <h1>Concluir Cadastro</h1>
    <div class="signUp-page">
      <VForm :user="user" :handleSubmit="handleSubmit" :loading="loading"></VForm>
    </div>
  </div>

</template>

<script>
import VForm from './Form.vue'
import baseService from '../services/baseService'

export default {
  name: 'signUp',
  components: {
    VForm
  },
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        phone: '',
        birthday: '',
        type: 2,
        organizationid: 1,
        identifier: '',
        id: ''
      },
      rpwd: '',
      loading: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData: function () {
      this.user.id = this.$route.params.id
      baseService.get(`/user/${this.user.id}`).then(r => {
        this.user = r.data
      })
    },
    handleSubmit: function (user) {
      this.loading = true
      baseService.put(`/user/${this.user.id}`, user).then(() => {
        this.loading = false
        this.$toastr('success', {position: 'toast-top-right', msg: 'Cadastro concluído com sucesso!'})
      }).catch(() => {
        this.loading = false
        this.$toastr('error', {position: 'toast-top-right', msg: 'Erro ao cadastrar!'})
      })
    }
  }
}
</script>

<style lang="css">

.signUp {
  display: flex;
  flex-direction: column;
  height: 77vh;
  margin: 10px 40px;
  overflow-y: scroll;
  overflow-x: hidden;
  align-content: center;
}

.signUp h1 {
  text-align: center;
  color: #000;
  font-size: 35px;
}

.signUp-page {
  display: flex;
  justify-content: center;
}

.signUp .vform {
  width: 30vw;
  margin-left: 300px;
  margin-right: 300px;
}

.input-group__details:before {
  background-color: #888;
}



</style>
