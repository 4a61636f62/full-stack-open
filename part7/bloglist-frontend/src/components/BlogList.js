import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogsReducer'
import Blog from './Blog'
import { Route, Switch, useRouteMatch, useHistory, Link } from 'react-router-dom'

import {
  Anchor,
  Box,
  Card, CardBody, CardHeader, Grid
} from 'grommet'

const BlogList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [blogs, user] = useSelector(state => [state.blogs, state.user])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <Switch>
      <Route path='/blogs/:id'>
        {blog
          ? <Blog
            blog={blog}
            handleLike={() => dispatch(likeBlog(blog))}
            ownedByUser={blog.user.username === user.username}
            handleDelete={() => {
              dispatch(removeBlog(blog, user.token))
              history.push('/')
            }}
          />
          : null
        }
      </Route>
      <Route path='/'>
        <Box margin='medium' align='center'>
          <Grid
            columns={{ count: 'fit', size: 'small' }}
            responsive
            fill
            gap='small'
          >
          {blogs.map(blog =>
            <Card key={blog.id}>
              <CardHeader pad ='small' >
                <Anchor as={Link} to={`/blogs/${blog.id}`} label={blog.title} />
              </CardHeader>
              <CardBody pad='small'>
                by {blog.author}
              </CardBody>
            </Card>
          )}
          </Grid>
        </Box>
      </Route>
    </Switch>
  )
  // return (
  //   <div>
  //     {blogs.map(blog =>
  //       <Blog
  //         key={blog.id}
  //         blog={blog}
  //         handleLike={() => dispatch(likeBlog(blog))}
  //         ownedByUser={blog.user.username === user.username}
  //         handleDelete={() => dispatch(removeBlog(blog, user.token))}
  //       />
  //     )}
  //   </div>
  // )
}

export default BlogList
