import storage from '../utils/storageModule'

export default {
  saveExams (exams) {
    storage.session.setItem('exams', exams)
  },
  getExams () {
    storage.session.getItem('exams')
  }
}
