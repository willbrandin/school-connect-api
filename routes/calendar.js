var express = require('express');
var router = express.Router();
var calendarHelper = require('../helpers/calendar');
const { loginRequired, ensureCorrectUser } = require("../middleware/auth")

//EVENT AS RELATES TO SCHOOL
router.route('/:schoolId')
  .get(calendarHelper.getSchoolCalendarEvents) //gets all events for school obj. //BOTH
  .post(loginRequired, ensureCorrectUser, calendarHelper.createCalendarEvent) //creates a new calendar event. //WEB

//EVENT AS IT RELATES TO (SELF)
router.route('/event/:eventId')
  .get(calendarHelper.getCalendarEvent) //gets a single calendar event. Should not be needed in PROD. //WEB
  .put(calendarHelper.updateCalendarEvent) //updates a single calendar event. //WEB

module.exports = router;
