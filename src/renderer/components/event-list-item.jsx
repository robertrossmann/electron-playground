import React from 'react'

export default class EventListItem extends React.Component {

  static propTypes = {
    event: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired,
    startsAt: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <li className="list-group-item">
        <img
          className="img-rounded media-object pull-left"
          src="./img/event-placeholder.png"
          width="64px"
          height="64px"
        />
        <div className="media-body">
          <h4>{this.props.event}</h4>
          <p>{this.props.location}</p>
          <p><i>{this.props.startsAt}</i></p>
        </div>
      </li>
    )
  }
}
