<template>
  <div class="answerQuestion">
    <v-card class="answerQuestion-card lighten-1 z-depth-1 mt-3 mb-3 " height="50vh" width="500vw">
      <v-container fluid>
        <v-layout row justify-space-around>
          <v-flex md12 fill-height="true" v-if="status === 2">
            <p class="answerQuestion-question-title">Prova Finalizada</p>
          </v-flex>
          <v-flex md6 fill-height="true" v-if="status !== 2">
            <strong style="font-size: 23px;">Questão {{index}}</strong>
            <p class="answerQuestion-question-title">{{question.description}}</p>
          </v-flex>
          <v-flex md4 fill-height="true" v-if="status !== 2">
            <form>
              <v-text-field class="input-group--focused" label="Resposta da Questão" v-model="realizedQuestion.essayAnswer" v-if="!question.isAlternative" multi-line></v-text-field>
              <span v-if="question.isAlternative">Selecione a alternativa correta</span>
              <AlternativeQuestion v-if="question.isAlternative" @get-alternative="getAlternative" :question="question" :realizeQuestion="realizedQuestion"></AlternativeQuestion>
            </form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import AlternativeQuestion from './AlternativeQuestion'

export default {
  name: 'answerQuestion',
  props: ['question', 'realizedQuestion', 'index', 'status'],
  components: {
    AlternativeQuestion
  },
  methods: {
    getAlternative (alternative) {
      this.realizedQuestion = alternative
    }
  }
}
</script>
<style lang="css" scoped>
.answerQuestion-card {
  width: 90vw;
  overflow: auto;
  overflow-x: hidden;
}

.answerQuestion-question-title {
  color: #000;
  font-size: 20px;
  letter-spacing: 1px;
}

</style>
