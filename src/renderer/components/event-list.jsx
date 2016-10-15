import React from 'react'
import { connect } from 'react-redux'
import {
  Avatar,
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  LinearProgress,
} from 'material-ui'
import { events } from '../redux/actions'
import * as mutators from '../redux/reducers/events'
import firebase from '../../services/firebase'

class EventList extends React.Component {

  static propTypes = {
    events: React.PropTypes.object.isRequired,
    select: React.PropTypes.func,
    // @TODO: This should not be necessary! But for now it silences ESLint
    synced: React.PropTypes.func,
    syncing: React.PropTypes.func,
  }

  static styles = {
    TableRow: {
      height: 80
    },
    TableRowColumn: {
      width: 65
    }
  }

  events = firebase.database().ref('/events')

  // eslint-disable-next-line no-invalid-this
  synced = snapshot => this.props.synced(snapshot.val())

  onRowClick(eventId) {
    this.props.select(eventId)
  }

  componentDidMount() {
    this.props.syncing(true)
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

    const progressVisibility = this.props.events.meta.syncing
      ? 'visible'
      : 'hidden'

    return (
      <div>
        {this.props.events.meta.syncing
        && <LinearProgress mode="indeterminate" style={{ visibility: progressVisibility }}/>
        }
        <Table
          onRowSelection={indexes =>
            indexes.length
              ? this.onRowClick(entries[indexes[0]].id)
              // Deselect
              : this.onRowClick(null)
        }>
          <TableBody displayRowCheckbox={false}>
            {entries.map(entry =>
              <TableRow
                key={entry.id}
                selected={entry.id === meta.current}
                style={EventList.styles.TableRow}
              >
                <TableRowColumn style={EventList.styles.TableRowColumn}>
                  <Avatar src={entry.coverUrl} size={80} />
                </TableRowColumn>
                <TableRowColumn>
                  <h3>{entry.title}</h3>
                  <p>{`${entry.location.venue}, ${entry.location.city}`}<br />
                  {(new Date(entry.startsAt)).toLocaleString()}</p>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
  synced: events.synced,
  syncing: events.syncing,
}

export default connect(mapState, mapDispatch)(EventList)
