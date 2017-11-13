<template>
  <div id="my-test">
    <MyCorrectedTest v-if="status === 4" :test="classTest"></MyCorrectedTest>
    <MyUncorrectedTest v-if="status === 3" :test="classTest"></MyUncorrectedTest>
    <MyAppliedTest v-if="status === 2" :test="classTest"></MyAppliedTest>
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
    classTest: {},
    status: 0
  }),
  mounted () {
    this.getClassTest()
  },
  methods: {
    getClassTest () {
      this.classTest = ClassTestService.getClassTest()
      this.status = ClassTestService.getClassTestStatus()
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
