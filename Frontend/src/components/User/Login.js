import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',

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
            error={errors.email}
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

        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
