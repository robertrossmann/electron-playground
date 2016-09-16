import React from 'react'
import {
  Window,
  Toolbar,
  Content
} from 'react-photonkit'
import Menubar from './menubar'

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
        <Content>Hello world</Content>
        <Toolbar psType="footer" />
      </Window>
    )
  }
}
