const filterReducer = (state = '', action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    case 'CLEAR_FILTER':
      return ''
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data: filter
  }
}

export default filterReducer