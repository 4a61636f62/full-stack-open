import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ content, votes, handleVote }) => (
  <div>
    <div>
      {content}
    </div>
    <div>
      has {votes}
      <button onClick={handleVote}>vote</button>
    </div>
  </div>
)

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(incrementVotes(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleVote={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList