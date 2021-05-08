import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(async () => {
    const allBlogs = await blogService.getAll()
    allBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(allBlogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      } catch (error) {
        setUser(null)
        handleLogout()
      }
    }
  }, [])

  const notify = (message, color) => {
    setNotification({ message, color })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify(`${user.name} logged in successfully!`, 'green')
    } catch (error) {
      notify(error.message, 'red')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const noteFormRef = useRef()
  const addBlog = async (newObject) => {
    try {
      const newBlog = await blogService.add(newObject)
      noteFormRef.current.toggleVisibility()
      setBlogs(blogs.concat({ ...newBlog, user: { username: user.username } }))
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'green')
    } catch (error) {
      notify(error.message, 'red')
    }
  }

  const likeBlog = async (blogToLike) => {
    try {
      await blogService.like(blogToLike)
      const updatedBlogs = blogs.map(blog => (
        blog.id === blogToLike.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog
      ))
      updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    } catch (error) {
      notify(error.message, 'red')
    }
  }

  const removeBlog = async (blogToRemove) => {
    if (!(window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`))) {
      return
    }
    try {
      await blogService.remove(blogToRemove)
      const updatedBlogs = blogs.filter(blog => blog.id !== blogToRemove.id)
      setBlogs(updatedBlogs)
      notify(`deleted ${blogToRemove.title} by ${blogToRemove.author}`, 'green')
    } catch (error) {
      notify(error.message, 'red')
    }
  }

  return (
    user
      ? <div>
          <Notification notification={notification}/>
          <h2>blogs</h2>
          <label>{user.name} logged in</label>
          <button onClick={handleLogout}>logout</button>
          <br/><br/>
          <Togglable buttonLabel='create new' ref={noteFormRef}>
            <NewBlogForm createBlog={addBlog}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => likeBlog(blog)}
              ownedByUser={user.username === blog.user.username}
              handleDelete={() => removeBlog(blog)}
            />
          )}
        </div>
      : <div>
          <Notification notification={notification}/>
          <h2>Log in to application</h2>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
  )
}

export default App
