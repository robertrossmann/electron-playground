import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import light from 'material-ui/styles/baseThemes/lightBaseTheme'
import theme from 'material-ui/styles/getMuiTheme'
import { Component as AppMenu } from './app-menu'
import { Component as EventList } from './event-list'
import { Component as EventDetail } from './event-detail'

/**
 * Application component
 *
 * @return  {DOMNode}
 */
export default function Application() {
  return (
    <MuiThemeProvider muiTheme={theme(light)}>
      <div id="application">
        <AppMenu />
        <div id="content">
          <EventList />
          <EventDetail />
        </div>
      </div>
    </MuiThemeProvider>
  )
}
