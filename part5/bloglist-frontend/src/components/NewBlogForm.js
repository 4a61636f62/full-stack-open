import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
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

export default NewBlogForm
