var express = require('express');
var router = express.Router();
var config = require('config');
var _md=require('markdown-it'),
  md=new _md();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: config.get('site.front'),
    banner: config.get('content.front.banner'),
    home_title: config.get('site.front')
  });
});

module.exports = router;
