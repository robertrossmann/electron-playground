import immutable from 'immutable'

// Initial state for the redux store
export default {
  events: immutable.fromJS({
    meta: {
      current: null,
      filter: ''
    },

    entries: {}
  })
}
