import { events } from '../types'

export default {
  [events.select]: (state, action) =>
    state.setIn(['meta', 'current'], action.id),

  [events.filter]: (state, action) =>
    state.setIn(['meta', 'filter'], action.text),
  [events.childAdded]: (state, action) =>
    state.setIn(['entries', action.event.id], action.event),
  [events.childRemoved]: (state, action) =>
    state.deleteIn(['entries', action.event.id]),
  [events.childChanged]: (state, action) =>
    state.setIn(['entries', action.event.id], action.event)
}
