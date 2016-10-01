// Initial state for the redux store
export default {
  events: [{
    active: true,
    data: {
      id: 1,
      name: 'First event on the list',
      location: 'STRV Office',
      startsAt: new Date()
    }
  }, {
    active: false,
    data: {
      id: 2,
      name: 'Second event',
      location: 'New York',
      startsAt: new Date()
    }
  }, {
    active: false,
    data: {
      id: 3,
      name: 'Third event',
      location: 'San Francisco',
      startsAt: new Date()
    }
  }]
}
