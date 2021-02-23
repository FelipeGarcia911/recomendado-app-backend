/**
 * User model events
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

const { EventEmitter } = require("events")

const User = require("./user.model")

const UserEvents = new EventEmitter()

// Set max event listeners (0 == unlimited)
UserEvents.setMaxListeners(0)

// Model events
const events = {
  save: "save",
  remove: "remove",
}

function emitEvent(event) {
  return doc => {
    UserEvents.emit(`${event}:${doc._id}`, doc)
    UserEvents.emit(event, doc)
  }
}

// Register the event emitter to the model events
events.forEach(e => {
  const event = events[e]
  User.schema.post(e, emitEvent(event))
})

module.exports = UserEvents
