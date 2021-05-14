import blogService from '../services/blogs'

const INIT_USERS = 'INIT_USERS'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_USERS:
      return action.data
    default:
      return state
  }
}

export const initiateUsers = () => {
  return async (dispatch) => {
    const data = await blogService.getAll('/api/users')
    dispatch({
      type: INIT_USERS,
      data
    })
  }
}

export default usersReducer
