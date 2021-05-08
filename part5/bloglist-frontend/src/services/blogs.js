import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const add = async newObject => {
  const config = {
    headers: { Authorization: token }
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

const remove = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default {
  setToken,
  getAll,
  add,
  like,
  remove
}
