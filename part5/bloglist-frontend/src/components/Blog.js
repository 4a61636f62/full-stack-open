import React, { useState } from 'react'
const Blog = ({ blog, handleLike, ownedByUser, handleDelete }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button>
      {view
        ? <div>
            <p>{blog.url}</p>
            <label>{blog.likes}</label>
            <button onClick={handleLike}>like</button>
            {ownedByUser
              ? <button onClick={handleDelete}>delete</button>
              : null
            }
            <p>{blog.author}</p>
          </div>
        : null
      }
    </div>
  )
}

export default Blog
