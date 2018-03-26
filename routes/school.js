var express = require("express");
var router = express.Router();
var database = require('../models');
var helpers = require('../helpers/school')


router.route('/')
    .get(helpers.getSchools)
    .post(helpers.createSchool)

router.route('/:schoolId')
    .get(helpers.getSchool)
    .put(helpers.updateSchool)
    .delete(helpers.deleteSchool)

module.exports = router;
