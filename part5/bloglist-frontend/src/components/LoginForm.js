import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={ ({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={ ({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
