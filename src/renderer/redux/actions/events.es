export default {

  select(id) {
    return {
      type: 'events.select',
      id
    }
  }
}
