import React from 'react'
import { connect } from 'react-redux'
import {
  ListGroup
} from 'react-photonkit'
import EventListItem from './event-list-item'
import { events } from '../redux/actions'
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
        {Object.keys(entries).map(key =>
          <EventListItem
            key={key}
            active={entries[key].id === meta.current}
            event={entries[key].title}
            location={`${entries[key].location.venue}, ${entries[key].location.city}`}
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
  filter: events.filter,
  childAdded: events.childAdded,
  childRemoved: events.childRemoved,
  childChanged: events.childChanged
}

export default connect(mapState, mapDispatch)(EventList)


/**
 * Apply a simple filter over the list of events, based on title
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
    if (state[key].title.match(regexp)) {
      filtered[key] = state[key]
    }
  }

  return filtered
}
