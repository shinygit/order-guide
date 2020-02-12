import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'

// const REGISTER_USER = gql``

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    isSubmitting: false,
    errors: {}
  })

  const { errors } = registerForm

  const handleChangeInput = event => {
    setRegisterForm({
      ...registerForm,
      [event.target.id]: event.target.value
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    setRegisterForm({
      ...registerForm,
      isSubmitting: true
    })
  }

  const newUser = {
    name: registerForm.name,
    email: registerForm.email,
    password: registerForm.password,
    password2: registerForm.password2
  }

  return (
    <div>
      <p>
        Already have an account? <Link to='/login'>Login.</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={handleChangeInput}
            value={registerForm.name}
            error={errors.name}
            id='name'
            type='text'
          />
          <label htmlFor='name'>Name</label>
        </div>
        <div>
          <input
            onChange={handleChangeInput}
            value={registerForm.email}
            error={errors.email}
            id='email'
            type='text'
          />
          <label htmlFor='email'>Email</label>
        </div>
        <div>
          <input
            onChange={handleChangeInput}
            value={registerForm.password}
            error={errors.password}
            id='password'
            type='password'
          />
          <label htmlFor='password'>Password</label>
        </div>
        <div>
          <input
            onChange={handleChangeInput}
            value={registerForm.password2}
            error={errors.password2}
            id='password2'
            type='password'
          />
          <label htmlFor='password'>Confirm Password</label>
        </div>
        <div>
          <button disabled={registerForm.isSubmitting} type='submit'>
            {registerForm.isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
