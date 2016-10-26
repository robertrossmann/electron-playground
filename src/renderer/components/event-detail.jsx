import React from 'react'
import { connect } from 'react-redux'

class EventDetail extends React.Component {

  static propTypes = {
    event: React.PropTypes.object,
  }

  renderEvent(event) {
    return (
      <div style={{ padding: 20 }}>
        <h2>{event.title}</h2>
        <img src={event.coverUrl} style={{ width: '100%' }} />
      </div>
    )
  }

  renderEmpty() {
    return null
  }

  render() {
    return this.props.event
      ? this.renderEvent(this.props.event)
      : this.renderEmpty()
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
  const current = state.events.getIn(['meta', 'current'])

  return {
    event: current
      ? state.events.getIn(['entries', current]).toJS()
      : null,
  }
}

const mapDispatch = {}

export default connect(mapState, mapDispatch)(EventDetail)
