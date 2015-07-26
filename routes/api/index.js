var express = require('express');
var router = express.Router();
var config = require('config');

// GET /
router.get('/', function (req, res, next) {
  res.redirect('https://github.com/Rap-ID/Rap-ID');
});
// POST /login
router.post('/login', require('./login'));
// POST /reg
router.post('/reg', require('./reg'));
// GET /user/(:token)
router.get('/user', require('./user'));
// GET /auth
router.get('/auth', function (req, res, next) {
  var querystring = require('querystring');
  res.render('api/auth', {
    title: config.get('site.front'),
    banner: config.get('content.front.banner'),
    home_title: config.get('site.front'),
    callUrl: 'rapid://authorize/?' + querystring.stringify({ app: req.query.app, callback: req.query.callback })
  });
});

module.exports = router;
