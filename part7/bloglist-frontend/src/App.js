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

import {
  Grommet
} from 'grommet'
import theme from './theme'

const App = () => {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(loadUser())
  }, [])

  const user = useSelector(state => state.user)

  const blogFormRef = useRef()
  const addNewBlog = async (newBlog) => {
    try {
      await dispatch(addBlog(newBlog, user.token))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
    } catch (error) {
      dispatch(setNotification(error.message, true))
    }
  }

  return (
    <Grommet full theme={theme}>
      {user && (
        <Navbar name={user.name} handleLogout={() => dispatch(logout())}/>
      )}
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
              <BlogList />
              <Togglable buttonLabel='create new' ref={blogFormRef}>
                <NewBlogForm addNewBlog={addNewBlog}/>
              </Togglable>
            </div>
            : <Redirect to='/login' />}
        </Route>
      </Switch>
    </Grommet>
  )
}

export default App
