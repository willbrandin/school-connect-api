var express = require("express");
var router = express.Router();
var database = require('../models');
var schoolHelpers = require('../helpers/school');
var newsHelpers = require('../helpers/news-article');
var linkHelpers = require('../helpers/link')

router.route('/')
  .get(schoolHelpers.getAllSchools)
  .post(schoolHelpers.createNewSchool)

router.route('/:schoolId')
  .get(schoolHelpers.getSchool)
  .put(schoolHelpers.updateSchool)
  .delete(schoolHelpers.deleteSchool)

router.route('/news/:schoolId')
  .get(newsHelpers.getSchoolNews)
  .post(newsHelpers.createNewsStory)


module.exports = router;
