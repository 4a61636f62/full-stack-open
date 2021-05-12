import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }
  const style = {
    marginBotton: 10
  }

  return (
    <div>
      filter <input onChange={handleChange}/>
    </div>
  )
}

export default Filter