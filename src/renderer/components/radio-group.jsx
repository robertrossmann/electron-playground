import React from 'react'

export default class RadioGroup extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func
  }

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (child, i) =>
          React.cloneElement(child, {
            key: i,
            name: this.props.name,
            onChange: this.props.onChange
          })
        )}
      </div>
    )
  }
}
