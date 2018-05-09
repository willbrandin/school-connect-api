var express = require('express');
var router = express.Router();
var linkHelper = require('../helpers/links');
const { loginRequired, ensureCorrectUser } = require("../middleware/auth")


//EVENT AS RELATES TO SCHOOL
router.route('/:schoolId')
  .get(linkHelper.getSchoolHomeLinks) //gets home screen links for mobile screen and for web //BOTH
  .post(loginRequired, ensureCorrectUser, linkHelper.createHomeLink) //creates a new mobile links. //WEB

//EVENT AS IT RELATES TO (SELF)
router.route('/link/:linkId')
  .get(linkHelper.getHomeLink) //get a specific link. Should not be used heavily in prod. //WEB
  .put(loginRequired, ensureCorrectUser, linkHelper.updateHomeLink) //update a specific home link //WEB

module.exports = router;
