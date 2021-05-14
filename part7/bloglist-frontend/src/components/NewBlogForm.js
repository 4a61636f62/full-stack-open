import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url
    }
    addNewBlog(blog)
  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={createBlog}>
          <div>
              title:
              <input
                id='title'
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
          </div>
          <div>
              author:
              <input
                id='author'
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
          </div>
          <div>
              url:
              <input
                id='url'
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
          </div>
          <button id='createBlog' type='submit'>create</button>
        </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired
}

export default NewBlogForm
