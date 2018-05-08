require('dotenv').load();
const jwt = require('jsonwebtoken');

//authorize
//make sure user is logged in

exports.loginRequired = function(request, response, next){
  try {
    const token = request.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
      if (decoded){
        return next();
      } else {
        return next({
          status: 401,
          message: "Please log in first"
        })
      }
    })
  } catch(error){
    return next({
      status: 401,
      message: "Please log in first"
    })
  }
};

//authenticate
//make sure we get correct user
exports.ensureCorrectUser = function(request, response, next){
  try {
    const token = request.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
      // && decoded.schoolId === request.params.schoolId
      if (decoded){
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized"
        })
      }
    })
  } catch(error){
    return next({
      status: 401,
      message: "Unauthorized"
    })
  }
};
