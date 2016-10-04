import { events } from '../types'

export default {
  [events.select]: (state, action) =>
    state.setIn(['meta', 'current'], action.id),

  [events.filter]: (state, action) =>
    state.setIn(['meta', 'filter'], action.text)
}
