import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import light from 'material-ui/styles/baseThemes/lightBaseTheme'
import theme from 'material-ui/styles/getMuiTheme'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui'
import EventList from './event-list'

/**
 * Application component
 *
 * @return  {DOMNode}
 */
export default function Application() {
  return (
    <MuiThemeProvider muiTheme={theme(light)}>
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="StereoCast Manager" />
          </ToolbarGroup>
        </Toolbar>
        <EventList />
      </div>
    </MuiThemeProvider>
  )
}
