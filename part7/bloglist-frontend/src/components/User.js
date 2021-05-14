import React from 'react'
import PropTypes from 'prop-types'

const User = ({ name, blogs }) => (
  <div>
    <h2>{name}</h2>
    <h3>added blogs</h3>
    <ul>
    {blogs.map(blog => (
      <li key={blog.id}>{blog.title}</li>
    ))}
    </ul>
  </div>
)

User.propTypes = {
  name: PropTypes.string.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default User
