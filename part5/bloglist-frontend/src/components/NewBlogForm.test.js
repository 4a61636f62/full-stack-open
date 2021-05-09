import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('calls event handler with the right details when a new blog is created', () => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'new blog title' }
  })
  fireEvent.change(author, {
    target: { value: 'new blog author' }
  })
  fireEvent.change(url, {
    target: { value: 'newblog.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  const createdBlog = createBlog.mock.calls[0][0]
  expect(createdBlog.title).toEqual('new blog title')
  expect(createdBlog.author).toEqual('new blog author')
  expect(createdBlog.url).toEqual('newblog.com')
})
