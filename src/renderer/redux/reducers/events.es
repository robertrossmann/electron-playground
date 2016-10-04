import immutable from 'immutable'

const initial = []

/**
 * Events reducer
 *
 * @param     {Array}     state     Initial state for the `events` node
 * @param     {Object}    action    The triggered action
 * @return    {Array}
 */
export default function events(state = initial, action) {
  switch (action.type) {
    case 'events.select':
      // eslint-disable-next-line new-cap
      return immutable.List(state).withMutations(entries => {
        for (const entry of entries) {
          entry.active = action.id === entry.data.id
        }
      }).toArray()

    default:
      return state
  }
}
