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

/**
 * Apply a simple filter over the list of events, based on title
 *
 * @param     {Array}     [entries=[]]    The initial array containing the events
 * @param     {String}    text            The filter to be applied
 * @return    {Array}                     The array with only matching events
 */
export function filter(entries = [], text) {
  if (!text) {
    return entries
  }

  const filtered = []
  const regexp = new RegExp(text, 'gi')

  for (const entry of entries) {
    if (entry.title.match(regexp)) {
      filtered.push(entry)
    }
  }

  return filtered
}

/**
 * Sort entries by the given field
 *
 * @param     {Array}     [entries=[]]    The entries to sort
 * @param     {String}    field           The field to sort by
 * @param     {Boolean}   descending      Sort in descending order instead of ascending
 * @return    {Array}
 */
export function sort(opts = { entries: [], field: null, descending: false }) {
  if (!opts.field) {
    return opts.entries
  }

  return opts.entries.sort((first, second) =>
    first[opts.field] > second[opts.field]
      ? (opts.descending && -1) || 1
      : (opts.descending && 1) || -1
    )
}
