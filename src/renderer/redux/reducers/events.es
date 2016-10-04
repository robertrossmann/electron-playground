import { events } from '../types'

export default {
  [events.select]: (state, action) =>
    state.setIn(['meta', 'current'], action.id)
}
