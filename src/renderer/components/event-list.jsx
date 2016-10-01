import React from 'react'
import { connect } from 'react-redux'
import {
  ListGroup
} from 'react-photonkit'
import EventListItem from './event-list-item'

class EventList extends React.Component {

  render() {
    console.log(this.props)
    return (
      <ListGroup>
        <li className="list-group-header">
          <input type="text" className="form-control" placeholder="Search events" />
        </li>
        {this.props.events.map(event =>
          <EventListItem
            key={event.data.id}
            active={event.active}
            event={event.data.name}
            location={event.data.location}
            startsAt={event.data.startsAt.toLocaleString()}
            />
        )}
      </ListGroup>
    )
  }
}

function mapState(state) {
  return {
    events: state.events
  }
}

function mapDispatch() {
  return {}
}

export default connect(mapState, mapDispatch)(EventList)
