var mongoose = require("mongoose");
//var SchoolInfo = require('./school-info');
var MobileAppConfig = require('./mobile-app-config');
var NewsArticle = require('./news-article');
var CalendarEvent = require('./calendar-event');
var Link = require('./link');
var SchoolInfo = require('./school-info');
var Messages = require('./message');

let Schema = mongoose.Schema;

var schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name cannot be blank'
  },
  schoolInfo: {
    type: Schema.Types.ObjectId,
    ref: 'SchoolInfo'
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
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Messages'
  }]
  //Add info that contains city, state info, relates to school itself.
});

var School = mongoose.model('School', schoolSchema);

module.exports = School;
