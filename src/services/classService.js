import storage from '../utils/storageModule'

export default {
  saveClass (c) {
    storage.session.set('class', c)
  },
  getClass () {
    return storage.session.get('class')
  }
}
