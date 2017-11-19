<template>
  <div class="menuBar">
       <v-toolbar flat dark class="transparent indigo darken-4 py-3">
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title v-model="name">{{ name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!--<v-btn 
          icon
          fab
          v-on:click="GoHome ()">
              inicio            
          </v-btn>-->
         </v-toolbar>
         <v-list class="white my-4">
          
           <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
             <v-list-tile slot="item">
               
               <v-list-tile-action>
                 <v-icon class="world">{{ item.action }}</v-icon>
               </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title class="world" v-if="item.link === undefined">{{ item.title }}</v-list-tile-title>
                 <a v-if="item.link !== undefined" :href="item.link">
                   <v-list-tile-title class="world">{{ item.title }}</v-list-tile-title>
                  </a>
               </v-list-tile-content>
               <v-list-tile-action v-if="item.link === undefined">
                 <v-icon>keyboard_arrow_down</v-icon>
               </v-list-tile-action>
             </v-list-tile>
             <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" class="white">
               <v-list-tile-content>
                  <a :href="subItem.link">
                  <v-list-tile-title >{{ subItem.title }}</v-list-tile-title>
                  </a>
               </v-list-tile-content>
               <v-list-tile-action>
                 <v-icon>{{ subItem.action }}</v-icon>
               </v-list-tile-action>
             </v-list-tile>
           </v-list-group>
         </v-list>
  </div>
</template>

<script type="text/javascript">
import auth from '../auth'
import baseService from '../services/baseService'

export default {
  name: 'menuBar',
  data () {
    return {
      name: '',
      items: [
        {
          action: 'home',
          title: 'INICIO',
          link: '#/home'
        },
        {
          action: 'create',
          title: 'PROVAS',
          items: [
            { title: 'Cadastrar', link: '/#/prova' },
            { title: 'Minhas Provas', link: '/#/provas' }
          ]
        },
        {
          action: 'people',
          title: 'TURMAS',
          active: false,
          items: [
            { title: 'Criar Turma', link: '/#/turma' },
            { title: 'Minhas Turmas', link: '/#/turmas' }
          ],
          right: true,
          rightDrawer: true
        }
      ]
    }
  },
  methods: {
    getUser () {
      let id = auth.userId()
      baseService.get(`/user/${id}`).then(response => {
        if (response.status === 200) {
          this.name = response.data.name
        }
      })
    },
    GoHome () {
      this.$router.push('/home')
    }
  },
  mounted () {
    this.getUser()
  }
}

</script>
