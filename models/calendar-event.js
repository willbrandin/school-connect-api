var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let calendarEventSchema = new Schema({
  location: {
    type: String,
    required: 'Event needs a location'
  },
  startDate: {
    type: String,
    required: 'Event needs start date'
  },
  endDate: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: 'Description cannot be blank'
  },
  title: {
    type: String,
    required: 'Event needs title'
  }
});

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);
