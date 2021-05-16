import React from 'react'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  Box,
  Button,
  Form,
  FormField,
  TextInput
} from 'grommet'

import { Secure } from 'grommet-icons'

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
      dispatch(setNotification(error.message, true))
    }
  }

  return (
    <Box
      flex
      justify='center'
      align='center'
      direction='column'
      margin={{
        top: 'xlarge'
      }}
    >
      <Secure size='large' color='brand'/>
      <h3>Log In</h3>
      <Form onSubmit={handleLogin}>
        <FormField
          name='username'
          label='username'
        >
          <TextInput
            {...username.props}
          />
        </FormField>
        <FormField
          name='password'
          label='password'
        >
          <TextInput
            {...password.props}
          />
        </FormField>
        <Box>
          <Button
            type='submit'
            primary
            label='Enter'
          />
        </Box>
      </Form>
    </Box>
  )
}

export default LoginForm
