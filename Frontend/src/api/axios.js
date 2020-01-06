import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
})
api.interceptors.request.use(config => {
  console.log('Making request:', config.url)
  return config
})

/* const api = axios.create({
  baseURL: 'http://localhost:3001/api'
})
 */
export default api
