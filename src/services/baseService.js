import axios from 'axios'

const http = axios.create({
  baseURL: `${process.env.API}/api/`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const login = (email, password) => {
  const params = new URLSearchParams()
  params.append('email', email)
  params.append('password', password)

  return axios.post(`${process.env.API}/token`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

const get = (route) => {
  return http.get(route)
}

const post = (route, data) => {
  return http.post(route, data)
}

const put = (route, data) => {
  return http.put(route, data)
}

const del = (route) => {
  return http.delete(route)
}

export default {
  login,
  get,
  post,
  put,
  del
}
