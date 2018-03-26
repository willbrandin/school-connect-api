var express = require('express');
var router = express.Router();
var calendarHelper = require('../helpers/calendar');

//EVENT AS RELATES TO SCHOOL
router.route('/:schoolId')
  .get(calendarHelper.getSchoolCalendarEvents)
  .post(calendarHelper.createCalendarEvent)

//EVENT AS IT RELATES TO (SELF)
router.route('/event/:eventId')
  .get(calendarHelper.getCalendarEvent)
  .put(calendarHelper.updateCalendarEvent)

module.exports = router;
