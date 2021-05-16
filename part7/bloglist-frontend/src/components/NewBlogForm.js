import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import {
  Box,
  Button,
  Form,
  FormField,
  TextInput
} from 'grommet'

const NewBlogForm = ({ addNewBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const createBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title.props.value,
      author: author.props.value,
      url: url.props.value
    }
    addNewBlog(blog)
  }

  return (
    <Box
      align='center'
    >
        <h2>create new</h2>
        <Form onSubmit={createBlog}>
          <FormField label='Title'>
              <TextInput
                {...title.props}
              />
          </FormField>
          <FormField label='Author'>
              <TextInput
                {...author.props}
              />
          </FormField>
          <FormField label='URL'>
              <TextInput
                {...url.props}
              />
          </FormField>
          <Box margin={{ top: 'medium', bottom: 'medium' }}>
            <Button id='createBlog' type='submit' label='create' />
          </Box>
        </Form>
    </Box>
  )
}

NewBlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired
}

export default NewBlogForm
