import React, { useLayoutEffect } from 'react'
import User from './User'
import { useSelector, useDispatch } from 'react-redux'

import { initiateUsers } from '../reducers/usersReducer'
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(initiateUsers())
  }, [])

  if (!users) {
    return null
  }

  const match = useRouteMatch('/users/:username')
  const user = match
    ? users.find(user => user.username === match.params.username)
    : null

  console.log(user)

  return (
    <Switch>
      <Route path={'/users/:username'}>
        {user ? <User name={user.name} blogs={user.blogs}/> : null }
      </Route>
      <Route path='/users/'>
        <div>
          <h2>Users</h2>
          <table>
            <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            </thead>
            <tbody>
            {users.map(u =>
              <tr key={u.username}>
                <Link to={`/users/${u.username}`}>
                  <td>{u.name}</td>
                </Link>
                <td>{u.blogs.length}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </Route>
    </Switch>

  )
}

export default UserList
