var database = require('../models');
var Message = require('../models/message');


exports.getMessages = function(request, response){
  Message.find({ school: request.params.schoolId }, function(err, messages){
    if (err){
      response.send(err);
    }
    response.json(messages);
  })
}


exports.createNewMessage = function(request, response){
    database.School.findById(request.params.schoolId)
      .then(function(school){
        let newMessage = new Message();

        newMessage.name = request.body.name;
        newMessage.school = school._id;
        newMessage.save(function(err, message){
          if(err){
              response.send(err);
          }
          school.messages.push(newMessage)
          school.save(function(err){
            if (err){
              response.send(err);
            }
            response.send({ message: 'New Message saved'})
          })
        })
      })
    .catch(function(err){
      response.send(err);
    })
}

module.exports = exports