import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const REGISTER_USER = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
    }
  }
`

const Register = () => {
  const history = useHistory()
  const [signUp] = useMutation(REGISTER_USER)
  const [registerForm, setRegisterForm] = useState({
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

  const handleSubmit = async event => {
    event.preventDefault()
    if (registerForm.password !== registerForm.password2) {
      setRegisterForm({
        ...registerForm,
        errors: { password2: 'Passwords must match.' }
      })
      return
    }
    setRegisterForm({
      ...registerForm,
      isSubmitting: true
    })
    const result = await signUp({
      variables: {
        email: registerForm.email,
        password: registerForm.password
      }
    }).catch(e => {
      console.log(e)
    })

    if (result) {
      history.push('/login')
    }
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
