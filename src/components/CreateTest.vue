<template>
  <div id="CreateTest">
    <md-stepper class="createTest-stperHoriz" md-editable="true" md-elevation="0">
      <md-step id="createTest-first" class="createTest-step" md-button-back="" md-button-continue="Adicionar Questões">

      </md-step>
      <md-step class="createTest-step" v-for="" :key="" md-button-back="Voltar" md-button-continue="Próxima">

      </md-step>
      <md-step id="createTest-last" class="createTest-step" md-button-back="Voltar" md-button-continue="Finalizar Prova">

      </md-step>
    </md-stepper>
  </div>
</template>
<script>
export default {
  name: 'CreateTest',
  data () {
    return {

    }
  },
  mounted () {
    this.addLinks()
  },
  methods: {
    addLinks: function () {
      var y = document.getElementById('createTest-first')
      var x = y.document.querySelectorAll('div.md-step-numer')
      var z = x.document.getElementsByTagName('span').innerHtml
      z.set.Attribute('id', 'createTest-Create')
      var link = '<a href="#createTest-Create">' + z + '</a>'
      z.document.getElementsByTagName('span').innerHtml = link

      y = document.getElementById('createTest-last')
      x = y.document.querySelectorAll('div.md-step-numer')
      z = x.document.getElementsByTagName('span').innerHtml
      z.set.Attribute('id', 'createTest-List')
      link = '<a href="#createTest-List">' + z + '</a>'
      z.document.getElementsByTagName('span').innerHtml = link
    }
  }
}
</script>
<style>

#CreateTest {
  display: flex;
  width: 100%;
  min-height: 50vh;
  overflow-y: hidden;
}

.createTest-stperHoriz {
  position: relative;
  height: 150px;
}

.createTest-step {
  height: 445px;
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  margin: 50px;
  padding: 100px;
}

</style>
