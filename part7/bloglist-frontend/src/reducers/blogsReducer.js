import blogService from '../services/blogs'

const INIT_BLOGS = 'INIT_BLOGS'
const ADD_BLOG = 'ADD_BLOG'
const UPDATE_BLOG = 'UPDATE_BLOG'
const REMOVE_BLOG = 'REMOVE_BLOG'

const sortedByLikes = (blogs) => [...blogs].sort((a, b) => b.likes - a.likes)

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return sortedByLikes(action.data)
    case ADD_BLOG:
      return sortedByLikes([...state, action.data])
    case UPDATE_BLOG:
      return sortedByLikes(state.map(blog => blog.id === action.data.id ? action.data : blog))
    case REMOVE_BLOG:
      return sortedByLikes(state.filter(blog => blog.id !== action.data))
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: INIT_BLOGS,
      data: blogs
    })
  }
}

export const addBlog = (blog, token) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.add(blog, token)
    dispatch({
      type: ADD_BLOG,
      data: returnedBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.like(blog)
    dispatch({
      type: UPDATE_BLOG,
      data: { ...blog, likes: blog.likes + 1 }
    })
  }
}

export const removeBlog = (blog, token) => {
  return async (dispatch) => {
    await blogService.remove(blog, token)
    dispatch({
      type: REMOVE_BLOG,
      data: blog.id
    })
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    await blogService.addComment(blog, comment)
    dispatch({
      type: UPDATE_BLOG,
      data: { ...blog, comments: blog.comments.concat(comment) }
    })
  }
}

export default blogsReducer
