var express = require('express');
var router = express.Router();
var config = require('config');

// GET /
router.get('/', function(req, res, next) {
  var querystring = require('querystring');
  res.render('demo/index', {
    title: config.get('site.demo'),
    banner: config.get('content.demo.banner'),
    home_title: config.get('site.demo'),
    uri: config.get('server.base') + 'api/auth?' + querystring.stringify({
      callback: config.get('server.base') + 'demo/callback?token=',
      app: config.get('server.demoAppKey')
    })
  });
});
// GET /callback
router.get('/callback', function(req, res, next) {
  res.render('demo/callback', {
    title: config.get('site.demo'),
    banner: config.get('content.demo.banner'),
    home_title: config.get('site.demo'),
    token: req.query.token,
    api: config.get('server.api')
  });
});

module.exports = router;
