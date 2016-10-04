import events from './events'

export default {
  events: (...args) => reduce(events, ...args)
}

/**
 * Events reducer
 *
 * @param     {Object}    reducer   The reducer object
 * @param     {Array}     state     Initial state for the `events` node
 * @param     {Object}    action    The triggered action
 * @return    {Array}
 */
function reduce(reducer, state = [], action) {
  const handler = reducer[action.type]

  return handler
    ? handler(state, action)
    : state
}
