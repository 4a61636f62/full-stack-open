import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author, does not render url or likes by default', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'blog.com',
    likes: 6
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('blog title')
  expect(component.container).toHaveTextContent('blog author')
})

test('renders url and likes when the view button is clicked', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'blog.com',
    likes: 6
  }

  const component = render(
    <Blog blog={blog} />
  )

  // at start toggleable content is not displayed
  const div = component.container.querySelector('.toggleableContent')
  expect(div).toHaveStyle('display: none')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent('blog.com')
  expect(div).toHaveTextContent('6')
})

test('event handler is called the correct number of times when like button is clicked', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'blog.com',
    likes: 6
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
