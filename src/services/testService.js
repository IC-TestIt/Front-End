import storage from '../utils/storageModule'

export default {
  saveTest (test) {
    storage.session.set('test', test)
  },
  getTest () {
    return storage.session.get('test')
  }
}
