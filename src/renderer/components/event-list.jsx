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
    const {
      entries,
      meta
    } = this.props.events

    return (
      <ListGroup>
        <li className="list-group-header">
          <input type="text" className="form-control" placeholder="Search events" />
        </li>
        {Object.keys(entries).map(key =>
          <EventListItem
            key={key}
            active={entries[key].id === meta.current}
            event={entries[key].name}
            location={entries[key].location}
            startsAt={entries[key].startsAt.toLocaleString()}
            onClick={() => this.handleClick(key)}
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
    events: state.events.toJS()
  }
}

const mapDispatch = {
  select: events.select
}

export default connect(mapState, mapDispatch)(EventList)
