var express = require('express');
var router = express.Router();
var config = require('config');

// GET /
router.get('/', function(req, res, next) {
  var querystring=require('querystring');
  res.render('demo/index', {
    title: config.get('site.demo'),
    banner: config.get('content.demo.banner'),
    home_title: config.get('site.demo'),
    uri: config.get('server.base')+'api/auth?'+querystring.stringify({callback: config.get('server.base') + 'demo/callback?token=', 
      app: '88587CD267E00E016B545E38FD133FCA077535F9B91C0E246FCD48AA5C77996DC935833C27C9A0EC0888D15ACD941C0B461716F61EAC6B7410BB9C46642B0808BF4C32E261A40F385070B87F9CBCE3B51B20E83A8D11B08D'})
  });
});
// GET /callback
router.get('/callback', function(req, res, next) {
  res.render('demo/callback', {
    title: config.get('site.demo'),
    banner: config.get('content.demo.banner'),
    home_title: config.get('site.demo'),
    token: req.query.token,
    demo_callback: true,
    api: config.get('server.api')
  });
});

module.exports = router;
