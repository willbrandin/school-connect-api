var database = require('../models');

exports.createNewLink = function(request, response) {
   database.Link.create(request.body)
   .then(function(newLink){
       response.json(newLink);
   })
   .catch(function(err){
       response.send(err);
   })
}

module.exports = exports
