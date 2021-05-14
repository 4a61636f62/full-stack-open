import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ name, handleLogout }) => {
  const style = {
    padding: 5
  }

  return (
    <div>
      <Link style={style} to='/'>blogs</Link>
      <Link style={style} to='/users/'>users</Link>
      <label>{name} logged in</label>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default Navbar
