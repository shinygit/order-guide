import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
const userReducer = (state, action) => {
  switch (action.type) {
    case 'RESUME':
      console.log(action.payload)
      setAuthToken(action.payload)
      return {
        ...state,
        isAuthenticated: true,
        id: jwt_decode(action.payload).id,
        name: jwt_decode(action.payload).name,
        token: action.payload
      }
    case 'LOGIN':
      console.log(action.payload.token)
      setAuthToken(action.payload.token)

      localStorage.setItem('id', jwt_decode(action.payload.token).id)
      localStorage.setItem('user', jwt_decode(action.payload.token).name)
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        isAuthenticated: true,
        id: jwt_decode(action.payload.token).id,
        name: jwt_decode(action.payload.token).name,
        token: action.payload.token
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
