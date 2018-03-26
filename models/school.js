var mongoose = require("mongoose");

var schoolSchema = new mongoose.Schema({
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
  }

});

var School = mongoose.model('School', schoolSchema);

module.exports = School;
