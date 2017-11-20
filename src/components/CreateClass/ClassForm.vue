<template lang="html">
  <div class="class-form">
    <v-card class="grey lighten-3 black--text ma-2 elevation-5" height="77vh">
      <v-card-title primary-title>
        <v-flex xs12>
          <div class="primary--text text-xs-center headline mr-5">Cadastrar Turma</div>
        </v-flex>
      </v-card-title>
      <v-layout column class="ma-2 ml-5 mr-0 class-inputs">
        <form @submit="createClass($event)">
          <v-flex xs10 class="ma-5 text-xs-center">
            <v-text-field class="body-2" label="Descrição da Turma" v-model="currentClass.description" light></v-text-field>
          </v-flex>
          <v-flex xs12 class="mt-5 mr-5">
            <div class="text-xs-center">
              <v-btn success dark type="submit" :loading="loading">
                Cadastrar
              </v-btn>
            </div>
          </v-flex>
        </form>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import baseService from '../../services/baseService'
import authService from '../../auth'
import classService from '../../services/classService'
export default {
  name: 'class-form',
  data () {
    return {
      currentClass: {
        description: null,
        teacherId: null
      },
      loading: false
    }
  },
  methods: {
    createClass (e) {
      e.preventDefault()
      this.loading = true
      this.currentClass.teacherId = authService.teacherId()
      baseService.post(`/class`, this.currentClass).then(r => {
        if (r.status === 200) {
          classService.saveClass(r.data.classId)
          this.$toastr('info', {position: 'toast-top-right', msg: 'Turma criada com Sucesso'})
          this.loading = false
          this.$router.push('/minhaturma')
        }
      }).catch(e => {
        this.$toastr('error', {position: 'toast-top-right', msg: 'Houve um erro ao cadastrar a Turma'})
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.class-form
  width 60vw


</style>
