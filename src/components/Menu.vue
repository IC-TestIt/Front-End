<template>
    <v-navigation-drawer persistent light :mini-variant.sync="mini" v-model="drawer" overflow class="grey darken-1">
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar tag="div" class="light-blue darken-1 my-1 py-3">
              <v-list-tile-avatar>
                <img src="" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="white--text">Bem-vindo</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list class="grey darken-1 my-4">
          <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
            <v-list-tile slot="item">
              <v-list-tile-action>
                <v-icon class="world">{{ item.action }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="world">{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" class="grey lighten-1">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
</template>

  <script>
  export default {
    name: 'vmenu',
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: true,
        items: [
          {
            action: 'create',
            title: 'PROVAS',
            items: [
              { title: 'Cadastrar' },
              { title: 'Minhas Provas' }
            ]
          },
          {
            action: 'people',
            title: 'TURMAS',
            active: false,
            items: [
              { title: 'Item' },
              { title: 'Item' }
            ],
            right: true,
            rightDrawer: true
          }
        ]
      }
    }
}
  </script>

