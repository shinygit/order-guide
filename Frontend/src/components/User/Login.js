import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import api from '../../api/users'

const Login = () => {
  const history = useHistory()
  const { dispatchUser } = useContext(UserContext)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    isSubmitting: false,
    errors: {}
  })

  const { errors } = loginForm

  const handleChangeInput = event => {
    setLoginForm({
      ...loginForm,
      [event.target.id]: event.target.value
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    setLoginForm({
      ...loginForm,
      isSubmitting: true,
      errors: {}
    })
    api
      .login(userData)
      .then(res => {
        if (res.data.success) {
          return res
        }
        throw res
      })
      .then(res => {
        dispatchUser({
          type: 'LOGIN',
          payload: res.data
        })
        return res
      })
      .then(history.push('/'))
      .catch(error => {
        setLoginForm({
          ...loginForm,
          isSubmitting: false,
          errors: error.response.data
        })
      })
  }

  const userData = {
    email: loginForm.email,
    password: loginForm.password
  }

  console.log(userData)

  return (
    <div>
      <p>
        Don't have an account? <Link to='/register'>Register.</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={handleChangeInput}
            value={loginForm.email}
            error={errors.email} // meterialui prop
            id='email'
            type='text'
          />
          <label htmlFor='email'>Email</label>
        </div>
        <div>
          <input
            onChange={handleChangeInput}
            value={loginForm.password}
            error={errors.password}
            id='password'
            type='password'
          />
          <label htmlFor='password'>Password</label>
        </div>
        <div>{errors.email || errors.password || errors.emailnotfound}</div>
        <div>
          <button disabled={loginForm.isSubmitting} type='submit'>
            {loginForm.isSubmitting ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
