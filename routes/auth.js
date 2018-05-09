var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

router.post('/signup', authHelper.signUp);
router.post('/signin', authHelper.signIn);

module.exports = router 