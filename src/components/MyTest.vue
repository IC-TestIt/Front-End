<template>
  <div id="my-test">
    <MyCorrectedTest v-if="status === 4" :test="classTest"></MyCorrectedTest>
    <MyUncorrectedTest v-if="status === 3" :test="classTest" :testId="testId"></MyUncorrectedTest>
    <MyAppliedTest v-if="status === 2" :test="classTest"></MyAppliedTest>
  </div>
</template>
<script>
import MyCorrectedTest from './MyCorrectedTest'
import MyUncorrectedTest from './MyUncorrectedTest'
import MyAppliedTest from './MyAppliedTest'
import ClassTestService from '../services/classTestService'
import testService from '../services/testService'

export default {
  name: 'my-test',
  components: {
    MyCorrectedTest,
    MyUncorrectedTest,
    MyAppliedTest
  },
  data: () => ({
    classTest: {},
    status: 0,
    testId: 0
  }),
  mounted () {
    this.getClassTest()
  },
  methods: {
    getClassTest () {
      this.classTest = ClassTestService.getClassTest()
      this.status = ClassTestService.getClassTestStatus()
      this.testId = testService.getTestId()
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
