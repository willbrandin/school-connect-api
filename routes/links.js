var express = require('express');
var router = express.Router();
var linkHelper = require('../helpers/links');

//EVENT AS RELATES TO SCHOOL
router.route('/:schoolId')
  .get(linkHelper.getSchoolHomeLinks)
  .post(linkHelper.createHomeLink)

//EVENT AS IT RELATES TO (SELF)
router.route('/link/:linkId')
  .get(linkHelper.getHomeLink)
  .put(linkHelper.updateHomeLink)

module.exports = router;
