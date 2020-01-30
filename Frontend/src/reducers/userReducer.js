import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
const userReducer = (state, action) => {
  switch (action.type) {
    case 'RESUME':
      setAuthToken(action.payload)
      return {
        ...state,
        isAuthenticated: true,
        id: jwt_decode(action.payload).id,
        name: jwt_decode(action.payload).username,
        token: action.payload
      }
    case 'LOGIN':
      setAuthToken(action.payload)
      localStorage.setItem('id', jwt_decode(action.payload).id)
      localStorage.setItem('user', jwt_decode(action.payload).username)
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        isAuthenticated: true,
        id: jwt_decode(action.payload).id,
        name: jwt_decode(action.payload).username,
        token: action.payload
      }
    case 'LOGOUT':
      setAuthToken(false)
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        id: null,
        name: null,
        token: null
      }
    case 'REGISTER':
    default:
      return state
  }
}
export default userReducer
