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
  saveClassTestId (id) {
    storage.session.set('classTestId', id)
  },
  getClassTestStatus () {
    return storage.session.get('classTestStatus')
  },
  getClassTestId () {
    return storage.session.get('classTestId')
  }
}
