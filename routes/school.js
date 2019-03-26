var express = require("express");
var router = express.Router();
var schoolHelpers = require('../helpers/school');
const { loginRequired, ensureCorrectUser } = require("../middleware/auth")


router.route('/')
  .get(schoolHelpers.getAllSchools) //not needed in PROD
  .post(loginRequired, schoolHelpers.createNewSchool) //Needed upon account Init. only //WEB on init

//
router.route('/list')
  .get(schoolHelpers.getListOfSchools) // get list of schools with search query ?name=" " //MOBILE Only

//REFERS TO SCHOOL OBJECT (SELF)
router.route('/:schoolId')
  .get(schoolHelpers.getSchool) //gets the school main obj should not be needed heavily in PROD // n/a in PROD
  .put(loginRequired, ensureCorrectUser, schoolHelpers.updateSchool) //updates the school obj. Only //WEB
  .delete(loginRequired, ensureCorrectUser, schoolHelpers.deleteSchool) //Needs to delete school and related data. Only //WEB

//School info obj
router.route('/info/:schoolId')
  .get(schoolHelpers.getSchoolInfo) //Gets the name, city, state info needed for App school selection and for web. PROD. //BOTH
  .post(loginRequired, ensureCorrectUser, schoolHelpers.addSchoolInfo)  //Adds new school info. Only needed for account Init from WEB. //WEB on init
  .put(loginRequired, ensureCorrectUser, schoolHelpers.updateSchoolInfo) //Used to update the school info. Only from WEB. //WEB

module.exports = router;
