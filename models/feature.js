var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let featureSchema = new Schema({
  linkUrl: {
    type: String,
    required: 'Link needs a url'
  },
  title: {
    type: String,
    required: 'Link needs a title'
  }
});

module.exports = mongoose.model('Feature', featureSchema);
