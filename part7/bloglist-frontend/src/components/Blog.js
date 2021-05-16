import React from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'

import {
  Anchor,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from 'grommet'

import {
  Like,
  Trash
} from 'grommet-icons'

const Blog = ({ blog, handleLike, ownedByUser, handleDelete }) => {
  return (
    <Box>
    <Card margin='medium' align='center'>
      <CardHeader>
        <h1>{blog.title}</h1>
      </CardHeader>
      <CardBody>
        <Anchor href={blog.url} label={blog.url} />
        <p>added by {blog.user.name}</p>
      </CardBody>
        <CardFooter>
          <label>{blog.likes} like{blog.likes === 1 ? ' ' : 's'}</label>
          <Button onClick={handleLike} icon={<Like />}/>
          {ownedByUser
            ? <Button onClick={handleDelete} icon={<Trash />} />
            : null
          }
        </CardFooter>
    </Card>
      <Card margin = 'medium' align='center'>
        <h3>comments</h3>
        <CommentForm blog={blog} />
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment.toString()}</li>
          ))}
        </ul>
      </Card>
    </Box>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  ownedByUser: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog
