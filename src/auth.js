import baseService from './services/baseService'

export default {
  logIn (email, password) {
    return baseService.login(email, password).then(response => {
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('userId', response.data.userId)
        localStorage.setItem('teacherId', response.data.teacherId)
        localStorage.setItem('studentId', response.data.studentId)
      }
    })
  },
  logout () {
    localStorage.clear()
  },
  loggedIn () {
    return localStorage.getItem('token') !== null
  },
  isTeacher () {
    return localStorage.getItem('teacherId') !== null
  },
  isStudent () {
    return localStorage.getItem('studentId') !== null
  },
  teacherId () {
    return localStorage.getItem('teacherId')
  },
  studentId () {
    return localStorage.getItem('studentId')
  }
}
