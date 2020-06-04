import { client } from '../index'
import { Link, useHistory, useLocation } from 'react-router-dom'
const history = useHistory()
export const logout = () => {
  history.push('/login')
  localStorage.clear()
  client.resetStore()
  window.location.reload(true)
}
