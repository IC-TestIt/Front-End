<template>      
        
        <v-container>         
           <VInfoStudent v-if="auth.isStudent()"></VInfoStudent>
           <VInfoTeacher v-else></VInfoTeacher>
        </v-container>
      
</template>

<script>
import VInfoStudent from './InfoStudent.vue'
import VInfoTeacher from './InfoTeacher.vue'
import auth from '../auth'

export default {
  name: 'main',
  components: {
    VInfoStudent,
    VInfoTeacher
  },
  data () {
    return {
      auth: auth
    }
  },
  methods: {
    getStudent () {
      this.status = auth.isStudent()
    }
  }
}
</script>

<style>
  .menus{
    text-align: center;
  }
</style>

