import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEvent from 'react-tap-event-plugin'
import { Component as EventManager } from './components/event-manager'
import redux from './redux'

// Required by material-ui to get rid of a warning about unknown prop
injectTapEvent()

const store = redux()

ReactDOM.render(
  <Provider store={store}>
    <EventManager />
  </Provider>,
  document.getElementById('root')
)
