import React from 'react'
import { connect } from 'react-redux'
import {
  Avatar,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui'
import { events } from '../redux/actions'
import * as mutators from '../redux/reducers/events'
import firebase from '../../services/firebase'

class EventList extends React.Component {

  static propTypes = {
    events: React.PropTypes.object.isRequired,
    filter: React.PropTypes.func,
    select: React.PropTypes.func,
    // @TODO: This should not be necessary! But for now it silences ESLint
    synced: React.PropTypes.func,
  }

  styles = {
    avatar: {
      size: 60
    },
    avatarColumn: {
      width: 65
    },
    rowHeight: 80,
  }

  events = firebase.database().ref('/events')

  // eslint-disable-next-line no-invalid-this
  synced = snapshot => this.props.synced(snapshot.val())

  onClick(eventId) {
    this.props.select(eventId)
  }

  onChange(text) {
    this.props.filter(text)
  }

  componentDidMount() {
    this.events.on('value', this.synced)
  }

  componentWillUnmount() {
    this.events.off('value', this.synced)
  }

  render() {
    const {
      entries,
      meta
    } = this.props.events

    return (
      <Table
        onRowSelection={indexes =>
          indexes.length
            ? this.onClick(entries[indexes[0]].id)
            // Deselect
            : this.onClick(null)
      }>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={{ width: this.styles.avatarColumn.width }} />
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Starts At</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {entries.map(entry =>
            <TableRow
              key={entry.id}
              selected={entry.id === meta.current}
              style={{ height: this.styles.rowHeight }}
            >
              <TableRowColumn style={{ width: this.styles.avatarColumn.width }}>
                <Avatar src={entry.coverUrl} size={this.styles.avatar.size} />
              </TableRowColumn>
              <TableRowColumn>
                <h3>{entry.title}</h3>
                <p>{`${entry.location.venue}, ${entry.location.city}`}</p>
              </TableRowColumn>
              <TableRowColumn>{(new Date(entry.startsAt)).toLocaleString()}</TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
  synced: events.synced,
}

export default connect(mapState, mapDispatch)(EventList)
