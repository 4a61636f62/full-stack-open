import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogsReducer'
import Blog from './Blog'
import { Route, Switch, Link, useRouteMatch, useHistory } from 'react-router-dom'

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

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
        <div>
          {blogs.map(blog =>
            <div key={blog.id} style={style}>
              <Link to={`/blogs/${blog.id}`}>
                  <p>{blog.title}</p>
              </Link>
            </div>
          )}
        </div>
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
