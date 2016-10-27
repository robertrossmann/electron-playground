import React from 'react'
import { connect } from 'react-redux'

function EventDetail(props) {
  if (!props.event) {
    return <div id="event-detail" />
  }

  const { event } = props

  return (
    <div id="event-detail">
      <h2>{event.title}</h2>
      <img className="cover-art" src={event.coverUrl} />
    </div>
  )
}

EventDetail.propTypes = {
  event: React.PropTypes.object,
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

  return {
    event: current
      ? state.events.getIn(['entries', current]).toJS()
      : null,
  }
}

const mapDispatch = {}

export default connect(mapState, mapDispatch)(EventDetail)
