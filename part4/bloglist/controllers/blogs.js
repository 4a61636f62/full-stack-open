const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
 const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(401).end()
  }

  if (!(blogToDelete.user.toString() === request.user._id.toString())) {
    return response.status(401).json({
      error: 'blog can only be deleted by owner'
    })
  }

  await Blog.deleteOne(blogToDelete)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const update = {
    likes: request.body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, update)
  response.status(204).end()
})

module.exports = blogsRouter
