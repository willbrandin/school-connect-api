const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signIn = async (request, response, next) => {
  try {
    let user = await db.AdminUser.findOne({
      email: request.body.email
    });

    let { id, email, firstName, lastName, school } = user
    let isMatch = await user.comparePassword(request.body.password);
    if (isMatch) {
      let token = jwt.sign({
        id,
        email,
        firstName,
        lastName,
        school
      }, process.env.SECRET_KEY
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
  } catch (error) {
    return next({
      status: 400,
      message: "Invalid Email/password" + error.message
    });
  }
}

//POST
//Creates a new user and new school.
//Once they are added to DB the object id's are saved to each other
// 'api/auth/signup'
exports.signUp = async (request, response, next) => {
  const user = db.AdminUser.create(request.body.user)
    .then((newUser) => {
      let { id, email, firstName, lastName } = newUser
      let token = jwt.sign({ id, email, firstName, lastName }, process.env.SECRET_KEY);
      var school = db.School.create(request.body.school)
      .then((newSchool) => {
        newSchool.admin = newUser._id
        newUser.school = newSchool._id
        newUser.save((err, newUser) => {
          if (err) {
            response.send(err + "Can't save User")
          }
          newSchool.save((err, newSchool) => {
            if (err) {
              //TODO: - Needs to delete the user from the DB
              response.send(err + "Can't save School, but saved user")
            }
            let respObj = {
              "school": newSchool,
              "user": newUser,
              "token": token
            }
            response.json(respObj);
          })
        })
      })
      .catch((err) => {
        if (err.code === 11000) {
          err.message = "Sorry that username and/or email is taken"
        }
        return next({
          status: 400,
          message: err.message
        })
      })
    })
    .catch((err) => {
      if (err.code === 11000){
        err.message = "Sorry that username and/or email is taken"
      }
      return next({
        status: 400,
        message: err.message
      })
    })
};
