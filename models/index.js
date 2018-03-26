var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/school-connect-api');

mongoose.Promise = Promise;

module.exports.School = require("./school");
module.exports.NewsArticle = require('./news-article');
