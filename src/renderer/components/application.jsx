import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import light from 'material-ui/styles/baseThemes/lightBaseTheme'
import theme from 'material-ui/styles/getMuiTheme'
import AppMenu from './app-menu'
import EventList from './event-list'
import EventDetail from './event-detail'

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
        <div
          className="content"
          style={{
            display: 'flex',
          }}
        >
          <div style={{
            flex: 2,
            overflow: 'auto',
            height: '100vh',
          }}>
            <EventList />
          </div>
          <div style={{
            flex: 1,
            maxWidth: 400,
          }}>
            <EventDetail />
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  )
}
