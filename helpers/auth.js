const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signIn = async function(request, response, next){
  try {

    let user = await db.AdminUser.findOne({
      email: request.body.email
    });

    let { id, email, firstName, lastName, school } = user
    let isMatch = await user.comparePassword(request.body.password);
    if (isMatch){
      let token = jwt.sign({
        id,
        email,
        firstName,
        lastName,
        school
      }, 
      process.env.SECRET_KEY
      );
      return response.status(200).json({
        id,
        email,
        firstName,
        lastName,
        school,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/password. not matched"
        
      });
    }
  } catch (error){
    return next({
      status: 400,
      message: "Invalid Email/password" + error.message
    });
  }
  
  //finding a user
  //password matches
  //if matches, sign them in.
  //signing and sending a token
}

exports.signUp = async function(request, response, next){
  const user = db.AdminUser.create(request.body.user)
    .then(function(newUser){
      let { id, email, firstName, lastName } = newUser
      let token = jwt.sign({id, email, firstName, lastName}, process.env.SECRET_KEY);
      var school = db.School.create(request.body.school)
      .then(function(newSchool){
        newSchool.admin = newUser._id
        newUser.school = newSchool._id
        newUser.save(function(err, newUser){
          if(err){
            response.send(err + "Can't save User")
          }
          newSchool.save(function(err, newSchool){
            if(err){
              response.send(err + "Can't save School, but saved user")
            }
            response.send(newSchool + newUser);
          })
        })
      })
    })
    .catch(function(err){
      if (err.code === 11000){
        err.message = "Sorry that username and/or email is takenf"
      }
      return next({
        status: 400,
        message: err.message
      })
    })

  // try {
  //   let user = await db.AdminUser.create(request.body);
    
  //   let token = jwt.sign(
  //     {
  //       id,
  //       email,
  //       firstName,
  //       lastName
  //     }, 
  //     process.env.SECRET_KEY
  //   );

  //   return response.status(200).json({
  //     id,
  //     email,
  //     firstName,
  //     lastName,
  //     school,
  //     token
  //   })
  //   // create a user
  //   // create a token
  // } catch(err){

  //   if (err.code === 11000){
  //     err.message = "Sorry that username and/or email is takenf"
  //   }
  //   return next({
  //     status: 400,
  //     message: err.message
  //   })
  //   // see what err
  //   //respond with email already taken
  //   //or generic
  //   //helpful error message
  // }
};