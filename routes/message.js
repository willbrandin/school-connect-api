var express = require('express');
var router = express.Router();
var messageHelper = require('../helpers/message');

router.route('/:schoolId')
  .get(messageHelper.getMessages)
  .post(messageHelper.createNewMessage)

module.exports = router;