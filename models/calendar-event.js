var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let calendarEventSchema = new Schema({
  location: {
    type: String,
    required: 'Event needs a location'
  },
  startDate: {
    type: Date,
    required: 'Event needs start date'
  },
  endDate: {
    type: Date,
    required: false
  },
  description: {
    type: String,
    required: 'Description cannot be blank'
  },
  title: {
    type: String,
    required: 'Event needs title'
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School',
    required: true
  }
});

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);
