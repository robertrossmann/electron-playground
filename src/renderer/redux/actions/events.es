import { events } from '../types'

export default {

  select(id) {
    return {
      type: events.select,
      id
    }
  }
}
