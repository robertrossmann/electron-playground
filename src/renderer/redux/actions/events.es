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
  }
}
