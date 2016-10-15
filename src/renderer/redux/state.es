import immutable from 'immutable'
import merge from 'semantic-merge'
import config from '../../services/config'

const defaults = {
  events: {
    meta: {
      current: null,
      filter: ''
    },

    entries: {}
  }
}
const state = merge(config.get('state') || {})
  .and(defaults)
  .recursively
  .into({})

// Initial state for the redux store
export default {
  events: immutable.fromJS(state.events)
}
