import React from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'
import PropTypes from 'prop-types'

const CommentForm = ({ blog }) => {
  const comment = useField('text')
  const dispatch = useDispatch()

  const submit = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment.props.value))
    comment.clear()
  }

  return (
    <form onSubmit={submit}>
      <input {...comment.props} />
      <button type='submit'>add comment</button>
    </form>
  )
}

CommentForm.propTypes = {
  blog: PropTypes.object.isRequired
}

export default CommentForm
