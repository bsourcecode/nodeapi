var express = require('express');
var router = express.Router();

var CauthCtrl = require('../controllers/authController');

/* GET home page. */
router.post('/', CauthCtrl.authentication);

module.exports = router;