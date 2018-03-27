var database = require('../models');
var Config = require('../models/mobile-app-config');


//GET
// get all Config objcs for schools
// 'api/links/:schoolId'
exports.getMobileAppConfigForSchool = function(request, response){
    Config.find({ school: request.params.schoolId }, function(err, newConfig){
      if (err){
        response.send(err);
      }
      response.json(newConfig);
    })
  }


//POST
// Creates new config objc for school
// 'api/config/:schoolId'
exports.createMobileAppConfig = function(request, response) {
    database.School.findById(request.params.schoolId)
    .then(function(school) {
      let newConfig = new Config();
 
      newConfig.defaultImgUrl = request.body.defaultImgUrl;
      newConfig.primaryColor = request.body.primaryColor;
      newConfig.secondaryColor = request.body.secondaryColor;
      newConfig.features = request.body.features;
      newConfig.school = school._id;
 
      newConfig.save(function(err, newConfig){
        if (err){
          response.send(err);
        }
        school.mobileAppConfig = newConfig
        school.save(function(err){
          if (err){
            response.send(err);
          }
          response.send({ message: 'New Config saved' })
        })
      })
    })
    .catch(function(err){
      response.send(err);
    })
 }


 //PUT
/// Updates a config with schoolId
// 'api/config//:schoolId'
exports.updateMobileAppConfig = function(request, response){
    Config.findOneAndUpdate({ school: request.params.schoolId }, request.body, {new: true})
    .then(function(newConfig){
        response.json(newConfig);
    })
    .catch(function(err){
         response.send(err);
     })
 }

module.exports = exports
