var express = require('express');
var router = express.Router();
var config = require('config');

// GET /
router.get('/', function(req, res, next) {
  res.render('api/index', {
    title: config.get('site.front'),
    banner: config.get('content.front.banner'),
    home_title: config.get('site.front')
  });
});
// POST /login
router.post('/login', require('./login'));
// POST /reg
router.post('/reg', require('./reg'));

module.exports = router;
