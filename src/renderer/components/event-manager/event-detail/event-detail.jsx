import React from 'react'
import {
  Divider,
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui'
import { connect } from 'react-redux'

function EventDetail(props) {
  if (!props.event) {
    return <div id="event-detail" />
  }

  const { event } = props

  return (
    <div id="event-detail">
      <img className="cover-art" src={event.coverUrl} />
      <h3>{event.title}</h3>
      <Divider />
      <Section title="General information">
        <Row title="Kind" value={event.kind} />
        <Row title="Current state" value={event.state} />
        <Row title="Starts at" value={event.startsAt} />
        <Row title="Finished at" value={event.finishedAt || '---'} />
      </Section>
      <Section title="Pricing & availability" last>
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
      {!props.last && <Divider />}
    </div>
  )
}

Section.propTypes = {
  children: React.PropTypes.node,
  last: React.PropTypes.bool,
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
