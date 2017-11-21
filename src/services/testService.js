import storage from '../utils/storageModule'

export default {
  saveTest (test) {
    storage.session.set('test', test)
  },
  getTest () {
    return storage.session.get('test')
  },
  removeTest () {
    storage.session.remove('test')
  },
  saveTestId (testId) {
    storage.session.set('testId', testId)
  },
  getTestId () {
    return storage.session.get('testId')
  },
  removeTestId () {
    storage.session.remove('testId')
  }
}
