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
    select: React.PropTypes.func,
    filter: React.PropTypes.func
  }

  onClick(eventId) {
    this.props.select(eventId)
  }

  onChange(text) {
    this.props.filter(text)
  }

  render() {
    const {
      entries,
      meta
    } = this.props.events

    return (
      <ListGroup>
        <li className="list-group-header">
          <input
            type="text"
            className="form-control"
            placeholder="Filter events..."
            value={meta.filter}
            onChange={event => this.onChange(event.target.value)}
          />
        </li>
        {Object.keys(entries).map(key =>
          <EventListItem
            key={key}
            active={entries[key].id === meta.current}
            event={entries[key].name}
            location={entries[key].location}
            startsAt={entries[key].startsAt.toLocaleString()}
            onClick={() => this.onClick(key)}
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
  const data = state.events.toJS()

  data.entries = applyFilter(data.entries, data.meta.filter)

  return {
    events: data
  }
}

const mapDispatch = {
  select: events.select,
  filter: events.filter
}

export default connect(mapState, mapDispatch)(EventList)


/**
 * Apply a simple filter over the list of events, based on name
 *
 * @private
 * @param     {Object}    [state={}]      The initial object containing the events
 * @param     {String}    [filter='']     The filter to be applied
 * @return    {Object}                    The object with only matching events
 */
function applyFilter(state = {}, filter = '') {
  const filtered = {}
  const regexp = new RegExp(filter, 'gi')

  for (const key of Object.keys(state)) {
    if (state[key].name.match(regexp)) {
      filtered[key] = state[key]
    }
  }

  return filtered
}
