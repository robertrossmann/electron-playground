import * as redux from 'redux'
import logger from 'redux-logger'
import reducers from './reducers'
import state from './state'
import persistence from './middleware/persistence'
import config from '../../services/config'

const middleware = [
  logger(),
  persistence(config),
]

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
