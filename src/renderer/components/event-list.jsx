import React from 'react'
import { connect } from 'react-redux'
import {
  ListGroup
} from 'react-photonkit'
import EventListItem from './event-list-item'
import { events } from '../redux/actions'
import * as mutators from '../redux/reducers/events'
import firebase from '../services/firebase'

class EventList extends React.Component {

  static propTypes = {
    events: React.PropTypes.object.isRequired,
    select: React.PropTypes.func,
    filter: React.PropTypes.func,

    // @TODO: This should not be necessary! But for now it silences ESLint
    childAdded: React.PropTypes.func,
    childRemoved: React.PropTypes.func,
    childChanged: React.PropTypes.func
  }

  events = firebase.database().ref('/events')

  /* eslint-disable no-invalid-this */
  childAdded = snapshot => this.props.childAdded(snapshot.val())
  childRemoved = snapshot => this.props.childRemoved(snapshot.val())
  childChanged = snapshot => this.props.childChanged(snapshot.val())
  /* eslint-enable no-invalid-this */

  onClick(eventId) {
    this.props.select(eventId)
  }

  onChange(text) {
    this.props.filter(text)
  }

  componentDidMount() {
    this.events.on('child_added', this.childAdded)
    this.events.on('child_removed', this.childRemoved)
    this.events.on('child_changed', this.childChanged)
  }

  componentWillUnmount() {
    this.events.off('child_added', this.childAdded)
    this.events.off('child_removed', this.childRemoved)
    this.events.off('child_changed', this.childChanged)
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
        {entries.map(event =>
          <EventListItem
            key={event.id}
            active={event.id === meta.current}
            event={event.title}
            location={`${event.location.venue}, ${event.location.city}`}
            startsAt={(new Date(event.startsAt)).toLocaleString()}
            cover={event.coverUrl}
            onClick={() => this.onClick(event.id)}
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
  // Transform entries into array
  let entries = []

  for (const key of Object.keys(data.entries)) {
    entries.push(data.entries[key])
  }

  entries = mutators.filter(entries, data.meta.filter)
  entries = mutators.sort({ entries, field: 'startsAt', descending: true })
  data.entries = entries

  return {
    events: data
  }
}

const mapDispatch = {
  select: events.select,
  filter: events.filter,
  childAdded: events.childAdded,
  childRemoved: events.childRemoved,
  childChanged: events.childChanged
}

export default connect(mapState, mapDispatch)(EventList)
