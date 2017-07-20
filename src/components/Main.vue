<template lang="html">
  <div class="main has-ripple blue">
    <div v-show="loggedIn" class="logout">
      <a v-on:click="logOut()">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </a>
    </div>
    <md-ink-ripple />
    <md-list class="list">
      <md-toolbar md-theme="white">
        <span class="md-title">Menu</span>
      </md-toolbar>
      <md-divider></md-divider>
      <md-list-item href="#/home">Provas</md-list-item>
      <md-list-item href="#/home">Turmas</md-list-item>
      <md-list-item href="#/home">Configurações</md-list-item>
    </md-list>
    <div class="dash">

      <md-whiteframe class="a dash-item has-ripple blue">
        <md-ink-ripple />
        <md-icon class="md-size-4x md-accent">subject</md-icon>
        <span>Provas</span>
      </md-whiteframe>

      <md-whiteframe class="b dash-item has-ripple blue">
        <md-ink-ripple />
        <md-icon class="md-size-4x md-accent">border_color</md-icon>
        <span>Realizar Prova</span>

      </md-whiteframe>

      <md-whiteframe class="c dash-item has-ripple blue">
        <md-ink-ripple />
        <md-icon class="md-size-4x md-accent">edit</md-icon>
        <span>Provas Realizadas</span>


      </md-whiteframe>

      <md-whiteframe class="d dash-item has-ripple blue">
        <md-ink-ripple />
        <md-icon class="md-size-4x md-accent">check</md-icon>
        <span>Notas</span>


      </md-whiteframe>

      <md-whiteframe class="e dash-item has-ripple blue">
        <md-ink-ripple />
        <md-icon class="md-size-4x md-accent">folder</md-icon>
        <span>Materiais de Consulta</span>


      </md-whiteframe>

      <md-whiteframe class="f dash-item has-ripple blue">
        <md-ink-ripple />
        <md-icon class="md-size-4x md-accent">trending_up</md-icon>
        <span>Estatisticas</span>

      </md-whiteframe>

    </div>
  </div>

</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      loggedIn: false
    }
  },
  mounted () {
    this.getMsg()
    this.loggedIn = localStorage.getItem('id_token') !== null
  },
  methods: {
    getMsg: function () {
      this.$http.get(`${process.env.API}/api`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }
      }).then(r => {
        console.log(r.body)
      })
    },
    logOut: function () {
      localStorage.clear()
      this.loggedIn = false
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">

.main {
  display: flex;
  min-height: 80vh;
  min-width: 40vw;
  background-color: #ECECEC;
  height: 200px;
}

.list {
  display: flex;
  /*align-items: center;*/
  text-decoration: none;
  border-right: 1px solid #000;
  border-radius: 2px;
}

.dash {
  display: grid;
  width: 100%;
  height: 100%;
  margin: 20px;
  grid-gap: 20px;
  grid-template-columns: auto;
  grid-template-rows: 220px 220px;
  grid-template-areas:
    'a b c '
    'd e f '
  ;
}

.a {
  grid-area: a;
}

.b {
  grid-area: b;
}

.c {
  grid-area: c;
}

.d {
  grid-area: d;
}

.e {
  grid-area: e;
}

.f {
  grid-area: f;
}

.dash-item {
  display: flex;
  height: 100%;
  width: 100%;
  /*justify-content: center;*/
  align-items: center;
  flex-direction: column;
  background-color: #FAFAFA;
}

hr {
  color: #000;
  width: 100%;
}

.list span{
  color:#FFF;
}

.list a {
  color: #FFF;
}

.dash-item span {
  /*text-decoration: none;*/
  /*color: #FF8F00;*/
  color: #006;
  margin: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.logout {
  display: flex;
  align-items: center;
  position: absolute;
  left: 90vw;
  top: 2vh;
  color: #006;
}

.logout i {
  font-size: 5vh;
}
</style>
