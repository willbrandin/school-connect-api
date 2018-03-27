var express = require('express');
var router = express.Router();
var configHelper = require('../helpers/mobile-app-config');

//EVENT AS RELATES TO SCHOOL
router.route('/:schoolId')
  .get(configHelper.getMobileAppConfigForSchool) //gets the config for the mobile app. has colors, feature data, and default img. //BOTH
  .post(configHelper.createMobileAppConfig) //creates the mobile app config. //WEB for INIT
  .put(configHelper.updateMobileAppConfig) //update the mobile app config. //WEB

module.exports = router;
