import React from 'react'
import { connect } from 'react-redux'
import {
  ListGroup
} from 'react-photonkit'
import EventListItem from './event-list-item'
import { events } from '../redux/actions'

class EventList extends React.Component {

  static propTypes = {
    events: React.PropTypes.object.isRequired,
    select: React.PropTypes.func
  }

  handleClick(eventId) {
    this.props.select(eventId)
  }

  render() {
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
            onClick={() => this.handleClick(event.data.id)}
          />
        )}
      </ListGroup>
    )
  }
}

/**
 * Map state to component props
 *
 * @private
 * @param     {Object}    state    Redux state
 * @return    {Object}
 */
function mapState(state) {
  return {
    events: state.events
  }
}

const mapDispatch = {
  select: events.select
}

export default connect(mapState, mapDispatch)(EventList)
