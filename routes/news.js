var express = require("express");
var router = express.Router();
var newsHelpers = require('../helpers/news-article');

router.route('/:schoolId')
  .get(newsHelpers.getSchoolNews)
  .post(newsHelpers.createNewsStory)


module.exports = router;
