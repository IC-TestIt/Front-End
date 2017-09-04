<template>      
        <div class="dotest text-xs-center">
          <h2  v-model="test.title">{{ test.title }}</h2>
         <v-container>                 
            <VProva></VProva>
          </v-container>
        </div>
      
</template>

<script>
import VProva from './TestList'
import baseService from '../services/baseService'

export default {
  name: 'dotest',
  components: {
    VProva
  },
  data () {
    return {
      test: {}
    }
  },
  methods: {
    getTest: function () {
      let id = this.$route.params.id
      baseService.get(`/test/${id}`).then(response => {
        if (response.status === 200) {
          console.log(response.data)
          this.test = response.data
        }
      })
    }
  },
  mounted () {
    this.getTest()
  }
}
</script>

<style>
  .menus{
    text-align: center;
  }
</style>
