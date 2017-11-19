<template>
<div class="viewTest">
  <div class="viewTest-header">
    <h1 class="viewTest-TestTitle print">{{test.title}}</h1>
    <h2 class="viewTest-TestDescription print">{{test.description}}</h2>
  </div>
  <div class="viewTest-Test" v-for="(question, index) in test.questions" :key="question.key">
    <p>Questão {{index + 1}} - {{question.description}}</p>
    <div v-if="!question.isAlternative">
      <hr class="viewTest-LineQuestion" v-for="n in 5">
    </div>
    <div v-else-if="question.isAlternative" v-for="a in question.alternatives" :key="a.key">
      <span class="viewTest-Alternative">
        <v-icon class="pa-2" v-if="!a.isCorrect">
          panorama_fish_eye
        </v-icon>
        <v-icon class="pa-2" v-if="a.isCorrect">
          highlight_off
        </v-icon>
        {{a.description}}
      </span>
    </div>
  </div>
</div>
</template>

<script>
import baseService from '../services/baseService'

export default {
  name: 'viewTest',
  components: {
  },
  mounted () {
    this.getTest()
  },
  methods: {
    getTest: function () {
      let id = this.$route.params.id
      baseService.get(`/test/${id}`).then(r => {
        console.log(r.data)
        this.test = r.data
      })
    }
  },
  data: () => ({
    e6: 0,
    test: {}
  })
}
</script>


<style>
.viewTest {
  /*height: 100vh;*/
  width: 100vw;
  background-color: #ECECEC;
  overflow-y: auto;
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

.viewTest-TestDescription {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 16pt;
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
