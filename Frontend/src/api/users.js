import api from './axios'

export const login = payload => api.post('/users/login', payload)
export const register = payload => api.post('/users/register', payload)

const apis = {
  login,
  register
}
export default apis
