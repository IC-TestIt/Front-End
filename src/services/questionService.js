import storage from '../utils/storageModule'

export default {
  saveQuestions (questions) {
    storage.session.set('questions', questions)
  },
  getQuestions () {
    return storage.session.get('questions')
  },
  removeQuestions () {
    storage.session.remove('questions')
  },
  saveRealizedQuestions (questions) {
    storage.session.set('realized-questions', questions)
  },
  getRealizedQuestions () {
    return storage.session.get('realized-questions')
  },
  removeRealizedQuestions () {
    storage.session.remove('realized-questions')
  }
}
