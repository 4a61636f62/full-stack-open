import React from 'react'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login(username.props.value, password.props.value))
      history.push('/')
    } catch (error) {
      dispatch(setNotification(error.message, 'red', 10))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username.props}/>
      </div>
      <div>
        password
        <input {...password.props}/>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
