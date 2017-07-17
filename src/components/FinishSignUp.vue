<template lang="html">
  <div class="signUp">
    <h1>Concluir Cadastro</h1>
    <div class="page">
      <VForm :user="user"></VForm>
    </div>
  </div>

</template>

<script>
import VForm from './Form.vue'

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
        pwd: '',
        date: ''
      },
      rpwd: ''
    }
  },
  mounted () {
    this.getData()
  },
  // props: ['propName']
  methods: {
    getData: function () {
      if (this.$route.params.id === '1') {
        this.user.name = 'Medson'
        this.user.email = 'medson@gmail.com'
      }
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

h1 {
  text-align: center;
}

.page {
  display: flex;
  justify-content: center;
}

.signUp .vform {
  width: 100%;
  margin-left: 300px;
  margin-right: 300px;
}



</style>
