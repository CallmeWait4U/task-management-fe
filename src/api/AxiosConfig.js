import axios from 'axios'

export const BASE_URL = 'http://localhost:3001';

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 1000
})

api.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error)
    }
)