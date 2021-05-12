const notificationReducer = (state = '', action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      }, timeout*1000)
    })
  }
}

export default notificationReducer