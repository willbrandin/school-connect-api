var database = require('../models');
var Link = require('../models/link');

//GET
// get all Home Link objcs for schools
// 'api/links/:schoolId'
exports.getSchoolHomeLinks = function(request, response){
  Link.find({ school: request.params.schoolId }, function(err, newLink){
    if (err){
      response.send(err);
    }
    response.json(newLink);
  })
}

//POST
// Creates new link objc for school
// 'api/links/:schoolId'
exports.createHomeLink = function(request, response) {
   database.School.findById(request.params.schoolId)
   .then(function(school) {
     let newLink = new Link();

     newLink.title = request.body.title;
     newLink.linkUrl = request.body.linkUrl;
     newLink.school = school._id;

     newLink.save(function(err, newLink){
       if (err){
         response.send(err);
       }
       school.links.push(newLink)
       school.save(function(err){
         if (err){
           //TODO: - delete the link
           response.send(err + "School not saving link but link is saved" + newLink);
         }
         response.send({ message: 'New Link saved' })
       })
     })
   })
   .catch(function(err){
     response.send(err);
   })
}


//GET
/// Gets a specific Link with linkId
// 'api/links/link/:linkId'
exports.getHomeLink = function(request, response){
  Link.findById(request.params.linkId)
  .then(function(newLink){
    response.json(newLink);
  })
  .catch(function(err){
    response.send(err);
  })
}

//PUT
/// Updates a specific calendar event with eventId
// 'api/links/link/:linkId'
exports.updateHomeLink = function(request, response){
   Link.findOneAndUpdate({ _id: request.params.linkId }, request.body, {new: true})
   .then(function(newLink){
       response.json(newLink);
   })
   .catch(function(err){
        response.send(err);
    })
}

module.exports = exports
