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
  }
}
