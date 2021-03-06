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
// GET /doc
router.get('/doc', function(req,res,next){
  res.redirect('https://github.com/Rap-ID/Rap-ID')
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
// GET /download
router.get('/download', require('./download'));

module.exports = router;
