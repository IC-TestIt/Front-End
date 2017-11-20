import storage from '../utils/storageModule'

export default {
  saveTest (test) {
    storage.session.set('test', test)
  },
  getTest () {
    return storage.session.get('test')
  },
  saveTestId (id) {
    storage.session.set('testId', id)
  },
  getTestId () {
    return storage.session.get('testId')
  }
}
