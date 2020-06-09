import { client } from '../index'
import { useHistory } from 'react-router-dom'
const navigate = useNavigate()
export const logout = () => {
  navigate('/login')
  localStorage.clear()
  client.resetStore()
  window.location.reload(true)
}
