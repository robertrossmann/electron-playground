import React from 'react'
import {
  Input,
  Radio
} from 'react-photonkit'
import RadioGroup from './radio-group'
import { connect } from 'react-redux'

class EventDetail extends React.Component {

  static propTypes = {
    event: React.PropTypes.object
  }

  render() {
    const event = this.props.event

    if (!event) {
      return null
    }

    return (
      <div className="padded-more">
        <form>
          <Input
            type="text"
            label="Event's title"
            value={event.title}
          />

          <RadioGroup name="kind">
            <Radio label="Live" checked={event.kind === 'live'} value="live" />
            <Radio label="Prerecorded" checked={event.kind === 'prerecorded'} value="prerecorded" />
          </RadioGroup>
        </form>
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

  return {
    event: data.entries[data.meta.current]
  }
}

const mapDispatch = {}

export default connect(mapState, mapDispatch)(EventDetail)
