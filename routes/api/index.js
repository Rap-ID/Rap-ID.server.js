var express = require('express');
var router = express.Router();
var config = require('config');

// GET /
router.get('/', function(req, res, next) {
  res.redirect('https://github.com/Rap-ID/Rap-ID');
});
// POST /login
router.post('/login', require('./login'));
// POST /reg
router.post('/reg', require('./reg'));
// GET /user/(:token)
router.get('/user', require('./user'));

module.exports = router;
