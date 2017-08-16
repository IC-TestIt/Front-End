<template>
<div class="viewTest">
  <div class="viewTest-header">
    <h1 class="viewTest-TestTitle print">{{test.description}}</h1>
  </div>
  <div class="viewTest-Test">
    <v-stepper vertical v-model="e6">
      <div v-for="(question, index) in test.questions" :key="question.key">
        <v-stepper-step step="T" v-bind:complete="e6 > index" editable>
          <h3 class="viewTest-QuestionTitle print">{{question.description}}</h3>
        </v-stepper-step>
        <v-stepper-content step="T" editable>
          <hr class="viewTest-LineQuestion print" v-if="question.alternatives === undefined ">
          <hr class="viewTest-LineQuestion print" v-if="question.alternatives === undefined ">
          <hr class="viewTest-LineQuestion print" v-if="question.alternatives === undefined ">
          <hr class="viewTest-LineQuestion print" v-if="question.alternatives === undefined ">
          <hr class="viewTest-LineQuestion print" v-if="question.alternatives === undefined ">
          <hr class="viewTest-LineQuestion print" v-if="question.alternatives === undefined ">
          <div class="viewTest-AlternativeCircle pa-2 print" v-if="question.alternatives !== undefined" v-for="a in question.alternatives" :key="a.key">
            <span class="viewTest-Alternative"><v-icon class="pa-2">panorama_fish_eye</v-icon>{{a.description}}</span>
          </div>
          <!-- <v-btn primary @click.native="e6 = index + 1">Continue</v-btn> -->
          <!-- <v-btn flat @click.native="e6 = index - 1">Cancel</v-btn> -->
        </v-stepper-content>
      </div>
    </v-stepper>
  </div>
</div>
</template>

<script>
import baseService from '../services/baseService'

export default {
  name: 'viewTest',
  mounted () {
    this.getTest()
  },
  methods: {
    getTest: function () {
      let id = this.$route.params.id
      baseService.get(`/test/${id}`).then(r => {
        this.test = r.data
      })
    }
  },
  data: () => ({
    e6: 0,
    test: {
      description: 'Matematica',
      questions: [{
        description: '1+1',
        alternatives: [{
          description: '1'
        }, {
          description: '2'
        }, {
          description: '3'
        }]
      }, {
        description: '2+2'

      }, {
        description: '3+3'

      }, {
        description: '4+4',
        alternatives: [{
          description: '5'
        }, {
          description: '7'
        }, {
          description: '8'
        }]
      }, {
        description: '5+5'

      }]
    }
  })
}
</script>


<style>
.viewTest {
  height: 100vh;
  width: 100vw;
  background-color: #ECECEC;
}

.viewTest-header {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: space-between;
  width: 60vw;
  height: 5vh;
  margin-left: 250px;
  margin-top: 50px;
  margin-bottom: 50px;
}

.viewTest-header p {
  font-size: 15px;
}

.viewTest-LineQuestion {
  margin: 30px;
  color: #000;
}

.viewTest-TestTitle {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 20pt;
  text-align: center;
  color: #000;
}

.viewTest-QuestionTitle {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14pt;
  color: #000;
}

.viewTest-Alternative {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14pt;
  color: #000;
}

.viewTest-AlternativeCircle {
  display: flex;
  flex: 1;
  justify-content: flex-start;
}

.viewTest-Test {
  width: 80vw;
  margin-left: 10vw;
  margin-bottom: 5vh;
}

.home {
  overflow-y: scroll;
}

@media print {
  * {
    background: transparent !important;
    color: #000 !important;
    text-shadow: none !important;
    filter: none !important;
    -ms-filter: none !important;
  }

  .viewTest {
    height: 100%;
    width: 100%;
  }

  p {
    widows: 3;
  }

  p {
    orphans: 3;
  }

  .home {
    background-color: #FFF;
    /*overflow: visible;*/
    overflow: auto;

    page-break-before: always;
  }

  .header {
    display: none !important;
  }

  .footer {
    display: none !important;
  }

  .viewTest-Test {
    page-break-after: auto;
    /*overflow: visible;*/
    overflow: auto;
  }

  .print {
    page-break-after: auto;
    /*page-break-before: always;*/
    overflow: auto;
  }

  body {
    margin: 0;
    padding: 0;
    line-height: 1.4em;
    overflow: auto;
  }
}
</style>
