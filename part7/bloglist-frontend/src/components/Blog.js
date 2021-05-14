import React from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'

const Blog = ({ blog, handleLike, ownedByUser, handleDelete }) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>
        <p>{blog.url}</p>
      </a>
      <label>{blog.likes} like{blog.likes === 1 ? ' ' : 's'}</label>
      <button onClick={handleLike}>like</button>
      {ownedByUser
        ? <button onClick={handleDelete}>delete</button>
        : null
      }
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <CommentForm blog={blog} />
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment.toString()}</li>
        ))}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  ownedByUser: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog
