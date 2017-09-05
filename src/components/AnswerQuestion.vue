<template>
  <div class="answerQuestion">
    <v-card class="answerQuestion-card lighten-1 z-depth-1 mt-3 mb-5 pa-5" height="60vh" width="500vw">
      <v-container fluid>
        <v-layout row justify-space-around>
          <v-flex md6 fill-height="true">
            <p class="answerQuestion-question-title">{{ question.description }}</p>
          </v-flex>
          <v-flex md4 fill-height="true">
            <form>
              <v-text-field label="Resposta da Questão" v-model="realizedQuestion.essayAnswer" v-if="!question.isAlternative" textarea></v-text-field>
              <span v-if="question.isAlternative">Selecione a alternativa correta</span>
              <div class="" v-if="question.isAlternative" v-for="alternative in question.alternatives" :key="alternative.key">
                <v-radio color="primary" :label="alternative.description" v-model="realizedQuestion.alternativeId" :value="alternative.id"></v-radio>
              </div>
              <v-btn>Responder Questão</v-btn>
            </form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'answerQuestion',
  props: ['question', 'realizedQuestion']
}
</script>
<style lang="css" scoped>
.answerQuestion-card {
  width: 90vw;
}

.answerQuestion-question-title {
  color: #000;
  font-size: 20px;
  letter-spacing: 1px;
}

</style>
