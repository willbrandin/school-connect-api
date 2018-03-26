var database = require('../models');

exports.getSchools = function(request, response){
   database.School.find()
   .then(function(schools){
       response.json(schools);
   })
   .catch(function(err){
       response.send(err);
   })
}

exports.createSchool = function(request, response) {
   database.School.create(request.body)
   .then(function(newSchool){
       response.json(newSchool);
   })
   .catch(function(err){
       response.send(err);
   })
}

exports.getSchool = function(request, response){
    database.School.findById(request.params.schoolId)
    .then(function(foundSchool){
        response.json(foundSchool);
    })
    .catch(function(err){
        response.send(err);
    })
}

exports.updateSchool = function(request, response){
   database.School.findOneAndUpdate({_id: request.params.schoolId}, request.body, {new: true})
   .then(function(school){
       response.json(school);
   })
   .catch(function(err){
        response.send(err);
    })
}

exports.deleteSchool = function(request, response){
   database.School.remove({_id: request.params.schoolId})
   .then(function(){
       response.json({message: 'We deleted it.'});
   })
   .catch(function(err){
        response.send(err);
    })
}


module.exports = exports
