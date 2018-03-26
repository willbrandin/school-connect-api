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
  }
});

module.exports = mongoose.model('MobileAppConfig', mobileAppConfigSchema);
