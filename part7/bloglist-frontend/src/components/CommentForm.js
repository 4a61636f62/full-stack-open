import React from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'
import PropTypes from 'prop-types'

import {
  Box,
  Button,
  Form,
  TextArea
} from 'grommet'

const CommentForm = ({ blog }) => {
  const comment = useField('text')
  const dispatch = useDispatch()

  const submit = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment.props.value))
    comment.clear()
  }

  return (
    <Form onSubmit={submit}>
      <Box align='center' width='medium' gap='medium'>
        <TextArea {...comment.props} />
        <Button type='submit' label='submit' />
      </Box>
    </Form>
  )
}

CommentForm.propTypes = {
  blog: PropTypes.object.isRequired
}

export default CommentForm
