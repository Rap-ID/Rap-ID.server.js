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
router.post('/reg', function(req, res, next) {
  var regFunction = require('../../functions/reg');
  // initialize data object
  var data = {};
  data.user = req.body.username;
  data.pass = req.body.password;
  data.pass2 = req.body['password-check'];
  // check params
  if (!data.user) {
    res.render('main/reg', {
      title: config.get('site.front'),
      banner: config.get('content.front.banner'),
      home_title: config.get('site.front'),
      error: 'Parameter \'username\' cannot be null.'
    });
    return;
  }
  if (!data.pass) {
    res.render('main/reg', {
      title: config.get('site.front'),
      banner: config.get('content.front.banner'),
      home_title: config.get('site.front'),
      error: 'Parameter \'password\' cannot be null.'
    });
    return;
  }
  if (data.pass !== data.pass2) {
    res.render('main/reg', {
      title: config.get('site.front'),
      banner: config.get('content.front.banner'),
      home_title: config.get('site.front'),
      error: 'Parameter \'password\' mismatches \'password-check\'.'
    });
    return;
  }
  // call to reg
  regFunction(data.user,
    data.pass,
    function(err) {
      if (err) {
        r.l.debug('reg error')
        res.render('main/reg', {
          title: config.get('site.front'),
          banner: config.get('content.front.banner'),
          home_title: config.get('site.front'),
          error: err.message
        });
        return;
      } else {
        r.l.debug('reg ok')
        res.render('main/reg', {
          title: config.get('site.front'),
          banner: config.get('content.front.banner'),
          home_title: config.get('site.front'),
          success: true
        });
      }
    });
});

module.exports = router;