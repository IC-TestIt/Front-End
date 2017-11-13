import storage from '../utils/storageModule'

export default {
  saveClassTest (classTest) {
    storage.session.set('classTest', classTest)
  },
  getClassTest () {
    return storage.session.get('classTest')
  },
  saveClassTestStatus (status) {
    storage.session.set('classTestStatus', status)
  },
  getClassTestStatus () {
    return storage.session.get('classTestStatus')
  }
}
