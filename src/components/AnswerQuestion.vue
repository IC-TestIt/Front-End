<template>
  <div class="answerQuestion">
    <v-card class="answerQuestion-card lighten-1 z-depth-1 mb-5 pa-5" height="80vh" width="500vw">
      <v-container fluid>
        <v-layout row justify-space-around>
          <v-flex md6 fill-height="true">
            <p class="answerQuestion-question-title">{{question.description}}</p>
          </v-flex>
          <v-flex md4 fill-height="true">
            <form>
              <v-text-field label="Resposta da Questão" v-model="question.answer" v-if="!question.isAlternative" textarea></v-text-field>
              <span v-if="question.isAlternative">Selecione a alternativa correta</span>
              <div class="" v-if="question.isAlternative" v-for="(alternative, index) in question.alternatives" :key="alternative.key">
                <v-radio color="primary" :tabindex="index" :label="alternative.description" v-model="answers[index]" :value="alternative.id"></v-radio>
              </div>
              <v-btn primary v-on:click="imprimeResposta()">Responder Questão</v-btn>
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
  data: () => ({
    realizedQuestion: {questionId: '', answer: '', isAlternative: false},
    question: {description: '', isAlternative: true, alternatives: [{description: '1', id: 1}, {description: '2', id: 2}, {description: '3', id: 3}]},
    answers: []
  }),
  methods: {
    imprimeResposta () {
      console.log(this.answers)
    }
  },
  mounted () {
    if (this.question.isAlternative) {
      this.realizedQuestion.isAlternative = true
    }
  }
  // props: ['question']
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
