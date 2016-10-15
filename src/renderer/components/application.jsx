import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import light from 'material-ui/styles/baseThemes/lightBaseTheme'
import theme from 'material-ui/styles/getMuiTheme'
import AppMenu from './app-menu'
import EventList from './event-list'

/**
 * Application component
 *
 * @return  {DOMNode}
 */
export default function Application() {
  return (
    <MuiThemeProvider muiTheme={theme(light)}>
      <div className="background">
        <AppMenu />
        <div style={{ paddingTop: '56px' }}>
          <EventList />
        </div>
      </div>
    </MuiThemeProvider>
  )
}
