import React from 'react'
import ReactDOM from 'react-dom'
import Application from './components/application'
import redux from './redux'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={redux()}>
    <Application />
  </Provider>,
  document.getElementById('application')
)
