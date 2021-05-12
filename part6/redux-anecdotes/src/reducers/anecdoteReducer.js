import anecdotes from '../services/anecdotes'

const sortedByVotes = (objects) =>  [...objects].sort((a, b) => b.votes - a.votes)

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return sortedByVotes(
        state.map(anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1}: anecdote)
      )
    case 'INIT_ANECDOTES':
      return sortedByVotes(action.data)
    case 'NEW_ANECDOTE':
      return sortedByVotes([...state, action.data])
    default:
      return state
  }
}

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export const incrementVotes = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export default anecdoteReducer