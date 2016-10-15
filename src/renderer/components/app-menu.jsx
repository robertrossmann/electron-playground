import React from 'react'
import { connect } from 'react-redux'
import {
  Paper,
  Toolbar,
  ToolbarGroup,
  TextField,
} from 'material-ui'
import { events } from '../redux/actions'

/**
 * Main Application Menu Component
 *
 * @param   {Object}      props     React props to be passed to the component
 * @return  {DOMNode}
 */
class AppMenu extends React.Component {

  static propTypes = {
    filter: React.PropTypes.func.isRequired,
    filterValue: React.PropTypes.string.isRequired,
  }

  static styles = {
    paper: {
      position: 'fixed',
      width: '100%',
    },

    toolbar: {
      height: '80px',
      paddingTop: '15px',
    }
  }

  onFilterChange(text) {
    this.props.filter(text)
  }

  render() {
    return (
      <Paper
        rounded={false}
        style={AppMenu.styles.paper}
      >
        <Toolbar style={AppMenu.styles.toolbar}>
          <ToolbarGroup>
            <TextField
              name="events-filter"
              hintText="Filter events..."
              value={this.props.filterValue}
              onChange={event => this.onFilterChange(event.target.value)}
            />
          </ToolbarGroup>
        </Toolbar>
      </Paper>
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
  return {
    filterValue: state.events.getIn(['meta', 'filter'])
  }
}

const mapDispatch = {
  filter: events.filter
}

export default connect(mapState, mapDispatch)(AppMenu)
