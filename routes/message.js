var express = require('express');
var router = express.Router();
var messageHelper = require('../helpers/message');
const { loginRequired, ensureCorrectUser } = require("../middleware/auth")


router.route('/:schoolId')
  .get(loginRequired, ensureCorrectUser, messageHelper.getMessages)
  .post(messageHelper.createNewMessage)

module.exports = router;