var database = require('../models');
var Calendar = require('../models/calendar-event');

//GET
// get all calendar objcs for schools
// 'api/calendar/:schoolId'
exports.getSchoolCalendarEvents = function(request, response){
  Calendar.find({ school: request.params.schoolId }, function(err, newEvent){
    if (err){
      response.send(err);
    }
    response.json(newEvent);
  })
}

//POST
// Creates new calendar objc for school
// 'api/calendar/:schoolId'
exports.createCalendarEvent = function(request, response) {
   database.School.findById(request.params.schoolId)
   .then(function(school) {
     let newEvent = new Calendar();

     newEvent.title = request.body.title;
     newEvent.description = request.body.description;
     newEvent.startDate = request.body.startDate;
     newEvent.endDate = request.body.endDate;
     newEvent.location = request.body.location;
     newEvent.school = school._id;

     newEvent.save(function(err, newStory){
       if (err){
         response.send(err);
       }
       school.calendarEvents.push(newEvent)
       school.save(function(err){
         if (err){
           response.send(err);
         }
         response.send({ message: 'New Event saved' })
       })
     })
   })
   .catch(function(err){
     response.send(err);
   })
}


//GET
/// Gets a specific Calendar event with eventId
// 'api/calendar/event/:eventId'
exports.getCalendarEvent = function(request, response){
  Calendar.findById(request.params.eventId)
  .then(function(newEvent){
    response.json(newEvent);
  })
  .catch(function(err){
    response.send(err);
  })
}

//PUT
/// Updates a specific calendar event with eventId
// 'api/calendar/event/:eventId'
exports.updateCalendarEvent = function(request, response){
   Calendar.findOneAndUpdate({ _id: request.params.eventId }, request.body, {new: true})
   .then(function(newEvent){
       response.json(newEvent);
   })
   .catch(function(err){
        response.send(err);
    })
}


module.exports = exports
