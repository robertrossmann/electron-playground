export default function persistence(config) {
  let timeout

  return store => next => action => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      const state = store.getState()

      console.log('Persisting state', state)
      config.set('state', state)
    }, 3000)

    return next(action)
  }
}
