var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let linkSchema = new Schema({
  linkUrl: {
    type: String,
    required: 'Link needs a url'
  },
  title: {
    type: String,
    required: 'Link needs a title'
  }
});

module.exports = mongoose.model('Link', linkSchema);
