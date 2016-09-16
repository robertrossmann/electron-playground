import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import state from './state'

const middleware = []

/**
 *  Create a new Redux store
 *
 *  @return    {Store}
 */
export default function mkstore() {
  return createStore(
    combineReducers(reducers),
    state,
    applyMiddleware(...middleware)
  )
}
