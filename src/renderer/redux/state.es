import immutable from 'immutable'

// Initial state for the redux store
export default {
  events: immutable.fromJS({
    meta: {
      current: '000'
    },

    entries: {
      '000': {
        id: '000',
        name: 'First event on the list',
        location: 'STRV Office',
        startsAt: new Date()
      },

      '001': {
        id: '001',
        name: 'Second event',
        location: 'New York',
        startsAt: new Date()
      },

      '002': {
        id: '002',
        name: 'Third event',
        location: 'San Francisco',
        startsAt: new Date()
      }
    }
  })
}
