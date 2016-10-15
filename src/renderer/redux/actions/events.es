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

  syncing(syncing) {
    return {
      type: events.syncing,
      syncing
    }
  },

  synced(entries) {
    return {
      type: events.synced,
      entries
    }
  },
}
