import immutable from 'immutable'
import { events } from '../types'

export default {
  [events.select]: (state, action) =>
    // eslint-disable-next-line new-cap
    immutable.List(state).withMutations(entries => {
      for (const entry of entries) {
        entry.active = action.id === entry.data.id
      }
    }).toArray()
}
