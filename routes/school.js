var express = require("express");
var router = express.Router();
var schoolHelpers = require('../helpers/school');


router.route('/')
  .get(schoolHelpers.getAllSchools)
  .post(schoolHelpers.createNewSchool)

//
router.route('/list')
  .get(schoolHelpers.getListOfSchools)

//REFERS TO SCHOOL OBJECT (SELF)
router.route('/:schoolId')
  .get(schoolHelpers.getSchool)
  .put(schoolHelpers.updateSchool)
  .delete(schoolHelpers.deleteSchool)

//School info obj
router.route('/info/:schoolId')
  .get(schoolHelpers.getSchoolInfo)
  .post(schoolHelpers.addSchoolInfo)


module.exports = router;
