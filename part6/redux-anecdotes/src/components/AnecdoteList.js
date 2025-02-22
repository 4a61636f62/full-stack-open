import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
  const filter = useSelector(state => state.filter).toLowerCase()
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(incrementVotes(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
        .map(anecdote =>
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