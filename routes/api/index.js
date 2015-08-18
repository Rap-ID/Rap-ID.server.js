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
// GET /auth & POST /auth
var auth = function(req, res, next) {
  var querystring = require('querystring');
  var getParam = function(name) {
    return req.query[name] || req.body[name];
  };
  res.render('api/auth', {
    title: config.get('site.front'),
    banner: config.get('content.front.banner'),
    home_title: config.get('site.front'),
    callUrl: 'rapid://authorize/?' + querystring.stringify({
      app: getParam('app'),
      callback: getParam('callback')
    }),
    callback: getParam('callback')
  });
};
router.get('/auth', auth);
router.post('/auth', auth);
// POST /webAuth
router.post('/webAuth', require('./webAuth'));

module.exports = router;
