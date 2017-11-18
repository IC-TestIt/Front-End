import storage from '../utils/storageModule'

export default {
  saveExams (exam) {
    storage.session.set('exams', exam)
  },
  getExams () {
    return storage.session.get('exams')
  },
  saveExamId (id) {
    storage.session.set('examId', id)
  },
  getExamId () {
    return storage.session.get('examId')
  }
}
