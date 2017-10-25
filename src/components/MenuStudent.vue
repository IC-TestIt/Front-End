<template>
  <div class="menuBar">
       <v-toolbar flat class="transparent">
           <v-list class="pa-0">
             <v-list-tile avatar tag="div" class="indigo darken-4 py-3">
               <v-list-tile-content>
                 <v-list-tile-title  class="white--text headline" v-model="name">{{ name }}</v-list-tile-title>
               </v-list-tile-content>
             </v-list-tile>
           </v-list>
         </v-toolbar>
         <v-list class="white my-4">
           <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
             <v-list-tile slot="item">
               <v-list-tile-action>
                 <v-icon class="world">{{ item.action }}</v-icon>
               </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title class="world" :to="item.link">{{ item.title }}</v-list-tile-title>
               </v-list-tile-content>
               <v-list-tile-action>
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
          action: 'create',
          title: 'AVALIAÇÕES',
          items: [
            { title: 'Minhas Avaliações', link: '/#/avaliacoes' }
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
    }
  },
  mounted () {
    this.getUser()
  }
}

</script>
