import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value)
  }
  const style = {
    marginBotton: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange}/>
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)