import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (url = baseUrl) => {
  const response = await axios.get(url)
  return response.data
}

const add = async (newObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const like = async blog => {
  const update = {
    user: blog.user.id,
    likes: blog.likes + 1,
    title: blog.title,
    author: blog.author,
    url: blog.url
  }
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}`, update)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const remove = async (blog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  try {
    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const addComment = async (blog, comment) => {
  try {
    const body = {
      comment
    }
    const response = await axios.post(`${baseUrl}/${blog.id}/comments`, body)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const blogService = {
  getAll,
  add,
  like,
  remove,
  addComment
}

export default blogService
