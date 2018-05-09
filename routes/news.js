var express = require("express");
var router = express.Router();
var newsHelpers = require('../helpers/news-article');
const { loginRequired, ensureCorrectUser } = require("../middleware/auth")

//NEWS AS RELATES TO SCHOOL
router.route('/:schoolId')
  .get(newsHelpers.getSchoolNews) //gets news articles for school obj. //BOTH
  .post(loginRequired, ensureCorrectUser, newsHelpers.createNewsStory) //creates a new Article. //WEB 

//NEWS AS RELATES TO THE ARTICLE (SELF)
router.route('/article/:newsId')
  .get(newsHelpers.getNewsStory) //gets a specific news article. Not to much use for PROD //possible WEB
  .put(loginRequired, ensureCorrectUser, newsHelpers.updateNewsArticle) //used to update a news article. //WEB

module.exports = router;
