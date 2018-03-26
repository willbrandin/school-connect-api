var mongoose = require("mongoose");
//var SchoolInfo = require('./school-info');
var MobileAppConfig = require('./mobile-app-config');
var NewsArticle = require('./news-article');
var CalendarEvent = require('./calendar-event');
var Link = require('./link');

let Schema = mongoose.Schema;

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
  },
  mobileAppConfig: {
    type: Schema.Types.ObjectId,
    //required: true,
    ref: 'MobileAppConfig'
  },
  newsArticles: [{
    type: Schema.Types.ObjectId,
    ref: 'NewsArticle'
  }],
  calendarEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'CalendarEvent'
  }],
  links: [{
    type: Schema.Types.ObjectId,
    ref: 'Link'
  }]

});

var School = mongoose.model('School', schoolSchema);

module.exports = School;
