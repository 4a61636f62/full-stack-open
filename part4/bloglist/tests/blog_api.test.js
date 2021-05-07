const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})
  const saltRounds = 10

  const passwordHash = await bcrypt.hash(helper.initialUser.password, saltRounds)
  let userObject = new User({
    username: helper.initialUser.username,
    name: helper.initialUser.name,
    passwordHash
  })

  await userObject.save()
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
  test('succeeds for logged in user with valid data', async () => {
    const credentials = {
      username: helper.initialUser.username,
      password: helper.initialUser.password
    }

    const loginResponse = await api
      .post('/api/login')
      .send(credentials)

    const authToken = loginResponse.body.token

    const newBlog = {
      title: "new blogpost",
      author: "author mcAuthorFace",
      url: "www.someBlogPost.com",
      likes: 69
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization:`bearer ${authToken}`})
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => {
      delete r.id
      delete r.user
      return r
    })

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContainEqual(newBlog)
  })

  test('succeeds for a logged in user if "likes" property is omitted from request: "likes" defaults to 0', async () => {
    const credentials = {
      username: helper.initialUser.username,
      password: helper.initialUser.password
    }

    const loginResponse = await api
      .post('/api/login')
      .send(credentials)

    const authToken = loginResponse.body.token

    const newBlog = {
      title: "new blogpost",
      author: "author mcAuthorFace",
      url: "www.someBlogPost.com",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization:`bearer ${authToken}`})
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => {
      delete r.id
      delete r.user
      return r
    })

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContainEqual({...newBlog, likes: 0})
  })

  test('fails with status code 400 for a logged in user if title / url properties are omitted', async () => {
    const credentials = {
      username: helper.initialUser.username,
      password: helper.initialUser.password
    }

    const loginResponse = await api
      .post('/api/login')
      .send(credentials)

    const authToken = loginResponse.body.token

    const newBlog = {
      author: "author mcAuthorFace",
      likes: 69
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization:`bearer ${authToken}`})
      .expect(400)
  })

  test('fails with status code 401 if auth token is not provided', async () => {
    const newBlog = {
      title: "new blogpost",
      author: "author mcAuthorFace",
      url: "www.someBlogPost.com",
      likes: 69
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})