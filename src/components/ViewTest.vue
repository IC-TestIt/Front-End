<template>
<div class="viewTest">
  <h1 class="viewTest-TestTitle print">{{test.description}}</h1>
  <div id="printJS-form" class="viewTest-Test print" v-for="question in test.questions" :key="question.key">
    <h3 class="viewTest-QuestionTitle print">{{question.description}}</h3>
    <hr class="viewTest-LineQuestion print" v-if="question.alternatives == ''">
    <hr class="viewTest-LineQuestion print" v-if="question.alternatives == ''">
    <hr class="viewTest-LineQuestion print" v-if="question.alternatives == ''">
    <hr class="viewTest-LineQuestion print" v-if="question.alternatives == ''">
    <hr class="viewTest-LineQuestion print" v-if="question.alternatives == ''">
    <div class="print" v-if="question.alternatives != ''" v-for="a in question.alternatives" :key="a.key">
      <p class="viewTest-Alternative print">{{a.description}}</p>
    </div>
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
    test: {}
  })
}
</script>


<style>
.viewTest {
  height: 100vh;
  width: 80vw;
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
  font-size: 12pt;
  color: #000;
}

.viewTest-Test {
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
