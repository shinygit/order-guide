import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/users'
})

export const login = payload => api.post('/login', payload)
export const register = payload => api.post('/register', payload)
