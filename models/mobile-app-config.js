var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let mobileAppConfigSchema = new Schema({
  defaultImgUrl: {
    type: String,
    required: 'Img cannot be blank'
  },
  primaryColor: {
    type: String,
    required: 'primaryColor cannot be blank'
  },
  secondaryColor: {
    type: String,
    required: 'secondaryColor cannot be blank'
  },
  features: {
    type: [String],
    required: false
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School',
    required: true
  }
});

module.exports = mongoose.model('MobileAppConfig', mobileAppConfigSchema);
