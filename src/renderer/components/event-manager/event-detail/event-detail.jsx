import React from 'react'
import {
  Divider,
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  FloatingActionButton,
} from 'material-ui'
import { EditorModeEdit as EditIcon } from 'material-ui/svg-icons'
import { connect } from 'react-redux'
import qs from 'querystring'
import config from '../../../../config'

function EventDetail(props) {
  if (!props.event) {
    return <div id="event-detail" />
  }

  const { event } = props
  const googleQuery = qs.stringify({
    key: config.googleMaps.apiKey,
    // eslint-disable-next-line id-length
    q: `${event.location.coordinates.lat},${event.location.coordinates.lon}`,
    zoom: 15,
  })
  const mapUrl = `https://www.google.com/maps/embed/v1/place?${googleQuery}`

  return (
    <div id="event-detail">
      <div className="event-detail-title-container">
        <div>
          <h3>{event.title}</h3>
        </div>
        <div>
          <FloatingActionButton secondary>
            <EditIcon />
          </FloatingActionButton>
        </div>
      </div>
      <img className="cover-art bordered" src={event.coverUrl} />
      <Section title="General" separated>
        <Row title="Kind" value={event.kind} />
        <Row title="Current state" value={event.state} />
        <Row title="Starts at" value={event.startsAt} />
        <Row title="Finished at" value={event.finishedAt || '---'} />
      </Section>
      <Section title="Pricing & availability" separated>
        <Row title="Available on" value={event.purchasesOpenAt || '---'} />
        <Row
          title="Purchase time"
          value={
            event.purchaseWindow
              ? `${event.purchaseWindow} min`
              : '---'
          }
        />
        <Row title="Presence required" value={event.requiresPresence ? 'Yes' : 'No'} />
        <Row title="Track purchases allowed" value={event.allowsTrackPurchases ? 'Yes' : 'No'} />
        <Row title="Event price" value={`$${event.eventSKU.split('.').pop() - 0.01}`} />
        <Row title="Track price" value={`$${event.trackSKU.split('.').pop() - 0.01}`} />
      </Section>
      <Section title="Location">
        <Row title="Venue" value={event.location.venue} />
        <Row title="City" value={event.location.city} />
        <Row title="Country" value={event.location.country} />
      </Section>
      <iframe
        className="google-map bordered"
        frameBorder="0"
        src={mapUrl}
      />
    </div>
  )
}

EventDetail.propTypes = {
  event: React.PropTypes.object,
}


function Section(props) {
  return (
    <div>
      <h4>{props.title}</h4>
      <Table selectable={false}>
        <TableBody displayRowCheckbox={false}>
          {props.children}
        </TableBody>
      </Table>
      {props.separated && <Divider />}
    </div>
  )
}

Section.propTypes = {
  children: React.PropTypes.node,
  separated: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired,
}


function Row(props) {
  return (
    <TableRow displayBorder={false}>
      <TableRowColumn>{props.title}</TableRowColumn>
      <TableRowColumn>{props.value}</TableRowColumn>
    </TableRow>
  )
}

Row.propTypes = {
  title: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
}


/**
 * Map state to component props
 *
 * @private
 * @param     {Object}    state    Redux state
 * @return    {Object}
 */
function mapState(state) {
  const current = state.events.getIn(['meta', 'current'])
  const event = current
    ? state.events.getIn(['entries', current]).toJS()
    : null
  const dates = [
    'startsAt',
    'finishedAt',
    'purchasesOpenAt',
  ]

  if (event) {
    // Normalise some fields for display
    for (const field of dates) {
      if (event[field]) {
        event[field] = new Date(event[field]).toLocaleString()
      }
    }
  }

  return {
    event,
  }
}

const mapDispatch = {}

export default connect(mapState, mapDispatch)(EventDetail)
