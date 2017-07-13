<template lang="html">
  <div class="vform">
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <label>Nome</label>
        <md-input required></md-input>
      </md-input-container>

      <md-input-container>
        <label>Email</label>
        <md-input type="email" required></md-input>
      </md-input-container>

      <md-input-container>
        <label>Senha</label>
        <md-input type="password" required></md-input>
      </md-input-container>

      <md-input-container>
        <label>Confirme a Senha</label>
        <md-input type="password" required></md-input>
      </md-input-container>

      <md-input-container>
        <label>Data de Nascimento</label>
        <md-input type="date"></md-input>
      </md-input-container>

      <md-input-container>
        <label for="type">Tipo de Identificador</label>
        <md-select name="type" id="type" required>
          <md-option value="cpf">CPF</md-option>
          <md-option value="rg">RG</md-option>
        </md-select>
      </md-input-container>

      <md-input-container>
        <label>Identificador</label>
        <md-input required></md-input>
      </md-input-container>


      <md-button class="md-raised md-primary">Cadastrar</md-button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'vform'
}
</script>

<style lang="css">
</style>
