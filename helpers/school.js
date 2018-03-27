var database = require('../models');


//GET
///Gets all school news
// 'api/school'
exports.getAllSchools = function(request, response){
   database.School.find()
   .then(function(schools){
       response.json(schools);
   })
   .catch(function(err){
       response.send(err);
   })
}

//POST
///Creates a new School Obj
//should occur on sign up for new user?
// 'api/school'
exports.createNewSchool = function(request, response) {
   database.School.create(request.body)
   .then(function(newSchool){
       response.json(newSchool);
   })
   .catch(function(err){
       response.send(err);
   })
}


//GET 
//Gets the list of schools for user search
// '/api/school/list?name='name'
exports.getListOfSchools = function(request, response){
    var query = request.query['name']

    if (query !== "" && query.length >= 3 ) {
        var searchKey = new RegExp(query, 'i')
        database.School.findOne({ name: searchKey }, function (err, school) {
            if (err) {
                response.json(err);
            }
            if (school != null){
                response.json({name: school.name, id: school._id});
            } else {
                response.json({ message: 'no school matches query' });
            }
        });
    } else {
        response.json({ message: 'search empty or not long enough' });
    }
    
 }

//GET
///Gets a single School obj
// 'api/school/:schoolId'
exports.getSchool = function(request, response){
    database.School.findById(request.params.schoolId)
    .then(function(foundSchool){
        response.json(foundSchool);
    })
    .catch(function(err){
        response.send(err);
    })
}

//PUT
///Updates a School Obj
// 'api/school/:schoolId'

exports.updateSchool = function(request, response){
   database.School.findOneAndUpdate({_id: request.params.schoolId}, request.body, {new: true})
   .then(function(school){
       response.json(school);
   })
   .catch(function(err){
        response.send(err);
    })
}

//Delete
///Deletes a School Obj
// 'api/school/:schoolId'
//// TODO: Delete all associated school data after 30 days?
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
