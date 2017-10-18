<template>
  <div class="correct-tests">
    <v-container fluid grid-list-md>
      <v-layout column justify-center class="ml-5">
        <v-flex d-flex xs12>
          <h1 class="title text-xs-center">Corrigir Prova</h1>
        </v-flex>
        <v-flex d-flex xs12 class="ml-5">
          <v-card height="60px" class="card2">
            <v-layout row>
              <v-flex d-flex xs2>
                <v-menu offset-y absolute class="ml-2 mt-1">
                   <v-btn class="indigo darken-4" dark slot="activator">QUESTÕES</v-btn>
                   <v-list>
                   <v-list-tile v-for="item in items" :key="item.title" @click="">
                   <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                   </v-list-tile>
                   </v-list>
                </v-menu>
              </v-flex>
              <v-flex d-flex xs5 class="mr-5">
                <v-text-field disabled label="Aluno"></v-text-field>
              </v-flex>
              <v-flex d-flex xs1 class="mt-2">
                <v-btn color="indigo" dark>
                  <v-icon right dark>keyboard_arrow_left</v-icon>
                </v-btn>
              </v-flex>
              <v-flex d-flex xs1 class="mt-2">
                <v-btn color="indigo" dark>
                  <v-icon right dark>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 class="ml-1">
          <v-card class="ml-5 card" height="350px">
            <v-layout row>
              <v-flex xs6>
                <v-layout column class="ml-3">
                  <v-flex xs12>
                    <v-text-field box multi-line disabled label="Resposta do Aluno"></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-if="showAnswer">
                    <v-text-field box multi-line disabled label="Resposta do Professor"></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-if="comments">
                    <v-text-field box multi-line disabled label="Comentarios do Professor"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs5 class="ml-5">
                <v-layout column class="ml-3">
                  <v-flex xs12>
                    <v-card class="green darken-1 white--text mt-3 text-xs-center">
                      <v-card-title primary-title>
                        <v-flex xs12>
                          <div class="headline">{{questionGrade}}%</div>
                        </v-flex>
                        <v-flex xs12>
                          <div class="">Porcentagem de Acerto</div>
                        </v-flex>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 class="mt-2 py-2">
                    <v-layout row wrap>
                      <v-flex xs5>
                        <v-checkbox v-bind:label="`Mostrar Reposta`" v-model="showAnswer" light></v-checkbox>
                      </v-flex>
                      <v-flex xs6>
                        <v-checkbox v-bind:label="`Adicionar Comentario`" v-model="comments" light></v-checkbox>
                      </v-flex>
                      <v-flex xs5>
                        <v-checkbox v-bind:label="`Alterar Nota`" v-model="changeGrade" light></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 v-if="changeGrade">
                    <v-layout row>
                      <v-flex xs9>
                        <v-slider label="%" :max="100" v-model="questionGrade"></v-slider>
                      </v-flex>
                      <v-flex xs2>
                        <v-text-field v-model="questionGrade" type="number"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'CorrectTests',
  data () {
    return {
      number: 0,
      dialog: false,
      hidden: false,
      showAnswer: false,
      comments: false,
      changeGrade: false,
      questionGrade: 0,
      toggle_multiple: [0, 1, 2],
      items: [
        { title: 'Questão 1' },
        { title: 'Questão 2' },
        { title: 'Questão 3' },
        { title: 'Questão 4' }
      ]
    }
  }
}
</script>

<style lang="css">
.correct-tests{
  min-height: 100%;
  min-width: 100%;
}

.menu {
  overflow: hidden;
}

.title {
  color: #000;
}

.card {
  overflow-y: auto;
  overflow-x: hidden;
}

.card2 {
  overflow: hidden;
}

#btn__hide{
  background-color: #a20021;
  margin-left: 533px;
}


</style>
