const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initally some blog posts saved', () => {
  test('blog posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier of returned blog posts is named "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).not.toHaveProperty('_id')
  })
})

describe('addition of a new blogpost', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: "new blogpost",
      author: "author mcAuthorFace",
      url: "www.someBlogPost.com",
      likes: 69
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => {
      delete r.id
      return r
    })

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContainEqual(newBlog)
  })

  test('succeeds if "likes" property is omitted from request: "likes" defaults to 0', async () => {
    const newBlog = {
      title: "new blogpost",
      author: "author mcAuthorFace",
      url: "www.someBlogPost.com",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => {
      delete r.id
      return r
    })

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContainEqual({...newBlog, likes: 0})
  })

  test('fails with status code 400 if title / url properties are omitted', async () => {
    const newBlog = {
      author: "author mcAuthorFace",
      likes: 69
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog post', () => {
  test('succeeds with status code 204 if valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = await blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length -1)
    const blogIds = blogsAtEnd.map(blog => blog.id)
    expect(blogIds).not.toContain(blogToDelete.id)
  })
})

describe('updating a blog post', () => {
  test('succeeds with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = await blogsAtStart[0]
    const update = {likes: blogToUpdate.likes + 10}

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(204)

    const response = await api.get('/api/blogs')
    const updatedBlog = response.body.filter(blog => blog.id === blogToUpdate.id)[0]
    expect(updatedBlog.likes).toEqual(blogToUpdate.likes + 10)
  })
})




afterAll(() => {
  mongoose.connection.close()
})