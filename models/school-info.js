var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schoolInfoSchema = new Schema({
  name: {
    type: String,
    required: 'Name cannot be blank'
  },
  city: {
    type: String,
    required: 'City cannot be blank'
  },
  state: {
    type: String,
    required: 'State cannot be blank'
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School',
    required: true
  }
});

module.exports = mongoose.model('SchoolInfo', schoolInfoSchema);
