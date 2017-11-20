import storage from '../utils/storageModule'

export default {
  saveClass (c) {
    storage.session.set('class', c)
  },
  getClass () {
    return storage.session.get('class')
  },
  saveClassId (id) {
    storage.session.set('classId', id)
  },
  getClassId () {
    return storage.session.get('classId')
  },
  saveEditingClass (c) {
    storage.session.set('editingClass', c)
  },
  getEditingClass () {
    return storage.session.get('editingClass')
  }
}
