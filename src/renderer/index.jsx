import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEvent from 'react-tap-event-plugin'
import Application from './components/application'
import redux from './redux'
import config from '../services/config'

// Required by material-ui to get rid of a warning about unknown prop
injectTapEvent()

const store = redux()

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('application')
)

setInterval(() => {
  const state = store.getState()

  console.log('State dump', state)
  // Dump current store into config
  config.set('state', state)
}, 30000)
