import React, { useLayoutEffect, useRef } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import Navbar from './components/Navbar'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { addBlog } from './reducers/blogsReducer'
import { loadUser, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(loadUser())
  }, [])

  const user = useSelector(state => state.user)

  const notify = (message, color) => {
    dispatch(setNotification(message, color, 10))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const blogFormRef = useRef()
  const addNewBlog = async (newBlog) => {
    try {
      await dispatch(addBlog(newBlog, user.token))
      blogFormRef.current.toggleVisibility()
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'green')
    } catch (error) {
      notify(error.message, 'red')
    }
  }

  return (
    <div>
      {user
        ? <div>
            <Navbar name={user.name} handleLogout={handleLogout}/>
            <h2>blog app</h2>
          </div>
        : <h2>Log in to application</h2>
      }
      <Notification />
      <Switch>
        <Route path='/login'>
          {!user
            ? <LoginForm />
            : <Redirect to='/' />
          }

        </Route>
        <Route path='/users'>
          {user
            ? <UserList />
            : <Redirect to='/login' />
          }
        </Route>
        <Route path='/'>
          {user
            ? <div>
              <Togglable buttonLabel='create new' ref={blogFormRef}>
                <NewBlogForm addNewBlog={addNewBlog}/>
              </Togglable>
              <BlogList />
            </div>
            : <Redirect to='/login' />}
        </Route>
      </Switch>
    </div>
  )
}

export default App
