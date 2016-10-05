import { events } from '../types'

export default {

  select(id) {
    return {
      type: events.select,
      id
    }
  },

  filter(text) {
    return {
      type: events.filter,
      text
    }
  },

  childAdded(event) {
    return {
      type: events.childAdded,
      event
    }
  },

  childRemoved(event) {
    return {
      type: events.childRemoved,
      event
    }
  },

  childChanged(event) {
    return {
      type: events.childChanged,
      event
    }
  }
}
