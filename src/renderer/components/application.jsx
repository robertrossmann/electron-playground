import React from 'react'
import {
  Window,
  Toolbar,
  Content,
  PaneGroup,
  Pane
} from 'react-photonkit'
import Menubar from './menubar'
import EventList from './event-list'

/**
 * Main Application component
 *
 * @return  {Node}
 */
export default class Application extends React.Component {

  render() {
    return (
      <Window>
        <Menubar />
        <Content>
          <PaneGroup>
            <Pane sidebar className="pane-one-fourth">
              <EventList />
            </Pane>
            <Pane>
              <div>Event details go here (WIP)</div>
            </Pane>
          </PaneGroup>
        </Content>
        <Toolbar psType="footer" />
      </Window>
    )
  }
}
