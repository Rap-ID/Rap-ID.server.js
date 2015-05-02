var express = require('express');
var router = express.Router();
var config = require('config');

// GET /
router.get('/', function(req, res, next) {
  res.render('main/index', {
    title: config.get('site.front'),
    banner: config.get('content.front.banner'),
    home_title: config.get('site.front')
  });
});
// GET /reg
router.get('/reg', function(req, res, next) {
  res.render('main/reg', {
    title: config.get('site.front'),
    banner: config.get('content.front.banner'),
    home_title: config.get('site.front')
  });
});
// POST /reg
router.post('/reg', require('./reg.post'));

module.exports = router;
