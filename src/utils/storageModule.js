export default {
  saveExams (exams) {
    sessionStorage.setItem('exams', exams)
  },
  getExams () {
    return sessionStorage.getItem('exams')
  }
}
