var express = require("express");
var router = express.Router();
var newsHelpers = require('../helpers/news-article');

//NEWS AS RELATES TO SCHOOL
router.route('/:schoolId')
  .get(newsHelpers.getSchoolNews)
  .post(newsHelpers.createNewsStory)

//NEWS AS RELATES TO THE ARTICLE (SELF)
router.route('/article/:newsId')
  .get(newsHelpers.getNewsStory)
  .put(newsHelpers.updateNewsArticle)

module.exports = router;
