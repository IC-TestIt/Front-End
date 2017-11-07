<template>
  <div id="my-test">
    <MyCorrectedTest v-if="classTest.status === 4" :test="classTest"></MyCorrectedTest>
    <MyUncorrectedTest v-if="classTest.status === 3" :test="classTest"></MyUncorrectedTest>
    <MyAppliedTest v-if="classTest.status === 2" :test="classTest"></MyAppliedTest>
  </div>
</template>
<script>
import MyCorrectedTest from './MyCorrectedTest'
import MyUncorrectedTest from './MyUncorrectedTest'
import MyAppliedTest from './MyAppliedTest'
import ClassTestService from '../services/classTestService'

export default {
  name: 'my-test',
  components: {
    MyCorrectedTest,
    MyUncorrectedTest,
    MyAppliedTest
  },
  data: () => ({
    classTest: {}
  }),
  mounted () {
    this.getClassTest()
  },
  methods: {
    getClassTest () {
      this.classTest = ClassTestService.getClassTest()
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
