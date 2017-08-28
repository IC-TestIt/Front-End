import axios from 'axios'

const http = axios.create({
  baseURL: `${process.env.PDF}`
})

const post = (route, data) => {
  return http.post(route, data)
}

const get = () => {
  return `${process.env.PDF}` + '/PDF/prova.pdf'
}

export default {
  post,
  get
}
