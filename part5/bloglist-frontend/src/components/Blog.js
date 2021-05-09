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

  const showWhenView = { display: view ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button>
        <div className='toggleableContent' style={showWhenView}>
            <p>{blog.url}</p>
            <label>{blog.likes}</label>
            <button className = 'likeButton' onClick={handleLike}>like</button>
            {ownedByUser
              ? <button onClick={handleDelete}>delete</button>
              : null
            }
          </div>
    </div>
  )
}

export default Blog
