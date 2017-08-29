<template>
  <div class="realizeForm">
    <v-card class="realizeForm-card lighten-1 z-depth-1 mb-5 pa-5" height="80vh" width="500vw">
      <v-container fluid>
        <v-layout row justify-space-around>
          <v-flex md6 fill-height="true">
            <p class="realizeForm-question-title">{{question.description}}</p>
          </v-flex>
          <v-flex md4 fill-height="true">
            <form>
              <v-text-field label="Resposta da Questão" v-model="question.answer" v-if="!question.isAlternative" textarea></v-text-field>
              <span v-if="question.isAlternative">Selecione a alternativa correta</span>
              <div class="" v-if="question.isAlternative" v-for="alternative in question.alternatives" :key="alternative.key">
                <v-radio color="primary" :label="alternative.description" v-model="realizedQuestion.answer" :input-value="alternative.id"></v-radio>
              </div>
              <v-btn primary type="submit">Responder Questão</v-btn>
            </form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'realizeForm',
  data: () => ({
    realizedQuestion: {questionId: '', answer: '', isAlternative: false}
  }),
  mounted () {
    if (this.question.isAlternative) {
      this.realizedQuestion.isAlternative = true
    }
  },
  props: ['question']
}
</script>
<style lang="css" scoped>
.realizeForm-card {
  width: 90vw;
}

.realizeForm-question-title {
  color: #000;
  font-size: 20px;
  letter-spacing: 1px;
}

</style>
