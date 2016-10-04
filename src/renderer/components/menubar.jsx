import React from 'react'
import {
  Toolbar,
  Actionbar,
  ButtonGroup,
  Button
} from 'react-photonkit'

export default class Menubar extends React.Component {

  style = {
    // Makes the toolbar draggable to allow window positioning
    WebkitAppRegion: 'drag'
  }

  render() {
    return (
      <div style={this.style}>
        <Toolbar title="StereoCast Manager">
          <Actionbar>
            <ButtonGroup>
              <Button glyph="home"/>
              <Button glyph="folder"/>
            </ButtonGroup>
          </Actionbar>
        </Toolbar>
      </div>
    )
  }
}
