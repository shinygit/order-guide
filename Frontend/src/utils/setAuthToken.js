import api from '../api/axios'
const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    api.defaults.headers.Authorization = token
  } else {
    // Delete auth header
    delete api.defaults.headers.Authorization
  }
}
export default setAuthToken
