import React, { useEffect, useState } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'

const RouteLogic = (props) => {
  const [returnedRoute, setReturnedRoute] = useState('')
  const { me } = props
  const history = useHistory()
  useEffect(() => {
    if (
      me === null &&
      history.location.pathname !== '/login' &&
      history.location.pathname !== '/register' &&
      history.location.pathname !== '/receiverlogin'
    ) {
      localStorage.clear()
      setReturnedRoute(<Redirect to='/login' />)
    } else if (
      (me !== null && history.location.pathname == '/login') ||
      history.location.pathname == '/register' ||
      history.location.pathname == '/receiverlogin'
    ) {
      setReturnedRoute(<Redirect to='/' />)
    } else if (
      me !== null &&
      me.__typename === 'Receiver' &&
      history.location.pathname !== '/receiving'
    ) {
      setReturnedRoute(<Redirect to='/receiving' />)
    } else setReturnedRoute(<Route {...props} />)
    /* switch (props.path) {
      case '/login':
        return setReturnedRoute(<Route {...props} />)

      case '/register':
        return setReturnedRoute(<Route {...props} />)

      case '/receiverlogin':
        return setReturnedRoute(<Route {...props} />)

      case '/suppliers':
        return setReturnedRoute(<Route {...props} />)

      case '/manual':
        return setReturnedRoute(<Route {...props} />)

      case '/receiving':
        return setReturnedRoute(<Route {...props} />)

      case '/':
        return setReturnedRoute(<Route {...props} />)

      default:
        return setReturnedRoute(<Route {...props} />)
    } */
  }, [props])
  return returnedRoute
}
export default RouteLogic
