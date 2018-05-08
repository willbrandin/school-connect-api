const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signIn = async function(request, response, next){
  try {

    let user = await db.AdminUser.findOne({
      email: request.body.email
    });

    let { id, email, schoolImageUrl, schoolId } = user
    let isMatch = await user.comparePassword(request.body.password);
    if (isMatch){
      let token = jwt.sign({
        id,
        email,
        schoolImageUrl,
        schoolId
      }, 
      process.env.SECRET_KEY
      );
      return response.status(200).json({
        id,
        email,
        schoolImageUrl,
        schoolId,
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
  try {
    let user = await db.AdminUser.create(request.body);
    let { id, email, schoolImageUrl, schoolId } = user
    let token = jwt.sign(
      {
      id,
      email,
      schoolImageUrl,
      schoolId
      }, 
      process.env.SECRET_KEY
    );

    return response.status(200).json({
      id,
      email,
      schoolImageUrl,
      schoolId,
      token
    })
    // create a user
    // create a token
  } catch(err){

    if (err.code === 11000){
      err.message = "Sorry that username and/or email is takenf"
    }
    return next({
      status: 400,
      message: err.message
    })
    // see what err
    //respond with email already taken
    //or generic
    //helpful error message
  }
};