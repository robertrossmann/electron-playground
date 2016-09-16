import React from 'react'

/**
 * Main Application component
 *
 * @return  {Node}
 */
export default class Application extends React.Component {

  static styles = {
    color: 'red'
  }

  render() {
    return (
      <div style={Application.styles}>
        <h1>Hello world!</h1>
      </div>
    )
  }
}
