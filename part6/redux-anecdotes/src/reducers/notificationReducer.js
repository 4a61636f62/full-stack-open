const initialState = {
  message: '',
  timeoutID: null
}

const notificationReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return (dispatch, getState) => {
    window.clearTimeout(getState().notification.timeoutID)
    const timeoutID = window.setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    },seconds*1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: {message, timeoutID}
    })

  }
}

export default notificationReducer