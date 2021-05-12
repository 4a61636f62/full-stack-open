import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('neutral is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('zero resets state', () => {
    const actions = [
      { type: 'GOOD' },
      { type: 'BAD' },
      { type: 'OK'},
      { type: 'ZERO' }
    ]
    const state = initialState

    let newState

    newState = counterReducer(state, actions[0])
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })

    newState = counterReducer(newState, actions[1])
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 1
    })

    newState = counterReducer(newState, actions[2])
    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })

    deepFreeze(newState)
    newState = counterReducer(newState, actions[3])
    expect(newState).toEqual(initialState)
  })
})