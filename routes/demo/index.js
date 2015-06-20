var express = require('express');
var router = express.Router();
var config = require('config');

// GET /
router.get('/', function(req, res, next) {
  res.render('demo/index', {
    title: config.get('site.demo'),
    banner: config.get('content.demo.banner'),
    home_title: config.get('site.demo')
  });
});
// GET /callback
router.get('/callback', function(req,res,next){
  res.render('demo/index',{
    title: config.get('site.demo'),
    banner: config.get('content.demo.banner'),
    home_title: config.get('site.demo'),
    token: req.query.token
  })
});

module.exports = router;
