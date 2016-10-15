import React from 'react'
import {
  Paper,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui'

/**
 * Main Application Menu Component
 *
 * @return  {DOMNode}
 */
export default function AppMenu() {
  return (
    <Paper
      rounded={false}
      style={{ position: 'fixed', width: '100%' }}
    >
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="StereoCast Manager" />
        </ToolbarGroup>
      </Toolbar>
    </Paper>
  )
}
