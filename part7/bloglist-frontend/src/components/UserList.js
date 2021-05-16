import React, { useLayoutEffect } from 'react'
import User from './User'
import { useSelector, useDispatch } from 'react-redux'

import { initiateUsers } from '../reducers/usersReducer'
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom'

import {
  Anchor,
  Box,
  Table, TableBody, TableCell, TableHeader, TableRow
} from 'grommet'

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
        <Box align='center' pad='medium'>
          <Table>
            <TableHeader>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Blogs Created
              </TableCell>
            </TableRow>
            </TableHeader>
            <TableBody>
            {users.map(u =>
              <TableRow key={u.username}>
                <TableCell>
                  <Anchor as={Link} to={`/users/${u.username}`}>
                    {u.name}
                  </Anchor>
                </TableCell>
                <TableCell>
                  {u.blogs.length}
                </TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
        </Box>
      </Route>
    </Switch>

  )
}

export default UserList
