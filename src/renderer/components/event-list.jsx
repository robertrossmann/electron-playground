import React from 'react'
import {
  ListGroup
} from 'react-photonkit'
import EventListItem from './event-list-item'

const events = [{
  id: 1,
  name: 'First event on the list',
  location: 'STRV Office',
  startsAt: new Date()
}, {
  id: 2,
  name: 'Second event',
  location: 'New York',
  startsAt: new Date()
}, {
  id: 3,
  name: 'Third event',
  location: 'San Francisco',
  startsAt: new Date()
}]

export default class EventList extends React.Component {

  render() {
    return (
      <ListGroup>
        <li className="list-group-header">
          <input type="text" className="form-control" placeholder="Search events" />
        </li>
        {events.map((event, i) =>
          <EventListItem
            key={i}
            event={event.name}
            location={event.location}
            startsAt={event.startsAt.toLocaleString()}
            />
        )}
      </ListGroup>
    )
  }
}
