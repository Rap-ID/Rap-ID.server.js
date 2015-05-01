var express = require('express');
var router = express.Router();
var config = require('config');

//home page
router.get('/', function(req, res, next) {
  res.render('main/index', {
    title: config.get('site.demo'),
    banner: config.get('content.demo.banner'),
    home_title: config.get('site.demo')
  });
});

module.exports = router;