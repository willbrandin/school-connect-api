var database = require('../models');
var SchoolInfo = require('../models/school-info')

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

//GET
//gets the specific school info such as name, city, state, etc. 
// 'api/school/info/:schoolId'
exports.getSchoolInfo = function(request, response){
    SchoolInfo.find({ school: request.params.schoolId }, function(err, newInfo){
        if (err){
          response.send(err);
        }
        response.json(newInfo);
      })
}

//POST
//creates the specific school info such as name, city, state, etc. 
// 'api/school/info/:schoolId'
exports.addSchoolInfo = function(request, response){
    database.School.findById(request.params.schoolId)
   .then(function(school) {
     let newInfo = new SchoolInfo();
     newInfo.name = request.body.name;
     newInfo.city = request.body.city;
     newInfo.state = request.body.state;
     newInfo.school = school._id;
     newInfo.save(function(err, newInfo){
       if (err){
         response.send(err);
       }
       school.schoolInfo = newInfo;
       school.save(function(err){
         if (err){
           response.send(err);
         }
         response.send({ message: 'New Info saved' })
       })
     })
   })
   .catch(function(err){
     response.send(err);
   })
}

//PUT
/// Updates a school info with schoolId
// 'api/school/info/:schoolId'
exports.updateSchoolInfo = function(request, response){
    SchoolInfo.findOneAndUpdate({ school: request.params.schoolId }, request.body, {new: true})
    .then(function(newInfo){
        database.School.findById(request.params.schoolId)
        .then(function(school){
            if (newInfo.name !== school.name) {
                school.name = newInfo.name
                school.save(function(err){
                    if (err){
                      response.send(err);
                    }
                  })
            }
            newInfo.save(function(err){
                if (err){
                    response.send(err);
                }
                response.json(newInfo)
            })
        })
        .catch(function(err){
            response.json(err);
        })
        //response.json(newInfo);
    })
    .catch(function(err){
         response.send(err);
     })
 }



module.exports = exports
