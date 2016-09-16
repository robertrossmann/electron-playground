import * as redux from 'redux'
import reducers from './reducers'
import state from './state'

const middleware = []

/**
 *  Create a new Redux store
 *
 *  @return    {Store}
 */
export default function mkstore() {
  return redux.createStore(
    redux.combineReducers(reducers),
    state,
    redux.compose(
      redux.applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : unknown => unknown
    )
  )
}
